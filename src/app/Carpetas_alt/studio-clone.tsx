'use client';

import { APISchema, Model } from '#@/lib/types/api-models';
import { useState, useEffect } from 'react';

export function StudioClone() {
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
    <div className="flex h-screen font-sans">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gray-100 border-r p-4">
        <h1 className="text-xl font-bold mb-6 text-gray-800">My Studio</h1>
        <ul>
          {models.map( ( model ) => {
            return (
              <li
                key={model.name}
                className={`cursor-pointer p-2 rounded mb-1 ${ activeModel?.name === model.name
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200' }`}
                onClick={() => {
                  return setActiveModel( model );
                }}
              >
                {model.name}
              </li>
            );
          } )}
        </ul>
      </div>

      {/* Main Data Table Area */}
      <div className="flex-1 p-8 overflow-auto">
        <h2 className="text-2xl font-semibold mb-4">{activeModel?.name} Data</h2>

        {tableData.length === 0
          ? (
              <p className="text-gray-500">No records found. (Add POST logic to create some!)</p>
            )
          : (
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    {/* Dynamically generate column headers based on DMMF fields */}
                    {activeModel?.fields.map( ( field ) => {
                      return (
                        <th key={field.name} className="border p-2 text-left font-medium text-gray-600">
                          {field.name} <span className="text-xs text-gray-400">({field.type})</span>
                        </th>
                      );
                    } )}
                  </tr>
                </thead>
                <tbody>
                  {/* Dynamically render rows and cells */}
                  {tableData.map( (
                    row, index
                  ) => {
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        {activeModel?.fields.map( ( field ) => {
                          return (
                            <td key={field.name} className="border p-2 text-gray-800">
                              {String( row[ field.name ] )}
                            </td>
                          );
                        } )}
                      </tr>
                    );
                  } )}
                </tbody>
              </table>
            )}
      </div>
    </div>
  );
}