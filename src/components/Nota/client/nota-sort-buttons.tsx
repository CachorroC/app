'use client';

import { useNotaSortDispatch } from '#@/app/context/notas-sort-context';
import button from '#@/components/Buttons/buttons.module.css';
import { ActionNotaType } from '#@/lib/types/context-actions';
import { useState } from 'react';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';

export function NotasSortButtons() {
  const keys: ActionNotaType[] = [
    'date',
    'text',
    'carpetaNumero',
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
    <div className={layout.sectionColumn}>
      <section className={ layout.sectionRow }>
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
