'use client';
import searchbar from 'components/layout/search/searchbar.module.css';
import { useSearch } from '#@/app/context/search-context';
import { useCarpetaSort } from '../../../app/context/carpetas-sort-context';

export default function InputSearchBar() {
  const {
    search, setSearch
  } = useSearch();

  const carpetasReduced = useCarpetaSort();

  return (
    <>
      <datalist id="demandados-list">
        {carpetasReduced.map(
          (
            carpeta
          ) => {
            return (
              <option
                value={carpeta.nombre}
                key={carpeta._id}
              />
            );
          }
        )}
      </datalist>
      <input
        type={'textarea'}
        list="demandados-list"
        className={searchbar.input}
        value={search}
        name={'buscar'}
        placeholder={'Buscar'}
        autoComplete={'off'}
        onChange={
          (
            input
          ) => {
            return setSearch(
              input.target.value
            );
          }
        }
      />
    </>
  );
}
