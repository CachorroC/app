/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
'use client';
import { APISchema, Model, ModelDataResponse, TableData } from '#@/lib/types/api-models';
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
  isEditing        : boolean;
  setIsEditing     : Dispatch<SetStateAction<boolean>>;
  handleDoubleClick: ( rowIndex: number, fieldName: string, currentValue: any ) => void;
  handleSave       : ( rowIndex: number, fieldName: string, rowId: any ) => void;
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
  const [
    isEditing,
    setIsEditing
  ] = useState( false );

  const handleDoubleClick = (
    rowIndex: number, fieldName: string, currentValue: any
  ) => {
    setIsEditing( ( edit ) => {
      return !edit;
    } );
    setEditingCell( {
      rowIndex,
      field: fieldName
    } );
    setEditValue( String( currentValue ?? '' ) ); // Convert null/undefined to empty string
  };

  const handleSave = async (
    rowIndex: number, fieldName: string, rowId: any
  ) => {
  // 1. Optimistically update the local UI state so it feels instant
    const updatedTableData = [
      ...tableData
    ];
    updatedTableData[ rowIndex ] = {
      ...updatedTableData[ rowIndex ],
      [ fieldName ]: editValue,
    };
    setTableData( updatedTableData );
    setEditingCell( null ); // Exit edit mode
    setIsEditing( ( edit ) => {
      return !edit;
    } );

    // 2. Send the specific cell update to the database
    try {
      const response = await fetch(
        `/api/models/${ activeModel?.name }`, {
          method : 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
            id  : rowId, // We must pass the row's ID so Prisma knows which record to update
            data: {
              [ fieldName ]: editValue, // Only send the field that changed
            },
          } ),
        }
      );

      if ( !response.ok ) {
        throw new Error( 'Failed to update database' );
      }
    } catch ( error ) {
      console.error( error );
      // In a real app, you'd want to revert the local state back if the API fails here
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
        isEditing,
        setIsEditing
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