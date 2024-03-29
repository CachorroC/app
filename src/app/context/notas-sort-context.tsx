'use client';
import { IntNotaAction } from '#@/lib/types/context-actions';
import { monNota } from '#@/lib/types/notas';
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react';



const NotasSortContext = createContext<monNota[] | null>(
  null
);

const NotasSortDispatchContext = createContext<Dispatch<IntNotaAction> | null>(
  null
);

export function NotasSortProvider(
  {
    children, notas
  }: { children: ReactNode;  notas : monNota[]}
) {
  const [
    notasReduced,
    dispatchNotas
  ] =useReducer(
    notasReducer, notas
  );

  return (
    <NotasSortContext.Provider value={
      notasReduced
    }>
      <NotasSortDispatchContext.Provider value={dispatchNotas}>
        { children }
      </NotasSortDispatchContext.Provider>
    </NotasSortContext.Provider>
  );
}

export function useNotaSort () {
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

export function useNotaSortDispatch () {

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

export function notasReducer(
  notas: monNota[], action: IntNotaAction
) {
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


      case 'date': {

        return [
          ...notas
        ].sort(
          (
            a, b
          ) => {
            if ( !a.date || a.date === undefined ) {
              return sorter[ 2 ];
            }

            if ( !b.date || b.date === undefined ) {
              return sorter[ 0 ];
            }

            const x = a.date.toISOString();

            const y = b.date.toISOString();

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

      case 'llaveProceso': {

        return [
          ...notas
        ].sort(
          (
            a, b
          ) => {
            if ( !a.llaveProceso || a.llaveProceso === undefined ) {
              return sorter[ 2 ];
            }

            if ( !b.llaveProceso || b.llaveProceso === undefined ) {
              return sorter[ 0 ];
            }

            const x = a.date.toISOString();

            const y = b.date.toISOString();

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

      case 'cod': {

        return [
          ...notas
        ].sort(
          (
            a, b
          ) => {
            const x = a.cod;

            const y = b.cod;

            const idk  = sortDirection
              ? x-y
              : y-x;

            return idk;
          }
        );
      }

      case 'done': {

        return [
          ...notas
        ].sort(
          (
            a, b
          ) => {
            const x = a.done;

            const y = b.done;

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

      case 'text': {
        return [
          ...notas
        ].sort(
          (
            a, b
          ) => {
            const x = a.text;

            const y = b.text;

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
        throw Error(
          'Unknown action: ' + action.type
        );
      }
  }
}
