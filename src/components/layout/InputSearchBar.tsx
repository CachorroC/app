'use client';
import searchbar from 'components/layout/search/searchbar.module.css';
import { useSearch } from '#@/app/Context/search-context';
import { useCarpetaSort } from '#@/app/Context/carpetas-sort-context';

export const InputSearchBar = () => {
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
                                key={carpeta.numero}
                                onClick={(
                                  e 
                                ) => {
                                          console.log(
                                            e.target 
                                          );
                                }}
                              />
                            );
                  } 
                )}
              </datalist>
              <label>
                <input
                  type={'textarea'}
                  list="demandados-list"
                  className={searchbar.input}
                  value={search}
                  name={'searchQuery'}
                  placeholder={'Buscar'}
                  onChange={(
                    input 
                  ) => {
                            return setSearch(
                              input.target.value 
                            );
                  }}
                />
              </label>
            </>
          );
};
