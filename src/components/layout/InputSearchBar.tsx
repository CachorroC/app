'use client';
import searchbar from 'components/layout/search/searchbar.module.css';
import { useSearch } from '#@/app/Context/search-context';
import { IntCarpeta } from '#@/lib/types/carpetas';

export const InputSearchBar = (
  {
    carpetas
  }: {carpetas: IntCarpeta[]}
) => {
          const {
            search, setSearch
          } = useSearch();
          return (
            <>
              <datalist id="demandados-list">
                {carpetas.map(
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
                Buscar
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
              <pre>{search}</pre>
            </>
          );
};
