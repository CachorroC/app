/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
'use client';
import { APISchema, Model, ModelDataResponse, TableData, TableRow } from '#@/lib/types/api-models';
import { createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useContext, } from 'react';
import type { ReactNode } from 'react';



const DatabaseModelsContext = createContext<{
  models        : Model[];
  setModels     : Dispatch<SetStateAction<Model[]>>;
  activeModel   : Model | null;
  setActiveModel: Dispatch<SetStateAction<Model | null>>;
  tableData     : TableData;
  setTableData  : Dispatch<SetStateAction<TableData>>;
  isLoading     : boolean;
  setIsLoading  : Dispatch<SetStateAction<boolean>>;
} | null>( null );

const CellEditingContext = createContext<{
  editingCell      : { rowIndex: number; field: string; } | null;
  setEditingCell   : Dispatch<SetStateAction<{ rowIndex: number; field: string; } | null>>;
  editValue        : string;
  setEditValue     : Dispatch<SetStateAction<string>>;
  handleDoubleClick: ( rowIndex: number, fieldName: string, currentValue: any ) => void;
  handleSave       : ( rowIndex: number, fieldName: string, row: TableRow<string> ) => void;
} | null>( null );

export const DatabaseModelsContextProvider = ( {
  children,
}: {
  children: ReactNode;
} ) => {
  const [
    models,
    setModels
  ] = useState<Model[]>( [] );
  const [
    activeModel,
    setActiveModel
  ] = useState<Model | null>( null );
  const [
    tableData,
    setTableData
  ] = useState<TableData>( [] );
  const [
    isLoading,
    setIsLoading
  ] = useState( false );
  // Tracks which cell is currently in "edit mode"
  const [
    editingCell,
    setEditingCell
  ] = useState<{ rowIndex: number; field: string } | null>( null );

  // Tracks the temporary value being typed into the input
  const [
    editValue,
    setEditValue
  ] = useState<string>( '' );

  const handleDoubleClick = (
    rowIndex: number, fieldName: string, currentValue: any
  ) => {
    setEditingCell( {
      rowIndex,
      field: fieldName
    } );
    setEditValue( String( currentValue ?? '' ) ); // Convert null/undefined to empty string
  };

  const handleSave = async (
    rowIndex: number, fieldName: string, row: TableRow<string>
  ) => {
    if ( !activeModel ) {
      return;
    }

    // 1. Find the primary key field from the schema
    const idField = activeModel.fields.find( ( field ) => {
      return field.isId;
    } );

    if ( !idField ) {
      console.error( 'No primary key found for this model!' );

      return;
    }

    const idFieldName = idField.name; // e.g., 'numero', 'idRegActuacion', or 'id'
    let idValue = row[ idFieldName ];

    // 2. Cast the ID to a Number if Prisma expects an Int or Float
    if ( idField.type === 'Int' || idField.type === 'Float' ) {
      idValue = Number( idValue );
    }

    // Find the schema definition for the field being edited to cast its value too
    const editedFieldSchema = activeModel.fields.find( ( field ) => {
      return field.name === fieldName;
    } );
    let parsedEditValue: string | number | boolean = editValue;

    if ( editedFieldSchema?.type === 'Int' || editedFieldSchema?.type === 'Float' ) {
      parsedEditValue = Number( editValue );
    } else if ( editedFieldSchema?.type === 'Boolean' ) {
      parsedEditValue = editValue === 'true';
    }

    // 3. Optimistic UI Update
    const updatedTableData = [
      ...tableData
    ];
    updatedTableData[ rowIndex ] = {
      ...updatedTableData[ rowIndex ],
      [ fieldName ]: parsedEditValue,
    };
    setTableData( updatedTableData as never[] ); // Cast as needed for your TS setup
    setEditingCell( null );

    // 4. Send the dynamic ID structure to the backend
    try {
      const response = await fetch(
        `/api/models/${ activeModel.name }`, {
          method : 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
            idField: idFieldName,       // Tell the backend the name of the PK column
            idValue: idValue,           // Tell the backend the value of the PK
            data   : {
              [ fieldName ]: parsedEditValue,
            },
          } ),
        }
      );

      if ( !response.ok ) {
        throw new Error( 'Failed to update database' );
      }

      const result = await response.json();
      alert( JSON.stringify(
        result, null, 2 
      ) );
    } catch ( error ) {
      console.error( error );
      alert( 'Failed to save changes!' );
    }
  };

  // 1. Fetch the database schema (DMMF) on load
  useEffect(
    () => {
      fetch( '/api/schema' )
        .then( ( res ) => {
          return res.json();
        } )
        .then( ( data: APISchema ) => {
          setModels( data.models );

          if ( data.models.length > 0 ) {
            setActiveModel( data.models[ 0 ] );
          }
        } );
    }, []
  );

  // 2. Fetch data whenever a new table/model is selected
  useEffect(
    () => {
      if ( !activeModel ) {
        return;
      }

      // 2. Set loading to true immediately when the active model changes
      setIsLoading( true );

      fetch( `/api/models/${ activeModel.name }` )
        .then( ( res ) => {
          return res.json();
        } )
        .then( ( data: ModelDataResponse ) => {
          return setTableData( data.data );
        } )
        .finally( () => {
        // 3. Turn off loading state after the fetch completes (whether it succeeds or fails)
          setIsLoading( false );
        } );
    }, [
      activeModel
    ]
  );

  return (
    <DatabaseModelsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        models,
        setModels,
        activeModel,
        setActiveModel,
        tableData,
        setTableData,
      }}
    >
      <CellEditingContext.Provider value={{
        editingCell,
        setEditingCell,
        editValue,
        setEditValue,
        handleDoubleClick,
        handleSave,
      }}
      >
        {children}
      </CellEditingContext.Provider>
    </DatabaseModelsContext.Provider>
  );
};

export const useDatabaseModelsContext = () => {
  const context = useContext( DatabaseModelsContext );

  if ( !context ) {
    throw new Error( 'useDatabaseModelsContext must be used within a DatabaseModelsContextProvider', );
  }

  return context;
};

export const useCellEditingContext = () => {
  const context = useContext( CellEditingContext );

  if ( !context ) {
    throw new Error( 'useCellEditingContext must be used within a CellEditingContextProvider', );
  }

  return context;
};