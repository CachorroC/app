/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { createContext,
  useReducer,
  useMemo,
  useContext,
  ReactNode,
  Dispatch } from 'react';
import { useDebounce } from '../Hooks/useDebounce';

// --- TYPES ---
export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
  key: keyof T | null;
  direction: SortDirection;
}

// 1. STATE SHAPE
// We replace 'categoryFilter' with a generic 'filters' dictionary
interface TableState<T> {
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  filters: Partial<Record<keyof T, any>>; // <--- NEW GENERIC FILTER STORAGE
  sortConfig: SortConfig<T>;
}

// 2. ACTIONS
type Action<T> =
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_ITEMS_PER_PAGE'; payload: number }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FILTER'; payload: { key: keyof T; value: any } } // <--- NEW GENERIC ACTION
  | { type: 'CLEAR_FILTER'; payload: keyof T } // <--- NEW CLEAR ACTION
  | { type: 'SORT'; payload: keyof T };

// 3. REDUCER
// We need to type the reducer function slightly differently to handle the generic T
function tableReducer<T>(
  state: TableState<T>, action: Action<T>
): TableState<T> {
  switch ( action.type ) {
      case 'SET_PAGE':
        return {
          ...state,
          currentPage: action.payload
        };

      case 'SET_ITEMS_PER_PAGE':
        return {
          ...state,
          itemsPerPage: action.payload,
          currentPage : 1
        };

      case 'SET_SEARCH':
        return {
          ...state,
          searchQuery: action.payload,
          currentPage: 1
        };

        // Update a specific filter key
      case 'SET_FILTER':
        return {
          ...state,
          filters: {
            ...state.filters,
            [ action.payload.key ]: action.payload.value
          },
          currentPage: 1 // Always reset page when filtering
        };

        // Remove a specific filter key
      case 'CLEAR_FILTER': {
        const newFilters = {
          ...state.filters
        };

        delete newFilters[ action.payload ];

        return {
          ...state,
          filters    : newFilters,
          currentPage: 1
        };
      }

      case 'SORT': {
        const isSameKey = state.sortConfig.key === action.payload;

        const isAsc = state.sortConfig.direction === 'asc';

        let nextDirection: SortDirection = 'asc';

        // Default to DESC for dates if it's the first time clicking
        if ( !isSameKey && action.payload === 'fecha' ) {
          nextDirection = 'desc';
        } else if ( isSameKey ) {
          nextDirection = isAsc
            ? 'desc'
            : 'asc';
        }

        return {
          ...state,
          sortConfig: {
            key      : action.payload,
            direction: nextDirection
          },
        };
      }

      default:
        return state;
  }
}

// --- PROVIDER ---
interface TableContextType<T> {
  visibleData: T[];
  totalItems: number;
  totalPages: number;
  isSearching: boolean;
  state: TableState<T>;
  dispatch: Dispatch<Action<T>>;
}

const TableContext = createContext<TableContextType<any> | null>(
  null
);

interface TableProviderProps<T> {
  children: ReactNode;
  initialData?: T[];
  defaultSortKey?: keyof T;
}

