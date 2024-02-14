'use client';

import { useCarpetaSortDispatch } from '#@/app/Context/carpetas-sort-context';
import styles from '#@/components/Buttons/buttons.module.css';
import { useState } from 'react';
import layout from '#@/styles/layout.module.css';
import { SortActionType } from '#@/app/Hooks/useCarpetasreducer';

type sortingType =
  | 'fecha'
  | 'numero'
  | 'nombre'
  | 'category'
  | 'id'
  | 'tipoProceso'
  | 'updatedAt';
interface optionsType {
  name: string;
  value: keyof SortActionType;
  items: string[] | sortingType[];
}

const options: optionsType[] = [ {
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
    'updatedAt',
  ],
}, ];

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
          dir       : true,
          sortingKey: 'fecha',
        } 
      );

      return (
        <>
          <div>
            <h1>{'ordenar:'}</h1>
            <span>{currentDispatcher.dir
              ? 'ascendente'
              : 'descendente'}</span>
            <span className="material-symbols-outlined">
              {currentDispatcher.dir
                ? 'arrow_upward'
                : 'arrow_downward'}
            </span>
          </div>
          {options.map(
            (
              {
                name, value, items 
              } 
            ) => {
                      return (
                        <section
                          key={value}
                          className={layout.sectionColumn}
                        >
                          <h5>{name}</h5>
                          <section className={layout.sectionRow}>
                            {items.map(
                              (
                                item 
                              ) => {
                                        return (
                                          <button
                                            key={item}
                                            type="button"
                                            className={
                                              currentDispatcher.sortingKey === item
                                                ? styles.buttonActiveCategory
                                                : styles.buttonPassiveCategory
                                            }
                                            onClick={() => {
                                                      console.log(
                                                        currentDispatcher[ value ] 
                                                      );

                                                      if ( item === 'asc' ) {
                                                        return dispatchCarpetas(
                                                          {
                                                            ...currentDispatcher,
                                                            dir: true,
                                                          } 
                                                        );
                                                      } else if ( item === 'dsc' ) {
                                                        return dispatchCarpetas(
                                                          {
                                                            ...currentDispatcher,
                                                            dir: false,
                                                          } 
                                                        );
                                                      }

                                                      return dispatchCarpetas(
                                                        {
                                                          ...currentDispatcher,
                                                          sortingKey: item as sortingType,
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
          <section className={layout.sectionColumn}>
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
                                                    dir       : !curdispatch.dir,
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
                                      dir: !d.dir,
                                    };
                          } 
                        );
                        dispatchCarpetas(
                          currentDispatcher 
                        );
              }}
              className={styles.buttonPassiveCategory}
            >
              {currentDispatcher.dir
                ? 'asc'
                : 'dsc'}
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
          dir       : true,
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
                                    dir       : !curdispatch.dir,
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
