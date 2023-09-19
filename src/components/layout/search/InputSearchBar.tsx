'use client';
import { usePathname } from 'next/navigation';
import searchbar from 'components/layout/search/searchbar.module.css';
import { useEffect } from 'react';
import { useSearch } from '#@/app/context/search-context';

export default function InputSearchBar() {
  const {
    search, setSearch
  } = useSearch();

  const pathname = usePathname();

  const isHome = pathname === '/'
    ? true
    : false;

  return (
    <input
      type="search"
      className={ searchbar.input }
      value={search}
      placeholder={isHome
        ? 'Buscar'
        : pathname}
      onChange={(
        input
      ) => {
        input.preventDefault();
        setSearch(
          input.target.value
        );
      }}
    />
  );
}
