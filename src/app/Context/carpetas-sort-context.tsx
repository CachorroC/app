'use client';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { Dispatch,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer, } from 'react';
import { IntAction,
  CarpetasReducerState,
  carpetasReducer,
  getFilterValue,
  getEstadoTags,
  getSortComparator,
  normalizeSearchText,
  matchesSearch,
  FilterableColumn, } from '../Hooks/useCarpetasreducer';

export const sortByDateDesc = (
  a: MonCarpeta, b: MonCarpeta
) => {
  // 1. Normalize inputs to Date objects (or null if missing)
  // new Date() handles both ISO strings and existing Date objects correctly
  const dateA = a.fecha
    ? new Date( a.fecha )
    : null;
  const dateB = b.fecha
    ? new Date( b.fecha )
    : null;

  // 2. Handle null/undefined dates (push them to the bottom of the list)
  if ( !dateA && !dateB ) {
    return 0;
  }

  if ( !dateA ) {
    return 1;
  }

  if ( !dateB ) {
    return -1;
  }

  // 3. Compare timestamps
  // Descending Order (Newest First): dateB - dateA
  // Ascending Order (Oldest First): dateA - dateB
  return dateB.getTime() - dateA.getTime();
};

type CarpetasSortContextValue = CarpetasReducerState & { carpetas: MonCarpeta[] };

const CarpetasSortContext = createContext<CarpetasSortContextValue | null>( null );

const CarpetasSortDispatchContext = createContext<Dispatch<IntAction> | null>( null, );

export function CarpetasSortProvider( {
  children,
  initialCarpetas,
}: {
  children       : ReactNode;
  initialCarpetas: MonCarpeta[];
} ) {
  const sortedInitial = [
    ...initialCarpetas
  ].sort( sortByDateDesc );
  const [
    carpetasReduced,
    dispatchCarpetas
  ] = useReducer(
    carpetasReducer, {
      completeCarpetas: sortedInitial,
      filters         : {},
      search          : '',
      sort            : null,
      selected        : new Set<number>(),
    }
  );

  const carpetas = useMemo(
    () => {
      const {
        completeCarpetas, filters, search, sort
      } = carpetasReduced;

      let result = completeCarpetas;

      for ( const column of Object.keys( filters ) as FilterableColumn[] ) {
        const values = filters[ column ];

        if ( !values || values.size === 0 ) {
          continue;
        }

        if ( column === 'estado' ) {
          result = result.filter( ( carpeta ) => {
            return getEstadoTags( carpeta ).some( ( tag ) => {
              return values.has( tag );
            } );
          } );

          continue;
        }

        result = result.filter( ( carpeta ) => {
          return values.has( getFilterValue(
            carpeta, column
          ) );
        } );
      }

      const query = normalizeSearchText( search.trim() );

      if ( query ) {
        result = result.filter( ( carpeta ) => {
          return matchesSearch(
            carpeta, query
          );
        } );
      }

      if ( sort ) {
        result = [
          ...result
        ].sort( getSortComparator(
          sort.column, sort.direction
        ) );
      }

      return result;
    }, [
      carpetasReduced
    ]
  );

  return (
    <CarpetasSortContext.Provider
      value={{
        ...carpetasReduced,
        carpetas,
      }}
    >
      <CarpetasSortDispatchContext.Provider value={dispatchCarpetas}>
        {children}
      </CarpetasSortDispatchContext.Provider>
    </CarpetasSortContext.Provider>
  );
}

export function useCarpetaSort() {
  const context = useContext( CarpetasSortContext );

  if ( context === null ) {
    throw new Error( 'useCarpetaSort  must be used inside a carpetasort provider r', );
  }

  return context;
}

export function useCarpetaSortDispatch() {
  const context = useContext( CarpetasSortDispatchContext );

  if ( context === null ) {
    throw new Error( 'useSortDispatchCarpetas must be used inside a CarpetasProvider', );
  }

  return context;
}
