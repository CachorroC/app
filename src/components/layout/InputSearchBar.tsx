'use client';
import searchbar from 'components/layout/search/searchbar.module.css';
import { useSearch } from '#@/app/context/search-context';
import { useCarpetaSort, useCarpetaSortDispatch } from '#@/app/context/carpetas-sort-context';

export const InputSearchBar = () => {
          const {
            search, setSearch
          } = useSearch();

          const dispatchCarpetas = useCarpetaSortDispatch();

          async function formAction(
            formData: FormData
          ) {
                const searchQuery = formData.get(
                  'searchQuery'
                );

                if ( !searchQuery ) {
                  return dispatchCarpetas(
                    {
                      type : 'search',
                      query: ''
                    }
                  );
                }

                return dispatchCarpetas(
                  {
                    type : 'search',
                    query: searchQuery.toString()
                  }
                );

          }

          const carpetasReduced = useCarpetaSort();

          return (
            <form
              action={formAction}
              className={searchbar.inputContainer}
            >
              <pre>{JSON.stringify(
                search, null, 2
              )}</pre>
              <datalist id="demandados-list">
                {carpetasReduced.map(
                  (
                    carpeta
                  ) => {
                            return (
                              <option
                                value={carpeta.nombre}
                                key={carpeta.numero}
                                onChange={(
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
              <button type="submit">
                <span>Buscar</span>
                <span className="material-symbols-outlined">search</span>
              </button>
            </form>
          );
};
