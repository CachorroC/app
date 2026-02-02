/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client" signals to Next.js that this component runs in the browser.
// This is required because we are using React hooks (useState, useReducer, useEffect),
// which require a DOM and browser runtime environment.
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
  // "keyof T" ensures type safety. We can't sort by a property that doesn't exist on the data object.
  key      : keyof T | null;
  direction: SortDirection;
}

// 1. STATE SHAPE
// We replace 'categoryFilter' with a generic 'filters' dictionary
// APPROACH: Generics (<T>)
// Why? This allows this single Context to power a table of Users, Products, or Transactions without code changes.
interface TableState<T> {
  currentPage : number;
  itemsPerPage: number;
  searchQuery : string;
  // Partial<Record<...>> creates a flexible dictionary object where keys match the data properties.
  // This allows us to store multiple active filters (e.g., { status: 'active', role: 'admin' }).
  filters     : Partial<Record<keyof T, any>>; // <--- NEW GENERIC FILTER STORAGE
  sortConfig  : SortConfig<T>;
}

// 2. ACTIONS
// APPROACH: Discriminated Unions
// Why? This is the standard Redux/useReducer pattern. By defining a specific "type" string
// for every action, TypeScript can infer exactly what "payload" is allowed for that specific action.
type Action<T> =
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_ITEMS_PER_PAGE'; payload: number }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FILTER'; payload: { key: keyof T; value: any } } // <--- NEW GENERIC ACTION
  | { type: 'CLEAR_FILTER'; payload: keyof T } // <--- NEW CLEAR ACTION
  | { type: 'SORT'; payload: keyof T };

