'use client';

import { useCarpetaSort, useCarpetaSortDispatch } from '#@/app/Context/carpetas-sort-context';
import { SortColumn, SortDirection } from '#@/app/Hooks/useCarpetasreducer';
import styles from './styles.module.css';
import toolbarStyles from './toolbar.module.css';

const SORT_OPTIONS: { value: SortColumn; label: string }[] = [
  { value: 'numero', label: 'Número' },
  { value: 'nombre', label: 'Nombre' },
  { value: 'fecha', label: 'Fecha' },
  { value: 'category', label: 'Categoría' },
  { value: 'tipoProceso', label: 'Tipo de proceso' },
  { value: 'revisado', label: 'Revisado' },
  { value: 'updatedAt', label: 'Última modificación' },
];

export function CarpetasSortButtons() {
  const {
    sort
  } = useCarpetaSort();

  const dispatchCarpetas = useCarpetaSortDispatch();

  const column = sort?.column ?? 'fecha';
  const direction = sort?.direction ?? 'asc';

  return (
    <div className={toolbarStyles.sortRow}>
      <span className={toolbarStyles.sortLabel}>Ordenar</span>
      <select
        className={toolbarStyles.select}
        value={column}
        onChange={( event ) => {
          return dispatchCarpetas( {
            type  : 'sort',
            column: event.target.value as SortColumn,
          } );
        }}
      >
        {SORT_OPTIONS.map( ( option ) => {
          return (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          );
        } )}
      </select>
      <button
        type="button"
        className={toolbarStyles.dirButton}
        onClick={() => {
          return dispatchCarpetas( {
            type     : 'sort',
            direction: direction === 'asc'
              ? 'dsc'
              : 'asc',
          } );
        }}
      >
        <span
          className="material-symbols-rounded"
          aria-hidden="true"
        >
          {direction === 'asc'
            ? 'arrow_upward'
            : 'arrow_downward'}
        </span>
        {direction === 'asc'
          ? 'Ascendente'
          : 'Descendente'}
      </button>
    </div>
  );
}

export function TableRowCarpetaSortingButton( {
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
} ) {
  const {
    sort
  } = useCarpetaSort();

  const dispatchCarpetas = useCarpetaSortDispatch();

  return (
    <th
      scope="col"
      className={styles.highlight}
    >
      <button
        type="button"
        onClick={() => {
          const nextDirection: SortDirection = sort?.column === sortKey && sort.direction === 'asc'
            ? 'dsc'
            : 'asc';

          return dispatchCarpetas( {
            type     : 'sort',
            column   : sortKey,
            direction: nextDirection,
          } );
        }}
        className={
          sort?.column === sortKey
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
