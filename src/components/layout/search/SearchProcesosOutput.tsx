'use client';
import { LinkCard } from './link';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { useCategory } from '#@/app/context/main-context';
import { useSearch } from '#@/app/context/search-context';
import { useReducer } from 'react';
import carpetasReducer from '#@/lib/hooks/carpetas-reducer';
import { buttonDrawerMenu } from '#@/components/Buttons/buttons.module.css';
import { section } from '#@/components/form/form.module.css';


export default function SearchOutputList(
  {
    path,
    fechas,
  }: {
  path: string;
  fechas: MonCarpeta[];
}
) {
  const {
    search
  } = useSearch();

  const {
    category
  } = useCategory();

  const rows: any[] = [];

  const [
    carpetasReduced,
    dispatchCarpetas
  ] =useReducer(
    carpetasReducer, fechas
  );

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
    dispatchCarpetas(
      {
        type: 'nombre',
      }
    );
  }

  function handleSortByApellido() {
    dispatchCarpetas(
      {
        type: 'primerApellido',
      }
    );
  }

  function handleSortByNumero() {
    dispatchCarpetas(
      {
        type: 'numero',
      }
    );
  }

  function handleSortByFecha() {
    dispatchCarpetas(
      {
        type: 'fecha',
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
