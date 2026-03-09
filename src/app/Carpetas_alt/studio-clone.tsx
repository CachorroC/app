'use client';

import { APISchema, Model } from '#@/lib/types/api-models';
import { useState, useEffect } from 'react';
import styles from './studio-clone.module.scss';

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
    <div className={styles.container}>
      {/* Sidebar Navigation */}
      <div className={styles.sidebar}>
        <h1 className={styles.sidebarTitle}>My Studio</h1>
        <ul className={styles.modelList}>
          {models.map( ( model ) => {
            const itemClass = [
              styles.modelItem,
              activeModel?.name === model.name
                ? styles.active
                : '',
            ]
              .filter( Boolean )
              .join( ' ' );

            return (
              <li
                key={model.name}
                className={itemClass}
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
      <div className={styles.mainContent}>
        <h2 className={styles.mainTitle}>{activeModel?.name} Data</h2>

        {tableData.length === 0 ? (
          <p className={styles.emptyMessage}>
            No records found. (Add POST logic to create some!)
          </p>
        ) : (
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                {/* Dynamically generate column headers based on DMMF fields */}
                {activeModel?.fields.map( ( field ) => {
                  return (
                    <th
                      key={field.name}
                      className={styles.tableHeader}
                    >
                      {field.name}{' '}
                      <span className={styles.fieldType}>({field.type})</span>
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
                  <tr
                    key={index}
                    className={styles.tableRow}
                  >
                    {activeModel?.fields.map( ( field ) => {
                      return (
                        <td
                          key={field.name}
                          className={styles.tableCell}
                        >
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
