'use client';

import { useCarpetaSortDispatch } from '#@/app/context/carpetas-sort-context';
import styles from '#@/components/Buttons/buttons.module.css';
import { ActionType } from '#@/lib/types/context-actions';
import { useState } from 'react';

export function CarpetasSortButtons() {
  const keys: ActionType[] = [
    'fecha',
    'nombre',
    'numero',
    'category',
    'tipoProceso',
    'cc',
  ];

  const dispatchCarpetas = useCarpetaSortDispatch();

  const [
    sortDirection,
    setSortDirection
  ] = useState(
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
      <section className={styles.segmentColumn}>
        {keys.map(
          (
            key 
          ) => {
            return (
              <button
                type="button"
                onClick={() => {
                  setSortDirection(
                    (
                      d 
                    ) => {
                      return !d;
                    } 
                  );
                  dispatchCarpetas(
                    {
                      type         : key,
                      sortDirection: sortDirection,
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
      </section>
    </>
  );
}
