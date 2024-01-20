'use client';

import { useNuevaFacturaContext } from './nueva-factura-context-provider';
import { Factura } from '#@/lib/types/contabilidad';

export const ParseTextarea = () => {


          const {
            valorState, setValorState
          } = useNuevaFacturaContext();

          return (
            <>
              <fieldset>
                <legend>factura electronica</legend>
                <textarea name='facturaElectronica' placeholder='pegue en este espacio el texto que aparece con el codigo qr de la factura electronica' value={ valorState.facturaElectronica } onChange={
                  (
                    e
                  ) => {
                            const {
                              value
                            } = e.target;


                            const facturaMap = new Map();

                            const rawKeyValues = value.split(
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




                            const newFactura = new Factura(
                              value, {
                                ...valorState
                              }
                            );



                            return setValorState(
                              newFactura
                            );
                  }
                }
                />
              </fieldset>
            </> );
};
