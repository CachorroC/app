'use client';
import { useCarpetaSort,
  useCarpetaSortDispatch, } from '#@/app/Context/carpetas-sort-context';
import styles from './toolbar.module.css';

export function ResetButtonSorter() {
  const dispatchCarpetas = useCarpetaSortDispatch();

  const {
    filters, search 
  } = useCarpetaSort();

  const hasActiveFilters
    = search.trim().length > 0
    || Object.values( filters )
      .some( ( values ) => {
        return values && values.size > 0;
      } );

  if ( !hasActiveFilters ) {
    return null;
  }

  return (
    <div className={styles.clearRow}>
      <button
        type="button"
        className={styles.clearButton}
        onClick={() => {
          return dispatchCarpetas( {
            type: 'reset',
          } );
        }}
      >
        <span
          className="material-symbols-rounded"
          aria-hidden="true"
        >
          filter_alt_off
        </span>
        Limpiar filtros
      </button>
    </div>
  );
}
