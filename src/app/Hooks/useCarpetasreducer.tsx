/* eslint-disable no-unused-vars */
import { MonCarpeta } from '#@/lib/types/carpetas';

export const DEFAULT_CIUDAD = 'Bogotá';

export const categoriesSorter: string[] = [
  'todos',
  'Bancolombia',
  'Reintegra',
  'SinEspecificar',
  'LiosJuridicos',
  'Insolvencia',
  'Terminados',
];

export type FilterableColumn = 'category' | 'ciudad';

export type FilterState = Partial<Record<FilterableColumn, Set<string>>>;

export type SortColumn =
  | 'fecha'
  | 'numero'
  | 'revisado'
  | 'nombre'
  | 'category'
  | 'id'
  | 'tipoProceso'
  | 'updatedAt';

export type SortDirection = 'asc' | 'dsc';

export type SortState = {
  column   : SortColumn;
  direction: SortDirection;
} | null;

export type CarpetasReducerState = {
  completeCarpetas: MonCarpeta[];
  filters         : FilterState;
  search          : string;
  sort            : SortState;
};

export type SetFilterActionType = {
  type  : 'set-filter';
  column: FilterableColumn;
  values: Set<string>;
};

export type SortActionType = {
  type      : 'sort';
  column?   : SortColumn;
  direction?: SortDirection;
};

export type SearchActionType = {
  type   : 'search';
  payload: string;
};

export type UpdateActionType = {
  type   : 'update';
  payload: Partial<MonCarpeta> & { numero: number };
};

export type ResetActionType = {
  type: 'reset';
};

export type IntAction =
  | SetFilterActionType
  | SortActionType
  | SearchActionType
  | UpdateActionType
  | ResetActionType;

const DIACRITICS_PATTERN = new RegExp(
  '[\\u0300-\\u036f]', 'g' 
);

export function normalizeSearchText( value: string ) {
  return value
    .normalize( 'NFD' )
    .replace(
      DIACRITICS_PATTERN, ''
    )
    .trim()
    .toLocaleLowerCase();
}

export function getFilterValue(
  carpeta: MonCarpeta, column: FilterableColumn
): string {
  if ( column === 'ciudad' ) {
    return carpeta.ciudad ?? DEFAULT_CIUDAD;
  }

  return carpeta.category;
}

export function getSortComparator(
  column: SortColumn, direction: SortDirection
): ( a: MonCarpeta, b: MonCarpeta ) => number {
  const asc = [
    -1,
    0,
    1
  ];

  const dsc = [
    1,
    0,
    -1
  ];

  const sorter = direction === 'asc'
    ? asc
    : dsc;

  switch ( column ) {
      case 'fecha': {
        return (
          a, b
        ) => {
          if ( !a.fecha || a.fecha === undefined ) {
            return sorter[ 2 ];
          }

          if ( !b.fecha || b.fecha === undefined ) {
            return sorter[ 0 ];
          }

          const x = a.fecha;

          const y = b.fecha;

          if ( x < y ) {
            return sorter[ 2 ];
          }

          if ( x > y ) {
            return sorter[ 0 ];
          }

          return sorter[ 1 ];
        };
      }

      case 'category': {
        return (
          a, b
        ) => {
          const x = categoriesSorter.indexOf( a.category );

          const y = categoriesSorter.indexOf( b.category );

          if ( x < y ) {
            return sorter[ 2 ];
          }

          if ( x > y ) {
            return sorter[ 0 ];
          }

          return sorter[ 1 ];
        };
      }

      case 'numero': {
        return (
          a, b
        ) => {
          const x = a.numero;

          const y = b.numero;

          return direction === 'asc'
            ? y - x
            : x - y;
        };
      }

      case 'nombre': {
        return (
          a, b
        ) => {
          const x = a.nombre.trim()
            .toLocaleLowerCase();

          const y = b.nombre.trim()
            .toLocaleLowerCase();

          if ( x < y ) {
            return sorter[ 2 ];
          }

          if ( x > y ) {
            return sorter[ 0 ];
          }

          return sorter[ 1 ];
        };
      }

      case 'revisado': {
        return (
          a, b
        ) => {
          const x = Number( a.revisado );

          const y = Number( b.revisado );

          return direction === 'asc'
            ? x - y
            : y - x;
        };
      }

      default: {
        return (
          a, b
        ) => {
          const aSortingKey = a[ column ];

          const bSortingKey = b[ column ];

          if ( !aSortingKey || aSortingKey === undefined ) {
            return sorter[ 2 ];
          }

          if ( !bSortingKey || bSortingKey === undefined ) {
            return sorter[ 0 ];
          }

          if ( aSortingKey < bSortingKey ) {
            return sorter[ 2 ];
          }

          if ( aSortingKey > bSortingKey ) {
            return sorter[ 0 ];
          }

          return 0;
        };
      }
  }
}

export function carpetasReducer(
  reducerState: CarpetasReducerState,
  action: IntAction,
): CarpetasReducerState {
  const {
    type
  } = action;

  const {
    completeCarpetas, filters
  } = reducerState;

  switch ( type ) {
      case 'reset': {
        return {
          ...reducerState,
          filters: {},
          search : '',
          sort   : null,
        };
      }

      case 'set-filter': {
        const nextFilters = {
          ...filters
        };

        if ( action.values.size === 0 ) {
          delete nextFilters[ action.column ];
        } else {
          nextFilters[ action.column ] = action.values;
        }

        return {
          ...reducerState,
          filters: nextFilters,
        };
      }

      case 'search': {
        return {
          ...reducerState,
          search: action.payload,
        };
      }

      case 'sort': {
        const column = action.column ?? reducerState.sort?.column ?? 'fecha';

        const direction = action.direction ?? reducerState.sort?.direction ?? 'asc';

        return {
          ...reducerState,
          sort: {
            column,
            direction,
          },
        };
      }

      case 'update': {
        const nextCompleteCarpetas = completeCarpetas.map( ( carpeta ) => {
          if ( carpeta.numero === action.payload.numero ) {
            return {
              ...carpeta,
              ...action.payload,
            };
          }

          return carpeta;
        } );

        return {
          ...reducerState,
          completeCarpetas: nextCompleteCarpetas,
        };
      }

      default: {
        return reducerState;
      }
  }
}
