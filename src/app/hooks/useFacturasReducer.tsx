
import { monFactura } from '#@/lib/types/contabilidad';

export type SortActionType = {
  type: 'sort';
  dir: 'asc' | 'dsc';
  sortingKey:
  | 'fecha';
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
  payload: monFactura[]
};

export type IntAction =
  | FilterActionType
  | SearchActionType
  | SortActionType
  | ResetActionType;


export function facturasReducer (
  facturas: monFactura[], action: IntAction
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



            switch ( sortingKey ) {
                case 'fecha': {
                  return [ ...facturas ].sort(
                    (
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
                    }
                  );
                }

                default: {
                  return [ ...facturas ].sort(
                    (
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
                    }
                  );
                }
            }

          }

          case 'search': {
            const facturasMap = [];

            const searchQuery = action.query.toLocaleLowerCase();

            if ( !searchQuery || searchQuery === '' ) {
              return [ ...facturas ];
            }

            for ( const carpeta of [ ...facturas ] ) {

              const nombreString = carpeta.concepto.toLocaleLowerCase();

              const carpetaQuery = nombreString.indexOf(
                searchQuery
              );

              if ( carpetaQuery === -1 ) {
                continue;
              }

              facturasMap.push(
                carpeta
              );

              console.log(
                carpetaQuery
              );
            }

            return facturasMap;
          }
          /*
        case 'filter': {
          return [ ...facturas ].filter(
            (
              carpeta
            ) =>
            {
              const querier = carpeta[ action.filteringKey ];

              if ( typeof querier === 'boolean' )
              {
                return querier;
              }

              if (
                querier
                  .toLocaleLowerCase()
                  .indexOf(
                    action.filteringKey.toLocaleLowerCase()
                  ) === -1
              )
              {
                return false;
              }

              return true;
            }
          );
        } */

          case 'reset': {
            return action.payload;
          }

          default: {
            return [ ...facturas ].sort(
              (
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
              }

            );
          }
      }
}
