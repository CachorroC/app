'use client';
import { IntNota, NotaAction } from '#@/lib/types/notas';
import { Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer, } from 'react';

const NotasSortContext = createContext<IntNota[] | null>(
  null
);

const NotasSortDispatchContext = createContext<Dispatch<NotaAction> | null>(
  null,
);

export function NotasSortProvider(
  {
    children,
    notas,
  }: {
    children: ReactNode;
    notas: IntNota[];
  }
) {
      const [ notasReduced, dispatchNotas ] = useReducer(
        notasReducer, notas
      );

      return (
        <NotasSortContext.Provider value={notasReduced}>
          <NotasSortDispatchContext.Provider value={dispatchNotas}>
            {children}
          </NotasSortDispatchContext.Provider>
        </NotasSortContext.Provider>
      );
}

export function useNotaSort() {
      const context = useContext(
        NotasSortContext
      );

      if ( context === null ) {
        throw new Error(
          'useNotaSort  must be used inside a notasort provider r'
        );
      }

      return context;
}

export function useNotaSortDispatch() {
      const context = useContext(
        NotasSortDispatchContext
      );

      if ( context === null ) {
        throw new Error(
          'useSortDispatchNotas must be used inside a NotasProvider'
        );
      }

      return context;
}

export function notasReducer (
  tasks: IntNota[], action: NotaAction
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

            const sorter = dir
              ? asc
              : dsc;



            switch ( sortingKey ) {
                case 'updatedAt': {
                  return [ ...tasks ].sort(
                    (
                      a, b
                    ) => {
                              if ( !a.updatedAt || a.updatedAt === undefined || a.updatedAt.toString() === 'Invalid Date' ) {
                                return sorter[ 2 ];
                              }

                              if ( !b.updatedAt || b.updatedAt === undefined || b.updatedAt.toString() === 'Invalid Date' ) {
                                return sorter[ 0 ];
                              }

                              const x = a.updatedAt;

                              const y = b.updatedAt;

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

                case 'createdAt': {
                  return [ ...tasks ].sort(
                    (
                      a, b
                    ) => {
                              if ( !a.createdAt || a.createdAt === undefined || a.createdAt.toString() === 'Invalid Date' ) {
                                return sorter[ 2 ];
                              }

                              if ( !b.createdAt || b.createdAt === undefined || b.createdAt.toString() === 'Invalid Date' ) {
                                return sorter[ 0 ];
                              }

                              const x = a.createdAt;

                              const y = b.createdAt;

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

                case 'dueDate': {
                  return [ ...tasks ].sort(
                    (
                      a, b
                    ) => {
                              if ( !a.dueDate || a.dueDate === undefined || a.dueDate.toString() === 'Invalid Date' ) {
                                return sorter[ 2 ];
                              }

                              if ( !b.dueDate || b.dueDate === undefined ||  b.dueDate.toString() === 'Invalid Date' ) {
                                return sorter[ 0 ];
                              }

                              const x = a.dueDate;

                              const y = b.dueDate;

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

                case 'id': {
                  return [ ...tasks ].sort(
                    (
                      a, b
                    ) => {
                              const valortotalA = a.id ?? 0;

                              const valortotalB = b.id ?? 0;

                              if ( valortotalA < valortotalB ) {
                                return sorter[ 2 ];
                              } else if ( valortotalA > valortotalB ) {
                                return sorter[ 0 ];
                              }

                              return 0;


                    }
                  );
                }


                default: {
                  return [ ...tasks ].sort(
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

          case 'added': {
            return [ ...tasks,
              {
                ...action.task
              } ];
          }

          case 'changed': {
            return tasks.map(
              t => {
                        if ( t.id === action.task.id ) {
                          return action.task;
                        }

                        return t;

              }
            );
          }

          case 'deleted': {
            return tasks.filter(
              t => {
                        return t.id !== action.id;
              }
            );
          }

          case 'reset': {
            return action.payload;
          }

          default: {
            return [ ...tasks ].sort(
              (
                a, b
              ) => {
                        if ( !a.dueDate || a.dueDate === undefined ||  a.dueDate.toString() === 'Invalid Date' ) {
                          return 1;
                        }

                        if ( !b.dueDate || b.dueDate === undefined ||  b.dueDate.toString() === 'Invalid Date' ) {
                          return -1;
                        }

                        const x = a.dueDate;

                        const y = b.dueDate;

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
