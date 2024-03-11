import { MonCarpeta } from '#@/lib/types/carpetas';

export type CarpetasReducerState = {
  carpetas: MonCarpeta[];
  completeCarpetas: MonCarpeta[];
};

export type SortActionType = {
  [x: string]: string;
  type: 'sort';
  dir: 'asc' | 'dsc';
  sortingKey:
    | 'fecha'
  | 'numero'
  | 'revisado'
    | 'nombre'
    | 'category'
    | 'id'
    | 'tipoProceso'
    | 'updatedAt';
};

export type UpdateActionType = {
  type: 'update';
  payload: MonCarpeta;
};

export type SearchActionType = {
  type: 'search';
  payload: string;
};

export type FilterActionType = {
  type: 'filter';
  filteringKey: 'category' | 'terminado' | 'revisado' | 'tipoProceso';
  filteringValue: string;
};

export type CategoryFilterActionType = {
  type: 'category-filter';
  exclude: (
    | 'Bancolombia'
    | 'Terminados'
    | 'Reintegra'
    | 'LiosJuridicos'
    | 'Insolvencia'
    | string
  )[];
};

export type ResetActionType = {
  type: 'reset';
};

export type IntAction =
  | FilterActionType
  | SearchActionType
  | SortActionType
  | ResetActionType
  | UpdateActionType
  | CategoryFilterActionType;

export function carpetasReducer(
  reducerState: CarpetasReducerState,
  action: IntAction,
): CarpetasReducerState {
      const {
        type
      } = action;

      const {
        carpetas, completeCarpetas
      } = reducerState;

      switch ( type ) {
          case 'reset': {
            return {
              carpetas        : completeCarpetas,
              completeCarpetas: completeCarpetas,
            };
          }

          case 'category-filter': {
            const {
              exclude
            } = action;

            if ( !exclude || exclude.length === 0 || exclude.includes(
              'todos'
            ) ) {
              return {
                carpetas        : completeCarpetas,
                completeCarpetas: completeCarpetas,
              };
            }

            const outgoingCarpetas = [];

            for ( const carpeta of completeCarpetas ) {
              const {
                category
              } = carpeta;

              const indexOf = exclude.indexOf(
                category
              );

              if ( indexOf !== -1 ) {
                outgoingCarpetas.push(
                  carpeta
                );
              }
            }

            return {
              carpetas        : outgoingCarpetas,
              completeCarpetas: completeCarpetas,
            };
          }

          case 'update': {
            const outGoingCarpetas = carpetas.map(
              (
                t
              ) => {
                        if ( t.numero === action.payload.numero ) {
                          return action.payload;
                        }

                        return t;
              }
            );
            return {
              carpetas        : outGoingCarpetas,
              completeCarpetas: completeCarpetas,
            };
          }

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
                  const sorted = [ ...carpetas ].sort(
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
                  return {
                    carpetas        : sorted,
                    completeCarpetas: completeCarpetas,
                  };
                }

                case 'category': {
                  const sorted = [ ...carpetas ].sort(
                    (
                      a, b
                    ) => {
                              const x = categoriesSorter.indexOf(
                                a.category
                              );

                              const y = categoriesSorter.indexOf(
                                b.category
                              );

                              if ( x < y ) {
                                return sorter[ 2 ];
                              }

                              if ( x > y ) {
                                return sorter[ 0 ];
                              }

                              return sorter[ 1 ];
                    }
                  );
                  return {
                    carpetas        : sorted,
                    completeCarpetas: completeCarpetas,
                  };
                }

                case 'numero': {
                  const sorted = [ ...carpetas ].sort(
                    (
                      a, b
                    ) => {
                              const x = a.numero;

                              const y = b.numero;

                              const idk = dir === 'asc'
                                ? y - x
                                : x - y;

                              return idk;
                    }
                  );
                  return {
                    carpetas        : sorted,
                    completeCarpetas: completeCarpetas,
                  };
                }

                case 'nombre': {
                  const sorted = [ ...carpetas ].sort(
                    (
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
                    }
                  );
                  return {
                    carpetas        : sorted,
                    completeCarpetas: completeCarpetas,
                  };
                }

                case 'revisado': {
                  const sorted = [ ...carpetas ].filter(
                    (
                      carpeta
                    ) => {
                              if ( dir === 'asc' ) {
                                return carpeta.revisado;
                              }

                              return !carpeta.revisado;
                    }
                  );
                  return {
                    carpetas        : sorted,
                    completeCarpetas: completeCarpetas,
                  };
                }

                default: {
                  const sorted = [ ...carpetas ].sort(
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
                  return {
                    carpetas        : sorted,
                    completeCarpetas: completeCarpetas,
                  };
                }
            }
          }

          case 'search': {
            const searchQuery = action.payload
                  .normalize(
                    'NFD'
                  )
                  .replace(
                    /[\u0300-\u036f]/g, ''
                  )
                  .trim()
                  .toLocaleLowerCase();

            console.log(
              `searchQuery: ${ searchQuery }`
            );

            const sorted = [ ...completeCarpetas ].filter(
              (
                carpeta
              ) => {
                        const {
                          nombre
                        } = carpeta;

                        const normalizedName = nombre
                              .normalize(
                                'NFD'
                              )
                              .replace(
                                /[\u0300-\u036f]/g, ''
                              )
                              .trim()
                              .toLocaleLowerCase();

                        return normalizedName.includes(
                          searchQuery
                        );
              }
            );
            return {
              carpetas        : sorted,
              completeCarpetas: completeCarpetas,
            };
          }

          case 'filter': {
            const sorted = [ ...completeCarpetas ].filter(
              (
                carpeta
              ) => {
                        const querier = carpeta[ action.filteringKey ];

                        if ( typeof querier === 'boolean' ) {
                          return querier;
                        }

                        if (
                          querier
                                .toLocaleLowerCase()
                                .indexOf(
                                  action.filteringKey.toLocaleLowerCase()
                                ) === -1
                        ) {
                          return false;
                        }

                        return true;
              }
            );
            return {
              carpetas        : sorted,
              completeCarpetas: completeCarpetas,
            };
          }

          default: {
            const sorted = [ ...carpetas ].sort(
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
            return {
              carpetas        : sorted,
              completeCarpetas: completeCarpetas,
            };
          }
      }
}
