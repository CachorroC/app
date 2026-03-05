'use client';
import { APISchema, Model } from '#@/lib/types/api-models';
import { createContext, Dispatch, SetStateAction, useEffect, useState, useContext } from 'react';
import type { ReactNode } from 'react';

type TableRow<TKeys extends string = string> = Record<TKeys, unknown>;
type ModelDataResponse<TData extends TableRow = TableRow> = {
  data: TData[];
};
type TableData<TData extends TableRow = TableRow> = ModelDataResponse<TData>[ 'data' ];

const DatabaseModelsContext = createContext<{
  models        : Model[];
  setModels     : Dispatch<SetStateAction<Model[]>>;
  activeModel   : Model | null;
  setActiveModel: Dispatch<SetStateAction<Model | null>>;
  tableData     : TableData;
  setTableData  : Dispatch<SetStateAction<TableData>>;
} | null>( null );

export const DatabaseModelsContextProvider = ( {
  children
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

  // 1. Fetch the database schema (DMMF) on load
  useEffect(
    () => {
      fetch( '/api/schema' )
        .then( ( res ) => {
          return res.json() ;
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

      fetch( `/api/models/${ activeModel.name }` )
        .then( ( res ) => {
          return res.json();
        } )
        .then( ( data: ModelDataResponse ) => {
          return setTableData( data.data );
        } );
    }, [
      activeModel
    ]
  );

  return (
    <DatabaseModelsContext.Provider value={{
      models,
      setModels,
      activeModel,
      setActiveModel,
      tableData,
      setTableData
    }}
    >
      {children}
    </DatabaseModelsContext.Provider>
  );
};

export const useDatabaseModelsContext = () => {
  const context = useContext( DatabaseModelsContext );

  if ( !context ) {
    throw new Error( 'useDatabaseModelsContext must be used within a DatabaseModelsContextProvider' );
  }

  return context;
};