'use client';

import { useCarpetaSortDispatch } from '#@/app/context/carpetas-sort-context';
import styles from '#@/components/Buttons/buttons.module.css';
import { useState } from 'react';
import layout from '#@/styles/layout.module.css';
import { SortActionType } from '#@/app/hooks/useCarpetasreducer';

export function CarpetasSortButtons() {
      const keys: (
    | 'fecha'
    | 'numero'
    | 'nombre'
    | 'category'
    | 'id'
    | 'tipoProceso'
    | 'updatedAt'
      )[] = [
        'fecha',
        'nombre',
        'id',
        'updatedAt',
        'numero',
        'category',
        'tipoProceso',
      ];

      const dispatchCarpetas = useCarpetaSortDispatch();

      const [ currentDispatcher, setCurrentDispatcher ] = useState<SortActionType>(
        {
          type      : 'sort',
          dir       : 'asc',
          sortingKey: 'fecha',
        }
      );

      return (
        <>
          <div>
            <h1>{'ordenar:'}</h1>
            <span>
              {' '}
              {currentDispatcher.dir === 'asc'
                ? 'ascendente'
                : 'descendente'}{' '}
            </span>
            <span className="material-symbols-outlined">
              {currentDispatcher.dir === 'asc'
                ? 'arrow_upward'
                : 'arrow_downward'}
            </span>
          </div>
          <section className={layout.segmentColumn}>
            {keys.map(
              (
                key
              ) => {
                        return (
                          <button
                            type="button"
                            onClick={() => {
                                      setCurrentDispatcher(
                                        (
                                          curdispatch
                                        ) => {
                                                  return {
                                                    ...curdispatch,
                                                    sortingKey: key,
                                                  };
                                        }
                                      );
                                      return dispatchCarpetas(
                                        {
                                          ...currentDispatcher,
                                          sortingKey: key,
                                        }
                                      );
                            }}
                            className={
                              currentDispatcher.sortingKey === key
                                ? styles.buttonActiveCategory
                                : styles.buttonPassiveCategory
                            }
                            key={key}
                          >
                            {key}
                          </button>
                        );
              }
            )}
            <button
              type="button"
              onClick={() => {
                        setCurrentDispatcher(
                          (
                            d
                          ) => {
                                    return {
                                      ...d,
                                      dir: d.dir === 'asc'
                                        ? 'dsc'
                                        : 'asc',
                                    };
                          }
                        );
                        dispatchCarpetas(
                          currentDispatcher
                        );
              }}
              className={styles.buttonPassiveCategory}
            >
              {currentDispatcher.dir}
            </button>
          </section>
        </>
      );
}

export function TableRowCarpetaSortingButton(
  {
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
  }
) {
      const dispatchCarpetas = useCarpetaSortDispatch();

      const [ currentDispatcher, setCurrentDispatcher ] = useState<SortActionType>(
        {
          type      : 'sort',
          dir       : 'dsc',
          sortingKey: 'fecha',
        }
      );
      return (
        <th key={sortKey}>
          <button
            type="button"
            onClick={() => {
                      setCurrentDispatcher(
                        (
                          curdispatch
                        ) => {
                                  return {
                                    ...curdispatch,
                                    sortingKey: sortKey,
                                  };
                        }
                      );
                      return dispatchCarpetas(
                        {
                          ...currentDispatcher,
                          sortingKey: sortKey,
                          dir       : currentDispatcher.dir === 'asc'
                            ? 'dsc'
                            : 'asc',
                        }
                      );
            }}
            className={
              currentDispatcher.sortingKey === sortKey
                ? styles.buttonActiveCategory
                : styles.buttonPassiveCategory
            }
            key={sortKey}
          >
            {sortKey}
          </button>
        </th>
      );
}
