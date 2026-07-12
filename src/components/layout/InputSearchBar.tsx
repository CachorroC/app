'use client';
import searchbar from 'components/layout/search/input-search-bar.module.css';
import { useState } from 'react';
import { useCarpetaSort,
  useCarpetaSortDispatch, } from '#@/app/Context/carpetas-sort-context';
import { useRouter } from 'next/navigation';
import { Route } from 'next';

export const InputSearchBar = () => {
  const [
    newQueryState,
    setNewQueryState
  ] = useState( '' );

  const {
    completeCarpetas 
  } = useCarpetaSort();
  const router = useRouter();

  const dispatchCarpetas = useCarpetaSortDispatch();

  return (
    <div className={searchbar.searchContainer}>
      <span
        className={`material-symbols-rounded ${ searchbar.leadingIcon }`}
        aria-hidden="true"
      >
        search
      </span>
      <datalist id="demandados-list">
        {completeCarpetas.map( ( carpeta ) => {
          return (
            <option
              value={carpeta.nombre}
              key={carpeta.numero}
              onClick={() => {
                return router.push( `/Carpeta/${ carpeta.numero }` as Route );
              }}
            />
          );
        } )}
      </datalist>
      <input
        type={'textarea'}
        list="demandados-list"
        name={'query'}
        placeholder={'Buscar por nombre, número, radicado o cédula'}
        value={newQueryState}
        className={searchbar.input}
        onChange={( e ) => {
          dispatchCarpetas( {
            type   : 'search',
            payload: e.target.value,
          } );

          return setNewQueryState( e.target.value );
        }}
      />

      <button
        className={searchbar.icon}
        type="button"
        onClick={() => {
          setNewQueryState( '' );

          return dispatchCarpetas( {
            type: 'reset',
          } );
        }}
      >
        <span className="material-symbols-rounded">close</span>
      </button>
    </div>
  );
};
