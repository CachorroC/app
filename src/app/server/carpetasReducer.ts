import { MonCarpeta } from '#@/lib/types/carpetas';
import 'server-only';

export type SortActionType = {
  type: 'sort';
  dir: 'asc' | 'dsc';
  sortingKey:
    | 'fecha'
    | 'numero'
    | 'nombre'
    | 'category'
    | 'id'
    | 'tipoProceso'
    | 'updatedAt';
};

export type SearchActionType = {
  type: 'search';
  query: string;
};

export type FilterActionType = {
  type: 'filter';
  filteringKey: 'category' | 'terminado' | 'revisado' | 'tipoProceso';
  filteringValue: string;
};

export type ResetActionType = {
  type: 'reset';
  payload: MonCarpeta[];
};

export type IntAction =
  | FilterActionType
  | SearchActionType
  | SortActionType
  | ResetActionType;

export function carpetasReducer(
  carpetas: MonCarpeta[], action: IntAction 
) {
  const {
    type 
  } = action;

  switch ( type ) {
      case 'sort': {
        const {
          dir, sortingKey 
        } = action;

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

        const sorter = dir === 'asc'
          ? asc
          : dsc;

        const categoriesSorter: string[] = [
          'todos',
          'Bancolombia',
          'Reintegra',
          'SinEspecificar',
          'LiosJuridicos',
          'Insolvencia',
          'Terminados',
        ];

        switch ( sortingKey ) {
            case 'fecha': {
              return [
                ...carpetas
              ].sort( (
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
              } );
            }

            case 'category': {
              return [
                ...carpetas
              ].sort( (
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
              } );
            }

            case 'numero': {
              return [
                ...carpetas
              ].sort( (
                a, b 
              ) => {
                const x = a.numero;

                const y = b.numero;

                const idk = dir
                  ? x - y
                  : y - x;

                return idk;
              } );
            }

            case 'nombre': {
              return [
                ...carpetas
              ].sort( (
                a, b 
              ) => {
                const x = a.nombre;

                const y = b.nombre;

                if ( x < y ) {
                  return sorter[ 2 ];
                }

                if ( x > y ) {
                  return sorter[ 0 ];
                }

                return sorter[ 1 ];
              } );
            }

            default: {
              return [
                ...carpetas
              ].sort( (
                a, b 
              ) => {
                const aSortingKey = a[ sortingKey ];

                const bSortingKey = b[ sortingKey ];

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
              } );
            }
        }
      }

      case 'search': {
        const carpetasMap = [];

        const searchQuery = action.query.toLocaleLowerCase();

        if ( !searchQuery || searchQuery === '' ) {
          return [
            ...carpetas
          ];
        }

        for ( const carpeta of [
          ...carpetas
        ] ) {
          const nombreString = carpeta.nombre.toLocaleLowerCase();

          const carpetaQuery = nombreString.indexOf( searchQuery );

          if ( carpetaQuery === -1 ) {
            continue;
          }

          carpetasMap.push( carpeta );

          console.log( carpetaQuery );
        }

        return carpetasMap;
      }

      case 'filter': {
        return [
          ...carpetas
        ].filter( ( carpeta ) => {
          const querier = carpeta[ action.filteringKey ];

          if ( typeof querier === 'boolean' ) {
            return querier;
          }

          if (
            querier
              .toLocaleLowerCase()
              .indexOf( action.filteringKey.toLocaleLowerCase() ) === -1
          ) {
            return false;
          }

          return true;
        } );
      }

      case 'reset': {
        return action.payload;
      }

      default: {
        return [
          ...carpetas
        ].sort( (
          a, b 
        ) => {
          if ( !a.fecha || a.fecha === undefined ) {
            return 1;
          }

          if ( !b.fecha || b.fecha === undefined ) {
            return -1;
          }

          const x = a.fecha;

          const y = b.fecha;

          if ( x < y ) {
            return 1;
          }

          if ( x > y ) {
            return -1;
          }

          return 0;
        } );
      }
  }
}
