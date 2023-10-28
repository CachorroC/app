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
    <div className={searchbar.inputContainer}>
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
      <label htmlFor={'buscar'}>
        <span className='material-symbols-outlined'>search</span>
      </label>
      <input
        type={'textarea'}
        list="demandados-list"
        className={searchbar.input}
        value={ search }
        id={'buscar'}
        name={'buscar'}
        placeholder={ 'Buscar' }
        onKeyDown={ (
          e
        ) => {
          console.log(
            e.key
          );

          if ( e.key === 'Enter' ) {

            console.log(
              e.key
            );
          }
        }}
        onChange={
          (
            input
          ) => {
            input.preventDefault();
            return setSearch(
              input.target.value
            );
          }
        }
      />

    </div>
  );
}
