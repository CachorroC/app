'use client';

import { useCarpetaSortDispatch } from '#@/app/Context/carpetas-sort-context';
import { Fragment, useState } from 'react';
import { SortActionType } from '#@/app/Hooks/useCarpetasreducer';
import styles from './styles.module.css';

export function CarpetasSortButtons( {
  options,
}: {
  options: {
    name: string;
    value: string;
    items: string[];
  }[];
} ) {
  const dispatchCarpetas = useCarpetaSortDispatch();

  const [
    currentDispatcher,
    setCurrentDispatcher
  ] = useState<SortActionType>( {
    type      : 'sort',
    dir       : 'asc',
    sortingKey: 'fecha',
  } );

  return (
    <>
      <h1>{'ordenar:'}</h1>

      {options.map( ( {
        name, value, items
      } ) => {
        return (
          <Fragment key={value}>
            <h5>{name}</h5>
            <section className={styles.segmentedButtonsColumn}>
              {items.map( ( item ) => {
                const isActive = currentDispatcher[ value ] === item;

                return (
                  <button
                    key={item}
                    type="button"
                    className={
                      isActive
                        ? styles.buttonCategoryActive
                        : styles.buttonCategoryPasive
                    }
                    onClick={() => {
                      console.log( value );
                      console.log( item );
                      setCurrentDispatcher( ( curdispatch ) => {
                        return {
                          ...curdispatch,
                          [ value ]: item,
                        };
                      } );

                      console.log( currentDispatcher );

                      return dispatchCarpetas( {
                        ...currentDispatcher,
                        [ value ]: item,
                      } );
                    }}
                  >
                    {item === 'asc'
                      ? 'Z-A'
                      : item === 'dsc'
                        ? 'A-Z'
                        : item === 'fecha'
                          ? 'fecha de la ultima actuación'
                          : item}
                  </button>
                );
              } )}
            </section>
          </Fragment>
        );
      } )}
    </>
  );
}

export function TableRowCarpetaSortingButton( {
  sortKey,
}: {
  sortKey:
    | 'fecha'
    | 'numero'
    | 'nombre'
    | 'category'
    | 'id'
    | 'tipoProceso'
    | 'updatedAt';
} ) {
  const dispatchCarpetas = useCarpetaSortDispatch();

  const [
    currentDispatcher,
    setCurrentDispatcher
  ] = useState<SortActionType>( {
    type      : 'sort',
    dir       : 'asc',
    sortingKey: 'fecha',
  } );

  return (
    <th scope="col" className={styles.highlight}>
      <button
        type="button"
        onClick={() => {
          setCurrentDispatcher( ( curdispatch ) => {
            return {
              ...curdispatch,
              sortingKey: sortKey,
              dir       : curdispatch.dir === 'asc'
                ? 'dsc'
                : 'asc',
            };
          } );

          return dispatchCarpetas( {
            ...currentDispatcher,
            sortingKey: sortKey,
          } );
        }}
        className={
          currentDispatcher.sortingKey === sortKey
            ? styles.buttonCategoryActive
            : styles.buttonCategoryPasive
        }
        key={sortKey}
      >
        {sortKey}
      </button>
    </th>
  );
}
