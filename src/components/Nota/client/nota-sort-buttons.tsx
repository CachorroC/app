'use client';

import { useNotaSortDispatch } from '#@/app/context/notas-sort-context';
import button from '#@/components/Buttons/buttons.module.css';
import { ActionNotaType } from '#@/lib/types/context-actions';
import { useState } from 'react';
import typography from '#@/styles/fonts/typography.module.scss';
import styles from '#@/components/form/form.module.css';

export function NotasSortButtons() {
  const keys: ActionNotaType[] = [
    'date',
    'done',
    'text',
    'llaveProceso',
    'cod',
  ];

  const dispatchNotas = useNotaSortDispatch();

  const [
    sortDirection,
    setSortDirection
  ] = useState(
    true 
  );

  return (
    <div className={styles.section}>
      <section className={styles.section}>
        <h2 className={typography.titleMedium}>{'ordenar:'}</h2>
        <span className={typography.labelMedium}>
          {' '}
          {sortDirection
            ? 'ascendente'
            : 'descendente'}{' '}
        </span>
        <span className="material-symbols-outlined">
          {sortDirection
            ? 'arrow_upward'
            : 'arrow_downward'}
        </span>
      </section>

      <section className={styles.section}>
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
                  dispatchNotas(
                    {
                      type         : key,
                      sortDirection: sortDirection,
                    } 
                  );
                }}
                className={button.buttonPassiveCategory}
                key={key}
              >
                {key}
              </button>
            );
          } 
        )}
      </section>
    </div>
  );
}
