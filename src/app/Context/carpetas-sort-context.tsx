'use client';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer, } from 'react';
import { IntAction, carpetasReducer } from '../Hooks/useCarpetasreducer';

const CarpetasSortContext = createContext<MonCarpeta[] | null>(
  null
);

const CarpetasSortDispatchContext = createContext<Dispatch<IntAction> | null>(
  null,
);


export function CarpetasSortProvider(
  {
    children,
    initialCarpetas,
  }: {
    children: ReactNode;
    initialCarpetas: MonCarpeta[];
  }
) {

      const [ carpetasReduced, dispatchCarpetas ] = useReducer(
        carpetasReducer,
        initialCarpetas,
      );

      return (
        <CarpetasSortContext.Provider value={carpetasReduced}>
          <CarpetasSortDispatchContext.Provider value={dispatchCarpetas}>
            {children}
          </CarpetasSortDispatchContext.Provider>
        </CarpetasSortContext.Provider>
      );
}


export function useCarpetaSort() {
      const context = useContext(
        CarpetasSortContext
      );

      if ( context === null ) {
        throw new Error(
          'useCarpetaSort  must be used inside a carpetasort provider r',
        );
      }

      return context;
}

export function useCarpetaSortDispatch() {
      const context = useContext(
        CarpetasSortDispatchContext
      );

      if ( context === null ) {
        throw new Error(
          'useSortDispatchCarpetas must be used inside a CarpetasProvider',
        );
      }

      return context;
}

/* export function carpetasReducer(
  carpetas: MonCarpeta[], action: IntAction
) {
      const categoriesSorter: Category[] = [
        'todos',
        'Bancolombia',
        'Reintegra',
        'SinEspecificar',
        'LiosJuridicos',
        'Insolvencia',
        'Terminados',
      ];

      const {
        sortDirection, type
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

      const sorter = sortDirection
        ? asc
        : dsc;

      switch ( type ) {
          case 'fecha': {
            return [
              ...carpetas
            ].sort(
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

          case 'category': {
            return [
              ...carpetas
            ].sort(
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
          }

          case 'numero': {
            return [
              ...carpetas
            ].sort(
              (
                a, b
              ) => {
                        const x = a.numero;

                        const y = b.numero;

                        const idk = sortDirection
                          ? x - y
                          : y - x;

                        return idk;
              }
            );
          }

          case 'nombre': {
            return [
              ...carpetas
            ].sort(
              (
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
              }
            );
          }

          default: {
            return [
              ...carpetas
            ].sort(
              (
                a, b
              ) => {
                        const x = a[ type ];

                        const y = b[ type ];

                        if ( !x || x === undefined ) {
                          return sorter[ 2 ];
                        }

                        if ( !y || y === undefined ) {
                          return sorter[ 0 ];
                        }

                        if ( x < y ) {
                          return sorter[ 2 ];
                        }

                        if ( x > y ) {
                          return sorter[ 0 ];
                        }

                        return 0;
              }
            );
          }
      }
}
 */
