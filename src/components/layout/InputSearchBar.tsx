'use client';
import searchbar from 'components/layout/search/searchbar.module.css';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { useState } from 'react';
import { useCarpetaSortDispatch } from '#@/app/Context/carpetas-sort-context';
import { useRouter } from 'next/navigation';

export const InputSearchBar = (
  {
    carpetas
  }: { carpetas: IntCarpeta[] }
) => {

          const [ newQueryState, setNewQueryState ] = useState(
            ''
          );

          const router = useRouter();

          const dispatchCarpetas = useCarpetaSortDispatch();
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
                                onClick={() => {
                                          return router.push(
                                            `/Carpeta/${ carpeta.numero }`
                                          );
                                }}
                              />
                            );
                  }
                )}
              </datalist>
              <input
                type={'textarea'}
                list="demandados-list"
                name={'query'}
                placeholder={'Buscar'}
                value={newQueryState}
                className={searchbar.input}
                onChange={(
                  e
                ) => {
                          dispatchCarpetas(
                            {
                              type   : 'search',
                              payload: e.target.value,
                            }
                          );
                          return setNewQueryState(
                            e.target.value
                          );
                }}
              />

              <button type='button' onClick={ () => {
                        setNewQueryState(
                          ''
                        );
                        return dispatchCarpetas(
                          {
                            type: 'reset',
                          }
                        );

              } }>
                <span className='material-symbols-outlined'>close</span>
              </button>
            </>
          );
};
