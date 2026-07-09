'use client';

import { useCarpetaSort, useCarpetaSortDispatch } from '#@/app/Context/carpetas-sort-context';
import { SortColumn, SortDirection } from '#@/app/Hooks/useCarpetasreducer';
import styles from './styles.module.css';

export function CarpetasSortButtons( {
  options,
}: {
  options: readonly {
    name : string;
    value: 'dir' | 'sortingKey';
    items: readonly string[];
  }[];
} ) {
  const {
    sort
  } = useCarpetaSort();

  const dispatchCarpetas = useCarpetaSortDispatch();

  return (
    <>
      <h1>{'ordenar:'}</h1>

      {options.map( ( {
        name, value, items
      } ) => {
        return (
          <section key={value}>
            <h5>{name}</h5>
            <section>
              {items.map( ( item ) => {
                const isActive = value === 'dir'
                  ? sort?.direction === item
                  : sort?.column === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      return dispatchCarpetas( value === 'dir'
                        ? {
                            type     : 'sort',
                            direction: item as SortDirection,
                          }
                        : {
                            type  : 'sort',
                            column: item as SortColumn,
                          } );
                    }}
                    className={
                      isActive
                        ? styles.buttonCategoryActive
                        : styles.buttonCategoryPasive
                    }
                  >
                    {item === 'asc'
                      ? 'Z-A'
                      : item === 'dsc'
                        ? 'A-Z'
                        : item === 'fecha'
                          ? 'fecha de la ultima actuación'
                          : item}
                  </button>
                );
              } )}
            </section>
          </section>
        );
      } )}
    </>
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
