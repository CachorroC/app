'use client';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { IntAction } from '#@/lib/types/context-actions';
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react';



const CarpetasSortContext = createContext<MonCarpeta[] | null>(
  null
);

const CarpetasSortDispatchContext = createContext<Dispatch<IntAction> | null>(
  null
);

export function CarpetasSortProvider(
  {
    children, carpetas
  }: { children: ReactNode;  carpetas : MonCarpeta[]}
) {
  const [
    carpetasReduced,
    dispatchCarpetas
  ] =useReducer(
    carpetasReducer, carpetas
  );

  return (
    <CarpetasSortContext.Provider value={
      carpetasReduced
    }>
      <CarpetasSortDispatchContext.Provider value={dispatchCarpetas}>
        { children }
      </CarpetasSortDispatchContext.Provider>
    </CarpetasSortContext.Provider>
  );
}

export function useCarpetaSort () {
  const context = useContext(
    CarpetasSortContext
  );

  if ( context === null ) {
    throw new Error(
      'useCarpetaSort  must be used inside a carpetasort provider r'
    );
  }

  return context;
}

export function useCarpetaSortDispatch () {

  const context = useContext(
    CarpetasSortDispatchContext
  );

  if ( context === null ) {
    throw new Error(
      'useSortDispatchCarpetas must be used inside a CarpetasProvider'
    );
  }

  return context;
}

export function carpetasReducer(
  carpetas: MonCarpeta[], action: IntAction
) {
  const {
    sortDirection, type, search
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

  const upper = sortDirection
    ? 1
    : -1;

  const downer =  sortDirection
    ? -1
    : 1;

  switch ( type ) {

      case 'filter': {
        return carpetas.filter(
          (
            t
          ) => {
            return t.category !== action.category;
          }
        );
      }

      case 'search': {
        const utilString = search
          ? search
          : 'sin busqueda';

        return [
          ...carpetas
        ].filter(
          (
            carpeta
          ) => {
            return carpeta.nombre === utilString;
          }
        );
      }

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

            const x = a.fecha.toISOString();

            const y = b.fecha.toISOString();

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



            const x = a.categoryTag;

            const y = b.categoryTag;

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

      case 'categoryTag': {
        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            const x = a.categoryTag;

            const y = b.categoryTag;

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

            const idk  = sortDirection
              ? x-y
              : y-x;

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

      case 'primerNombre': {


        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            const x = a.deudor.primerNombre;

            const y = b.deudor.primerNombre;

            if ( x < y ) {
              return 1;
            }

            if ( x > y ) {
              return -1;
            }

            return sorter[ 1 ];
          }
        );
      }

      case 'primerApellido': {


        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            const x = a.deudor.primerApellido;

            const y = b.deudor.primerApellido;

            if ( x < y ) {
              return upper;
            }

            if ( x > y ) {
              return  downer;
            }

            return 0;
          }
        );
      }

      default: {
        throw Error(
          'Unknown action: ' + action.type
        );
      }
  }
}
