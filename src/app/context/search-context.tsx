'use client';

import React, { createContext,
  Dispatch,
  SetStateAction,

  useState,
  useContext, } from 'react';

const SearchContext = createContext<{
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
} | null>(
  null
);

export function SearchProvider(
  {
    children
  }: { children: React.ReactNode }
) {
  const [
            search,
            setSearch
  ] = useState(
    'Buscar'
  );

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(
    SearchContext
  );

  if ( context === null ) {
    throw new Error(
      'useSearch must be used inside a SearchProvider'
    );
  }

  return context;
}
