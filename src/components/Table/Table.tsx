'use client';
import React, { useState } from 'react';

import styles from './Table.module.css';
import { capitalize } from '#@/lib/project/utils/main';
import { Category } from '#@/lib/types/carpetas';

export type Data = {
  numero: number;
  nombre: string;
  category: Category;
  actuacion: string;
  anotacion: string;
  revisado: boolean;
  expediente: string;
  fechaUltimaActuacion: string;
  ciudad: string;
  juzgado: string;
}[];

export type TableProps = {
  rows: Data;
};

export const Table = ( {
  rows 
}: TableProps ) => {
  const [
    sortedRows,
    setRows
  ] = useState( rows );

  const [
    order,
    setOrder
  ] = useState( 'asc' );

  const [
    sortKey,
    setSortKey
  ] = useState( Object.keys( rows[ 0 ] )[ 0 ] );

  const formatEntry = ( entry?: string | number | boolean | null ) => {
    if ( typeof entry === 'boolean' ) {
      return entry
        ? '✅'
        : '❌';
    }

    return entry;
  };

  const filter = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const {
      value 
    } = event.target;

    if ( value ) {
      setRows( [
        ...rows.filter( ( row ) => {
          return Object.values( row )
            .join( '' )
            .toLowerCase()
            .includes( value );
        } ),
      ] );
    } else {
      setRows( rows );
    }
  };

  const sort = (
    value: keyof Data[0], order: string 
  ) => {
    const returnValue = order === 'desc'
      ? 1
      : -1;

    setSortKey( value );
    setRows( [
      ...sortedRows.sort( (
        a, b 
      ) => {
        const aValue = a[ value ];

        const bValue = b[ value ];

        const isNumberAValue = typeof aValue === 'number';

        const isNumberBValue = typeof bValue === 'number';

        const isBooleanValue = typeof aValue === 'boolean';

        if ( isNumberAValue && isNumberBValue ) {
          return aValue > bValue
            ? returnValue * -1
            : returnValue;
        } else if ( isBooleanValue ) {
          return a[ value ] > b[ value ]
            ? returnValue * -1
            : returnValue;
        }

        return a[ value ] > b[ value ]
          ? returnValue * -1
          : returnValue;
      } ),
    ] );
  };

  const updateOrder = () => {
    const updatedOrder = order === 'asc'
      ? 'desc'
      : 'asc';

    setOrder( updatedOrder );
    sort(
 sortKey as keyof Data[0], updatedOrder 
    );
  };

  return (
    <>
      <div className="controls">
        <input
          type="text"
          placeholder="Filter items"
          onChange={filter}
        />
        <select
          onChange={( event ) => {
            return sort(
 event.target.value as keyof Data[0], order 
            );
          }}
        >
          {Object.keys( rows[ 0 ] )
            .map( (
              entry, index 
            ) => {
              return (
                <option
                  value={entry}
                  key={index}
                >
                Order by {capitalize( entry )}
                </option>
              );
            } )}
        </select>
        <button onClick={updateOrder}>Switch order ({order})</button>
      </div>
      <table className={styles.Table}>
        <thead>
          <tr>
            {Object.keys( rows[ 0 ] )
              .map( (
                entry, index 
              ) => {
                return <th key={index}>{capitalize( entry )}</th>;
              } )}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map( (
            row, index 
          ) => {
            return (
              <tr key={index}>
                {Object.values( row )
                  .map( (
                    entry, columnIndex 
                  ) => {
                    return <td key={columnIndex}>{formatEntry( entry )}</td>;
                  } )}
              </tr>
            );
          } )}
        </tbody>
      </table>
      {!sortedRows.length && <h1>No results... Try expanding the search</h1>}
    </>
  );
};
