'use client';
import { LinkCard } from './link';
import { useCategory } from '#@/app/context/main-context';
import { useSearch } from '#@/app/context/search-context';
import { buttonDrawerMenu } from '#@/components/Buttons/buttons.module.css';
import { section } from '#@/components/form/form.module.css';
import { useCarpetaSort, useCarpetaSortDispatch } from '#@/app/context/carpetas-sort-context';
import { useState } from 'react';


export default function SearchOutputList(
  {
    path
  }: {
  path: string;
}
) {

  const [
    sortDirection,
    setSortDirection
  ] = useState(
    true
  );

  const {
    search
  } = useSearch();

  const {
    category
  } = useCategory();

  const rows: any[] = [];


  const carpetasReduced = useCarpetaSort();

  const dispatchCarpetas = useCarpetaSortDispatch();

  carpetasReduced.forEach(
    (
      proceso
    ) => {
      if ( proceso.nombre.toLowerCase()
        .indexOf(
          search.toLowerCase()
        ) === -1 ) {
        return;
      }

      if ( category === 'todos' || category === proceso.category ) {
        rows.push(
          <LinkCard
            path={path}
            carpeta={proceso}
            key={proceso._id}
          />
        );
      }
    }
  );

  function handleSortByNombre() {
    setSortDirection(
      (
        n
      ) => {
        return !n;
      }
    );
    dispatchCarpetas(
      {
        type         : 'nombre',
        sortDirection: sortDirection
      }
    );
  }

  function handleSortByApellido() {
    setSortDirection(
      (
        n
      ) => {
        return !n;
      }
    );
    dispatchCarpetas(
      {
        type         : 'primerApellido',
        sortDirection: sortDirection
      }
    );
  }

  function handleSortByNumero() {
    setSortDirection(
      (
        n
      ) => {
        return !n;
      }
    );
    dispatchCarpetas(
      {
        type         : 'numero',
        sortDirection: sortDirection
      }
    );
  }

  function handleSortByFecha() {
    setSortDirection(
      (
        n
      ) => {
        return !n;
      }
    );
    dispatchCarpetas(
      {
        type         : 'fecha',
        sortDirection: sortDirection
      }
    );
  }

  return <>
    <div className={ section }>
      <h1>{'ordenar:'}</h1>
      <button type='button' onClick={ handleSortByNombre } className={ buttonDrawerMenu }>
        <p>Nombre</p>
      </button>
      <button type='button' onClick={ handleSortByApellido } className={ buttonDrawerMenu }>
        <p>Apellido</p>
      </button>
      <button type='button' onClick={ handleSortByNumero } className={ buttonDrawerMenu }>
        <p>Numero de Carpeta</p>
      </button>
      <button type='button' onClick={ handleSortByFecha } className={ buttonDrawerMenu }>
        <p>Fecha de ultima actuacion</p>
      </button>
    </div>
    { rows }</>;
}
