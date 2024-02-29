'use client';

import { useCarpetaSortDispatch } from '#@/app/Context/carpetas-sort-context';
import { useState } from 'react';
import layout from '#@/styles/layout.module.css';
import { SortActionType } from '#@/app/Hooks/useCarpetasreducer';
import styles from '#@/app/Carpetas/@right/styles.module.css';

export function CarpetasSortButtons(
  {
    options,
  }: {
    options: {
      name: string;
      value: string;
      items: string[];
    }[];
  }
) {
      const dispatchCarpetas = useCarpetaSortDispatch();

      const [ currentDispatcher, setCurrentDispatcher ] = useState<SortActionType>(
        {
          type      : 'sort',
          dir       : 'asc',
          sortingKey: 'fecha',
        }
      );

      return (

        <div className={layout.segmentColumn}>
          <h1>{'ordenar:'}</h1>
          <span>{currentDispatcher.dir
            ? 'ascendente'
            : 'descendente'}</span>
          <span className="material-symbols-outlined">
            {currentDispatcher.dir
              ? 'arrow_upward'
              : 'arrow_downward'}
          </span>

          {options.map(
            (
              {
                name, value, items
              }
            ) => {
                      return (
                        <section
                          key={value}
                          className={layout.sectionRow}
                        >
                          <h5>{name}</h5>
                          <section className={layout.sectionColumn}>
                            {items.map(
                              (
                                item
                              ) => {
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
                                            onClick={ () => {
                                                      console.log(
                                                        value
                                                      );
                                                      console.log(
                                                        item
                                                      );
                                                      setCurrentDispatcher(
                                                        (
                                                          curdispatch
                                                        ) => {

                                                                  return {
                                                                    ...curdispatch,
                                                                    [ value ]: item
                                                                  };
                                                        }
                                                      );

                                                      console.log(
                                                        currentDispatcher
                                                      );
                                                      return dispatchCarpetas(
                                                        {
                                                          ...currentDispatcher,
                                                          [ value ]: item
                                                        }
                                                      );
                                            }}
                                          >
                                            {item}
                                          </button>
                                        );
                              }
                            )}
                          </section>
                        </section>
                      );
            }
          )}
        </div>

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
          dir       : 'asc',
          sortingKey: 'fecha',
        }
      );
      return (
        <th>
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
                                    dir       : curdispatch.dir === 'asc'
                                      ? 'dsc'
                                      : 'asc',
                                  };
                        }
                      );
                      return dispatchCarpetas(
                        {
                          ...currentDispatcher,
                          sortingKey: sortKey,
                        }
                      );
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
