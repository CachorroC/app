'use client';
import searchbar from 'components/layout/search/searchbar.module.css';
import { useSearch } from '#@/app/context/search-context';

export default function InputSearchBar() {
  const {
    search, setSearch
  } = useSearch();

  return (

    <input
      type="text"
      className={searchbar.input}
      value={search}
      placeholder={'Buscar'}
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
