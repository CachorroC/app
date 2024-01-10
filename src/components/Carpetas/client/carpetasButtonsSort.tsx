'use client';

import { useCarpetaSortDispatch } from '#@/app/context/carpetas-sort-context';
import styles from '#@/components/Buttons/buttons.module.css';
import {  Fragment, useCallback, useMemo, useState } from 'react';
import layout from '#@/styles/layout.module.css';
import { SortActionType } from '#@/app/hooks/useCarpetasreducer';
import { Route } from 'next';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const options = [
  {
    name : 'Sort',
    value: 'dir',
    items: [ 'asc', 'dsc' ],
  },
  {
    name : 'Page',
    value: 'sortingKey',
    items: [
      'fecha',
      'numero',
      'nombre',
      'category',
      'id',
      'tipoProceso',
      'updatedAt'
    ],
  },
  {
    name : 'Items Per Page',
    value: 'type',
    items: [ 'sort' ],
  },
];

export function CarpetasSortButtons () {


      const searchParams = useSearchParams();

      const pathname = usePathname();

      const router = useRouter();

      const selectedOptions = useMemo<URLSearchParams>(
        () => {
                  // Get the initial selected options from the URL's searchParams
                  const params = new URLSearchParams(
                    searchParams
                  );

                  // Preselect the first value of each option if its not
                  // included in the current searchParams
                  options.forEach(
                    (
                      option
                    ) => {
                              if ( !searchParams.has(
                                option.value
                              ) ) {
                                params.set(
                                  option.value, option.items[ 0 ]
                                );
                              }
                    }
                  );

                  return params;
        }, [ searchParams ]
      );


      const updateSearchParam = useCallback(
        (
          name: string, value: string
        ) => {
                  // Merge the current searchParams with the new param set
                  const params = new URLSearchParams(
                    searchParams
                  );
                  params.set(
                    name, value
                  );

                  const routImp = pathname + '?' + params.toString() as Route;

                  // Perform a new navigation to the updated URL. The current `page.js` will
                  // receive a new `searchParams` prop with the updated values.
                  router.push(
                    routImp
                  ); // or router.replace()
        },
        [
          router,
          pathname,
          searchParams
        ],
      );


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
            {options.map(
              (
                option
              ) => {
                        return (

                          <div key={option.name}>
                            <div className="text-gray-400">{option.name}</div>

                            <div className="mt-1 flex gap-2">
                              {option.items.map(
                                (
                                  item
                                ) => {
                                          const isActive = selectedOptions.get(
                                            option.value
                                          ) === item;

                                          return (

                                            <button
                                              type="button"
                                              onClick={ () =>
                                              {

                                                        return updateSearchParam(
                                                          option.value, item
                                                        );
                                              } }
                                              className={ isActive
                                                ? styles.buttonActiveCategory
                                                : styles.buttonPassiveCategory }
                                              key={ item}
                                            >
                                              { item}
                                            </button>

                                          );
                                }
                              )}
                            </div>
                          </div>

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
    sortKey
  }: {sortKey: | 'fecha'
    | 'numero'
    | 'nombre'
    | 'category'
    | 'id'
    | 'tipoProceso'
    | 'updatedAt';}
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
