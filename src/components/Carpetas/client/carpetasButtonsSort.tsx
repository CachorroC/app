'use client';

import { useCarpetaSortDispatch } from '#@/app/context/carpetas-sort-context';
import styles from '#@/components/Buttons/buttons.module.css';
import { useState } from 'react';
import layout from '#@/styles/layout.module.css';
import { SortingKey } from '#@/lib/project/sortert';

export function CarpetasSortButtons() {
      const keys: SortingKey[] = [
        'fecha',
        'nombre',
        'id',
        'updatedAt',
        'numero',
        'category',
        'tipoProceso',
      ];

      const dispatchCarpetas = useCarpetaSortDispatch();

      const [ sortDirection, setSortDirection ] = useState(
        true 
      );

      return (
        <>
          <div>
            <h1>{'ordenar:'}</h1>
            <span> {sortDirection
              ? 'ascendente'
              : 'descendente'} </span>
            <span className="material-symbols-outlined">
              {sortDirection
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
                                      return dispatchCarpetas(
                                        {
                                          type      : 'sort',
                                          sortingKey: key,
                                          dir       : sortDirection
                                            ? 'asc'
                                            : 'dsc',
                                        } 
                                      );
                            }}
                            className={styles.buttonPassiveCategory}
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
                        return setSortDirection(
                          (
                            d 
                          ) => {
                                    return !d;
                          } 
                        );
              }}
              className={styles.buttonPassiveCategory}
            >
              {sortDirection
                ? 'asc'
                : 'dsc'}
            </button>
          </section>
        </>
      );
}
