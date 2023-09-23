'use client';

import { useCarpetaSortDispatch } from '#@/app/context/carpetas-sort-context';
import { buttonDrawerMenu } from '#@/components/Buttons/buttons.module.css';
import { IntCarpeta, MonCarpeta } from '#@/lib/types/carpetas';
import { useState } from 'react';

export function CarpetasSortButtons ({carpeta}:{carpeta: MonCarpeta}) {
  const dispatchCarpetas = useCarpetaSortDispatch();
  const carpetaKeys = Object.keys(carpeta)
  const [
    sortDirection,
    setSortDirection
  ] = useState(
    true
  );

  function handleSortByNombre() {
    return dispatchCarpetas(
      {
        type         : 'primerNombre',
        sortDirection: sortDirection
      }
    );
  }

  function handleSortByApellido() {
    return dispatchCarpetas(
      {
        type         : 'primerApellido',
        sortDirection: sortDirection
      }
    );
  }

  function handleSortByNumero() {
    return dispatchCarpetas(
      {
        type         : 'numero',
        sortDirection: sortDirection
      }
    );
  }

  function handleSortByFecha() {
    return dispatchCarpetas(
      {
        type         : 'fecha',
        sortDirection: sortDirection
      }
    );
  }

  return (
    <><h1>{ 'ordenar:' }</h1>
      <button className={ buttonDrawerMenu } type='button' onClick={ () => {
        setSortDirection(
          sortDirection
            ? false
            : true
        );
      } }>
        <span> {sortDirection
          ? 'ascendente'
          : 'descendente' }</span>
        <span className='material-symbols-outlined'>{sortDirection
          ? 'arrow_downward'
          : 'arrow_upward'}</span>
      </button><button type='button' onClick={ handleSortByNombre } className={ buttonDrawerMenu }>
        <p>Nombre</p>

      </button><button type='button' onClick={ handleSortByApellido } className={ buttonDrawerMenu }>
        <p>Apellido</p>
      </button><button type='button' onClick={ handleSortByNumero } className={ buttonDrawerMenu }>
        <p>Numero de Carpeta</p>
      </button><button type='button' onClick={ handleSortByFecha } className={ buttonDrawerMenu }>
        <p>Fecha de ultima actuacion</p>
      </button></>
  );
}