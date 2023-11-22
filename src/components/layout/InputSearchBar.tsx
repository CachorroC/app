'use client';
import searchbar from 'components/layout/search/searchbar.module.css';
import { useSearch } from '#@/app/context/search-context';
import { useCarpetaSort } from '#@/app/context/carpetas-sort-context';

export const InputSearchBar= () => {
          const {
            search, setSearch
          } = useSearch();

          function searchQuery(
            formData: FormData
          ) {
                const query = formData.get(
                  'buscar'
                );
                alert(
                  `You searched for '${ query }'`
                );
          }

          const carpetasReduced = useCarpetaSort();

          return (
            <form
              action={searchQuery}
              className={searchbar.inputContainer}
            >
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
              <label>
                <input
                  type={'textarea'}
                  list="demandados-list"
                  className={searchbar.input}
                  value={search}
                  name={'buscar'}
                  placeholder={'Buscar'}
                  onKeyDown={(
                    e
                  ) => {
                            console.log(
                              `pressed key ${ e.key }`
                            );

                            if ( e.key === 'Enter' ) {
                              console.log(
                                `the pressed key was Enter ${ e.key }`
                              );
                            }
                  }}
                  onChange={(
                    input
                  ) => {
                            input.preventDefault();
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