export const TableProvider = <T extends Record<string, any>>( {
  children,
  initialData = [],
  defaultSortKey
}: TableProviderProps<T> ) => {

  const [
    state,
    dispatch
  ] = useReducer<React.Reducer<TableState<T>, Action<T>>>(
    tableReducer, {
      currentPage : 1,
      itemsPerPage: 5,
      searchQuery : '',
      filters     : {}, // Initialize empty
      sortConfig  : {
        key      : ( defaultSortKey || 'fecha' ) as keyof T,
        direction: 'desc'
      }
    }
  );

  const debouncedSearchQuery = useDebounce(
    state.searchQuery, 300
  );

  // --- DERIVED STATE: FILTERING ---
  const filteredData = useMemo(
    () => {
      let result = initialData;

      // 1. Generic Key-Value Filtering
      // We iterate over every active filter in the state
      const activeFilters = Object.entries(
        state.filters
      ) as [keyof T, any][];

      if ( activeFilters.length > 0 ) {
        result = result.filter(
          (
            item
          ) => {

            // The item must match ALL active filters
            return activeFilters.every(
              (
                [
                  key,
                  filterValue
                ]
              ) => {
                const itemValue = item[ key ];

                // --- NEW LOGIC START ---

                // A. Multi-Select Support (Array)
                // If filterValue is ['terminados', 'bancolombia'],
                // we check if itemValue matches ANY of them.
                if ( Array.isArray(
                  filterValue
                ) ) {
                  // If the array is empty, we usually ignore the filter or show nothing.
                  // Here: Empty array = match nothing (strict).
                  if ( filterValue.length === 0 ) {
                    return true;
                  }

                  return filterValue.includes(
                    itemValue
                  );
                }

                // B. Standard Single Value
                return itemValue === filterValue;

                // --- NEW LOGIC END ---
                // You can add custom logic here (e.g., if filterValue is an array, check inclusion)

              }
            );
          }
        );
      }

      // 2. Text Search
      if ( debouncedSearchQuery ) {
        const lowerQuery = debouncedSearchQuery.toLowerCase();

        result = result.filter(
          (
            item
          ) => {
            return Object.values(
              item
            )
              .some(
                (
                  val
                ) => {
                  return String(
                    val
                  )
                    .toLowerCase()
                    .includes(
                      lowerQuery
                    );
                }
              );
          }
        );
      }

      return result;
    }, [
      initialData,
      state.filters,
      debouncedSearchQuery
    ]
  );

  // --- DERIVED STATE: SORTING (Same as before) ---
  const sortedData = useMemo(
    () => {
      if ( !state.sortConfig.key ) {
        return filteredData;
      }

      return [
        ...filteredData
      ].sort(
        (
          a, b
        ) => {
          const {
            key, direction
          } = state.sortConfig;

          const aValue = a[ key! ];

          const bValue = b[ key! ];

          if ( key === 'fecha' ) {
            const dateA = new Date(
              aValue as string
            )
              .getTime();

            const dateB = new Date(
              bValue as string
            )
              .getTime();

            return direction === 'asc'
              ? dateA - dateB
              : dateB - dateA;
          }

          // Handle boolean sorting (true comes before false or vice versa)
          if ( typeof aValue === 'boolean' ) {
            return direction === 'asc'
              ? ( aValue === bValue
                  ? 0
                  : aValue
                    ? -1
                    : 1 )
              : ( aValue === bValue
                  ? 0
                  : aValue
                    ? 1
                    : -1 );
          }

          if ( aValue < bValue ) {
            return direction === 'asc'
              ? -1
              : 1;
          }

          if ( aValue > bValue ) {
            return direction === 'asc'
              ? 1
              : -1;
          }

          return 0;
        }
      );
    }, [
      filteredData,
      state.sortConfig
    ]
  );

  // --- DERIVED STATE: PAGINATION ---
  const visibleData = useMemo(
    () => {
      const startIndex = ( state.currentPage - 1 ) * state.itemsPerPage;

      return sortedData.slice(
        startIndex, startIndex + state.itemsPerPage
      );
    }, [
      sortedData,
      state.currentPage,
      state.itemsPerPage
    ]
  );

  const totalPages = Math.ceil(
    filteredData.length / state.itemsPerPage
  );

  return (
    <TableContext.Provider value={{
      visibleData,
      totalItems : filteredData.length,
      totalPages,
      isSearching: state.searchQuery !== debouncedSearchQuery,
      state,
      dispatch,
    }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTable = <T extends Record<string, any>>(): TableContextType<T> => {
  const context = useContext(
    TableContext
  );

  if ( !context ) {
    throw new Error(
      'useTable must be used within a TableProvider'
    );
  }

  return context;
};