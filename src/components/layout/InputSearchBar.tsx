'use client';
import searchbar from 'components/layout/search/searchbar.module.css';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { useState } from 'react';
import { useCarpetaSortDispatch } from '#@/app/Context/carpetas-sort-context';
import { resetCarpetas } from '#@/app/Carpetas/actions';

export const InputSearchBar = (
  {
    carpetas
  }: { carpetas: IntCarpeta[] }
) => {

          const [ newQueryState, setNewQueryState ] = useState(
            ''
          );

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
                                onClick={(
                                  e
                                ) => {
                                          console.log(
                                            e.target
                                          );
                                          return setNewQueryState(
                                            e.currentTarget.value
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
                onKeyDown={(
                  e
                ) => {
                          if ( e.key === 'Enter' ) {
                            dispatchCarpetas(
                              {
                                type   : 'search',
                                payload: e.currentTarget.value,
                              }
                            );
                          }

                          if ( e.key === 'Backspace' && e.currentTarget.value === '' ) {
                            dispatchCarpetas(
                              {
                                type   : 'reset',
                                payload: carpetas,
                              }
                            );
                          }
                }}
                className={searchbar.input}
                onChange={(
                  e
                ) => {
                          return setNewQueryState(
                            e.target.value
                          );
                }}
              />

              <button type='button' onClick={ async () => {


                        const payloadedCarpetas = await resetCarpetas();
                        setNewQueryState(
                          ' '
                        );
                        return dispatchCarpetas(
                          {
                            type   : 'reset',
                            payload: payloadedCarpetas
                          }
                        );

              } }>
                <span className='material-symbols-outlined'>close</span>
              </button>
            </>
          );
};
