'use client';

import {  useState } from 'react';
import { useNuevaFacturaContext } from './nueva-factura-context-provider';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { Factura } from '#@/lib/types/contabilidad';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { useFacturaSort } from './facturas-context-provider';

export function ButtonScan () {
      const {
        valorState, setValorState
      } = useNuevaFacturaContext();

      const [ text, setText ] = useState(
        ''
      );

      const [ isScannerOpen, setIsScannerOpen ] = useState(
        false
      );
      return (
        <>
          <button onClick={ () => {
                    return setIsScannerOpen(
                      (
                        e
                      ) => {
                                return !e;
                      }
                    );
          }}>
            <span className="material-symbols-outlined">
qr_code_scanner
            </span>
          </button>
          <div style={{
            width : '250px',
            height: '250px'
          } }>
            { isScannerOpen && (
              <QrScanner
                onDecode={(
                  result
                ) => {

                          const newText = `{${ result.replace(
                            /^(['"])?([a-z0-9A-Z_]+)(['"])?:(['"])?([a-z0-9A-Z_:\-./?=]+)(['"])?/gm, '"$2":"$5"'
                          )
                                .replaceAll(
                                  '\n', ','
                                ) }}`;
                          setText(
                            newText
                          );
                          console.log(
                            JSON.parse(
                              text
                            )
                          );

                          const facturaMap = new Map();

                          const rawKeyValues = result.split(
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


                          const newState =   Object.fromEntries(
                            facturaMap
                          );

                          const newFactura = new Factura(
                            newState, 'sin razon social',
                            'sinEspecificar', 1
                          );
                          return setValorState(
                            {
                              ...valorState,
                              ...newFactura
                            }
                          );
                }}
                onError={(
                  error
                ) => {
                          return console.log(
                            error?.message
                          );
                }}
              />
            )}
          </div>

        </>
      );
}


export function CopyButtonContabilidad () {
      const facturas = useFacturaSort();
      return (
        <CopyButton copyTxt={ JSON.stringify(
          facturas
        ) } name={ 'facturas' } />
      );
}