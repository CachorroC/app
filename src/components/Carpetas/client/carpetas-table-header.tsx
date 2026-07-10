'use client';

import { useCarpetaSort, useCarpetaSortDispatch } from '#@/app/Context/carpetas-sort-context';
import { SortColumn, SortDirection } from '#@/app/Hooks/useCarpetasreducer';
import { CarpetaCheckbox } from './carpeta-checkbox';
import styles from './carpetas-table-header.module.css';

const COLUMNS: { label: string; sortKey?: SortColumn }[] = [
  { label: 'Número', sortKey: 'numero' },
  { label: 'Parte', sortKey: 'nombre' },
  { label: 'Fecha', sortKey: 'fecha' },
  { label: 'Categoría', sortKey: 'category' },
  { label: 'Tipo', sortKey: 'tipoProceso' },
  { label: 'Estado', sortKey: 'revisado' },
  { label: 'Juzgado' },
  { label: 'Última actuación' },
  { label: 'Notas' },
  { label: 'Radicado' },
  { label: 'Expediente' },
  { label: 'Revisado' },
];

export function CarpetasTableHeader( {
  allSelected,
  someSelected,
  onSelectAll,
}: {
  allSelected  : boolean;
  someSelected : boolean;
  onSelectAll  : ( next: boolean ) => void;
} ) {
  const { sort } = useCarpetaSort();
  const dispatchCarpetas = useCarpetaSortDispatch();

  return (
    <thead>
      <tr className={styles.headRow}>
        <th
          scope="col"
          className={styles.checkboxCell}
        >
          <CarpetaCheckbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={onSelectAll}
            ariaLabel="Seleccionar todo"
          />
        </th>
        {COLUMNS.map( ( column ) => {
          const active = column.sortKey !== undefined && sort?.column === column.sortKey;
          const direction: SortDirection = active && sort?.direction === 'asc'
            ? 'dsc'
            : 'asc';

          return (
            <th
              key={column.label}
              scope="col"
              className={styles.th}
              data-sortable={column.sortKey !== undefined}
              data-active={active}
              onClick={column.sortKey
                ? () => {
                  return dispatchCarpetas( {
                    type     : 'sort',
                    column   : column.sortKey,
                    direction,
                  } );
                }
                : undefined}
            >
              <span className={styles.thLabel}>
                {column.label}
                {active && (
                  <span
                    className="material-symbols-rounded"
                    aria-hidden="true"
                  >
                    {sort?.direction === 'asc'
                      ? 'arrow_upward'
                      : 'arrow_downward'}
                  </span>
                )}
              </span>
            </th>
          );
        } )}
      </tr>
    </thead>
  );
}
