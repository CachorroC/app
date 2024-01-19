'use client';

import { useState } from 'react';
import { useNuevaFacturaContext } from './nueva-factura-context-provider';
import { Factura } from '#@/lib/types/contabilidad';

export const ParseTextarea = () => {

          const [ text, setText ] = useState(
            ''
          );

          const {
            valorState, setValorState
          } = useNuevaFacturaContext();

          return (
            <>
              <fieldset>
                <legend>factura electronica</legend>

                <textarea name='facturaElectronica' placeholder='pegue en este espacio el texto que aparece con el codigo qr de la factura electronica' value={ text} onChange={ (
                  e
                ) => {
                          {
                            const facturaMap = new Map();

                            const rawKeyValues = e.target.value.split(
                              '\n'
                            );

                            for ( const rawKV of rawKeyValues ) {
                              const [ key, ...restValues ] = rawKV.split(
                                ':'
                              );
                              facturaMap.set(
                                key, restValues.join(
                                  ':'
                                )
                              );
                            }

                            setText(
                              e.target.value
                            );

                            const newState =   Object.fromEntries(
                              facturaMap
                            );

                            const newFactura = new Factura(
                              newState, 'sinRS',
                              'sinEspecificar', 1
                            );
                            return setValorState(
                              {
                                ...valorState,
                                ...newFactura
                              }
                            );
                          }


                } } />
              </fieldset>
            </> );
};
