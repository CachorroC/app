'use client';

import { useCarpetaSortDispatch } from '#@/app/context/carpetas-sort-context';
import button from '#@/components/Buttons/buttons.module.css';
import { ActionType } from '#@/lib/types/context-actions';
import { useState } from 'react';

export function CarpetasSortButtons () {
  const keys: ActionType[] = [
    'fecha',
    'nombre',
    'numero',
    'primerNombre',
    'primerApellido',
    'category',
    'categoryTag'
  ];

  const dispatchCarpetas = useCarpetaSortDispatch();



  const [
    sortDirection,
    setSortDirection
  ] = useState(
    true
  );


  return (
    <>
      <div>
        <h1>{ 'ordenar:' }</h1>
        <span> {sortDirection
          ? 'ascendente'
          : 'descendente' } </span>
        <span className='material-symbols-outlined'>{sortDirection
          ? 'arrow_upward'
          : 'arrow_downward' }</span>
      </div>
      { keys.map(
        (
          key
        ) => {
          return (
            <button type='button' onClick={
              () => {
                setSortDirection(
                  (
                    d
                  ) => {
                    return !d;
                  }
                );
                dispatchCarpetas(
                  {
                    type         : key,
                    sortDirection: sortDirection
                  }
                );
              }
            } className={ button.buttonCategory } key={ key }>


              {key}
            </button>
          );
        }
      )
      }</>

  );
}