'use client';

import { useNotaSortDispatch } from '#@/app/Context/notas-sort-context';
import button from '#@/components/Buttons/buttons.module.css';
import { useState } from 'react';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';

export function NotasSortButtons() {
      const keys: (  | 'carpetaNumero'
    | 'id'
    | 'dueDate'
    | 'createdAt'
    | 'text'
    | 'updatedAt' )[]= [
        'dueDate',
        'text',
        'updatedAt',
        'carpetaNumero',
        'id',
      ];

      const dispatchNotas = useNotaSortDispatch();

      const [ sortDirection, setSortDirection ] = useState(
        true
      );

      return (
        <div className={layout.sectionColumn}>
          <section className={layout.sectionRow}>
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

          <section className={layout.sectionRow}>
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
                                          type      : 'sort',
                                          dir       : sortDirection,
                                          sortingKey: key
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
