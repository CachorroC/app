'use client';
import { useSearch } from '#@/app/context/main-context';
import { usePathname } from 'next/navigation';
import searchbar from 'components/layout/search/searchbar.module.css';
import { useEffect } from 'react';

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
      type="text"
      className={searchbar.input}
      name="search"
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
