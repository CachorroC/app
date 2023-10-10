'use client';
import searchbar from 'components/layout/search/searchbar.module.css';
import { useSearch } from '#@/app/context/search-context';

export default function InputSearchBar() {
  const {
    search, setSearch 
  } = useSearch();

  return (
    <form>
      <input
        type="search"
        className={searchbar.input}
        value={search}
        name="searchBar"
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
    </form>
  );
}