// 3. REDUCER
// APPROACH: useReducer vs useState
// Why? This state is "complex." Changing one piece of state often affects another.
// Example: If you change the Search Query (SET_SEARCH), you MUST also reset the Current Page to 1.
// Putting this logic in a reducer guarantees that these dependent state updates happen atomically and consistently.
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
          // UX Decision: When changing page size, we reset to page 1 to prevent being "out of bounds"
          // (e.g., being on page 10 when the new size only creates 5 pages).
          currentPage : 1
        };

      case 'SET_SEARCH':
        return {
          ...state,
          searchQuery: action.payload,
          // UX Decision: A new search changes the dataset size, so we must reset to the start.
          currentPage: 1
        };

        // Update a specific filter key
      case 'SET_FILTER':
        return {
          ...state,
          // Immutability: We create a new filters object, spreading the old ones, and overwriting the target key.
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

        // JavaScript's `delete` operator removes the key from the object entirely.
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

        // Custom Logic: Dates usually feel more natural sorted Descending (newest first) by default.
        if ( !isSameKey && action.payload === 'fecha' ) {
          nextDirection = 'desc';
        } else if ( isSameKey ) {
          // Toggle logic: If clicking the same header, flip the direction.
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
  // We expose "Derived State" (visibleData, totalItems) rather than just raw state.
  // This saves the consuming components from having to calculate logic themselves.
  visibleData: T[];
  totalItems : number;
  totalPages : number;
  isSearching: boolean;
  state      : TableState<T>;
  dispatch   : Dispatch<Action<T>>;
}

const TableContext = createContext<TableContextType<any> | null>( null );

interface TableProviderProps<T> {
  children       : ReactNode;
  initialData?   : T[];
  defaultSortKey?: keyof T;
}

// Generics in Components: <T extends Record...> allows the Provider to enforce that
// 'initialData' is an array of objects.
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

  // APPROACH: Debouncing
  // Why? Filtering a large list is computationally expensive.
  // We don't want to run the filter logic on every single keystroke.
  // This delays the update until the user stops typing for 300ms.
  const debouncedSearchQuery = useDebounce(
    state.searchQuery, 300
  );

  // --- DERIVED STATE: FILTERING ---
  // APPROACH: useMemo for Performance
  // Why? This is the most expensive operation in the table (looping over all data).
  // useMemo ensures this code ONLY runs if `initialData`, `filters`, or `searchQuery` changes.
  // It will NOT run if unrelated state changes (like someone clicking a UI button elsewhere).
  const filteredData = useMemo(
    () => {
      let result = initialData;

      // 1. Generic Key-Value Filtering
      // We iterate over every active filter in the state
      const activeFilters = Object.entries( state.filters ) as [keyof T, any][];

      if ( activeFilters.length > 0 ) {
        result = result.filter( ( item ) => {

          // The item must match ALL active filters (AND logic)
          return activeFilters.every( ( [
            key,
            filterValue
          ] ) => {
            const itemValue = item[ key ];

            // --- NEW LOGIC START ---

            // A. Multi-Select Support (Array)
            // If filterValue is ['terminados', 'bancolombia'],
            // we check if itemValue matches ANY of them (OR logic within the specific field).
            if ( Array.isArray( filterValue ) ) {
              // If the array is empty, we usually ignore the filter or show nothing.
              // Here: Empty array = match nothing (strict).
              if ( filterValue.length === 0 ) {
                return true;
              }

              return filterValue.includes( itemValue );
            }

            // B. Standard Single Value
            // Exact match check.
            return itemValue === filterValue;

            // --- NEW LOGIC END ---
            // You can add custom logic here (e.g., if filterValue is an array, check inclusion)

          } );
        } );
      }

      // 2. Text Search
      if ( debouncedSearchQuery ) {
        const lowerQuery = debouncedSearchQuery.toLowerCase();

        // We filter the RESULT of step 1.
        result = result.filter( ( item ) => {
          // Object.values checks every column in the row for the search string.
          return Object.values( item )
            .some( ( val ) => {
              return String( val )
                .toLowerCase()
                .includes( lowerQuery );
            } );
        } );
      }

      return result;
    }, [
      initialData,
      state.filters,
      debouncedSearchQuery
    ]
  );

  // --- DERIVED STATE: SORTING (Same as before) ---
  // APPROACH: Chained Derived State
  // Why? We sort `filteredData` (the result of the previous useMemo).
  // By separating this, if the user only changes the sort order, we don't have to re-run the expensive Search/Filter logic above.
  const sortedData = useMemo(
    () => {
      if ( !state.sortConfig.key ) {
        return filteredData;
      }

      // SAFETY: We use [...filteredData] to create a shallow copy.
      // Array.prototype.sort() mutates the array in place. If we sorted `filteredData` directly,
      // we would violate React's immutability rules.
      return [
        ...filteredData
      ].sort( (
        a, b
      ) => {
        const {
          key, direction
        } = state.sortConfig;

        const aValue = a[ key! ];

        const bValue = b[ key! ];

        // Specific logic for dates to ensure numerical sorting rather than string sorting
        if ( key === 'fecha' ) {
          const dateA = new Date( aValue as string )
            .getTime();

          const dateB = new Date( bValue as string )
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

        // Standard string/number sorting
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
      } );
    }, [
      filteredData,
      state.sortConfig
    ]
  );

  // --- DERIVED STATE: PAGINATION ---
  // The final step: slicing the sorted array to show only the current page's items.
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

  const totalPages = Math.ceil( filteredData.length / state.itemsPerPage );

  return (
    <TableContext.Provider value={{
      visibleData,
      totalItems : filteredData.length,
      totalPages,
      // UI Helper: Allows the UI to show a spinner if the user is typing but the debounce hasn't triggered yet.
      isSearching: state.searchQuery !== debouncedSearchQuery,
      state,
      dispatch,
    }}
    >
      {children}
    </TableContext.Provider>
  );
};

// APPROACH: Custom Hook Pattern
// Why? This encapsulates the `useContext` check.
// If a developer tries to use this hook outside of <TableProvider>, they get a clear error message
// instead of a confusing "cannot read property of null" error.
export const useTable = <T extends Record<string, any>>(): TableContextType<T> => {
  const context = useContext( TableContext );

  if ( !context ) {
    throw new Error( 'useTable must be used within a TableProvider' );
  }

  return context;
};