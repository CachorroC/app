'use client';
import { APISchema, Model } from '#@/lib/types/api-models';
import { createContext, Dispatch, SetStateAction, useEffect, useState, useContext } from 'react';

const DatabaseModelsContext = createContext<{
  models        : Model[];
  setModels     : Dispatch<SetStateAction<Model[]>>;
  activeModel   : Model | null;
  setActiveModel: Dispatch<SetStateAction<Model | null>>;
  tableData     : any[];
  setTableData  : Dispatch<SetStateAction<any[]>>;
} | null>( null );

export const DatabaseModelsContextProvider = ( {
  children
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
  ] = useState( [] );

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
        .then( ( data ) => {
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