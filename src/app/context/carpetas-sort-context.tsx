'use client';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react';

const CarpetasSortContext = createContext<MonCarpeta[] | null>(
  null
);

const CarpetasSortDispatchContext = createContext<Dispatch<{ type: string; sortDirection: boolean }> | null>(
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
      'useSearch must be used inside a SearchProvider'
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
      'useSearch must be used inside a SearchProvider'
    );
  }

  return context;
}

export function carpetasReducer(
  carpetas: MonCarpeta[], action: { type: string; sortDirection: boolean }
) {
  const {
    sortDirection, type
  } = action;

  switch ( type ) {
      case 'fecha': {

        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            if ( !a.fecha || a.fecha === undefined ) {
              return ( sortDirection
                ? 1
                : -1 );
            }

            if ( !b.fecha || b.fecha === undefined ) {
              return ( sortDirection
                ? -1
                : 1 );
            }

            const x = a.fecha.toISOString();

            const y = b.fecha.toISOString();

            if ( x < y ) {
              return ( sortDirection
                ? 1
                : -1 );
            }

            if ( x > y ) {
              return ( sortDirection
                ? -1
                : 1 );
            }

            return 0;
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

            if ( x < y ) {
              return ( sortDirection
                ? 1
                : -1 );
            }

            if ( x > y ) {
              return ( sortDirection
                ? -1
                : 1 );
            }

            return 0;
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
              return ( sortDirection
                ? 1
                : -1 );
            }

            if ( x > y ) {
              return ( sortDirection
                ? -1
                : 1 );
            }

            return 0;
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

            return 0;
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
              return 1;
            }

            if ( x > y ) {
              return -1;
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
