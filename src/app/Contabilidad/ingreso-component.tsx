'use client';

import { InputDateHelper } from '#@/lib/project/date-helper';
import { Factura, intFactura } from '#@/lib/types/contabilidad';
import layout from '#@/styles/layout.module.css';
import { useState } from 'react';
import { addToContabilidad } from './actions';
import formStyles from '#@/components/form/form.module.css';
import { useNuevaFacturaContext } from './nueva-factura-context-provider';
import typography from '#@/styles/fonts/typography.module.css';
import { josefina } from '#@/styles/fonts';

export function IngresoComponent() {
      const conceptos = [
        'Telefonia',
        'CyB',
        'Restaurante',
        'Dotacion',
        'Arreglos',
        'ProcesoBancolombia',
        'ProcesoReintegra',
        'sinEspecificar',
      ];

      const {
        valorState, setValorState
      } = useNuevaFacturaContext();

      const [ facturaElectronicaText, setFacturaElectronicaText ] = useState(
        ''
      );

      const [ hasIVA, setHasIVA ] = useState(
        false
      );

      const [ hasICUI, setHasICUI ] = useState(
        false
      );

      async function createIngresoInDatabase() {
            const sender = await addToContabilidad(
              valorState
            );

            if ( sender ) {
              alert(
                'se ingresó la informacion a la base de datos'
              );
            } else {
              alert(
                'error, no se pudo ingresar la forma a la base de datos'
              );
            }

            const newFactura: intFactura = {
              valorTotal        : 0,
              valorBase         : 0,
              hasIva            : false,
              hasOtroImp        : false,
              hasImpoConsumo    : 0,
              ciudad            : '',
              CUFE              : '',
              dv                : 0,
              fecha             : new Date(),
              id                : '',
              nit               : 0,
              QRCode            : '',
              razonSocial       : '',
              valorIva          : 0,
              valorOtroImp      : 0,
              concepto          : '',
              facturaElectronica: [],
            };
            return setValorState(
              newFactura
            );
      }

      return (
        <form
          action={createIngresoInDatabase}
          className={josefina.variable}
        >
          <fieldset >
            <legend style={josefina.style} className={typography.headlineMedium }>Establecimiento</legend>
            <div className={layout.segmentRow}>
              <label
                className={formStyles.label}
                htmlFor={'razonSocial'}
              >
            Razon Social
              </label>
              <input
                name="razonSocial"
                type="text"
                className={formStyles.textArea}
                value={valorState.razonSocial}
                onChange={(
                  e
                ) => {
                          return setValorState(
                            {
                              ...valorState,
                              razonSocial: e.target.value,
                            }
                          );
                }}
              />
            </div>
            <div className={layout.segmentRow}>
              <label className={formStyles.label} htmlFor={'fecha'}>fecha</label>
              <input className={formStyles.textArea}
                name={'fecha'}
                type={'date'}
                value={InputDateHelper(
                  valorState.fecha
                )}
                onChange={(
                  e
                ) => {
                          return setValorState(
                            {
                              ...valorState,
                              fecha: new Date(
                                e.target.value
                              ),
                            }
                          );
                }}
              />
            </div>
            <div className={layout.segmentRow}>
              <label className={formStyles.label} htmlFor={'nit'}>NIT</label>
              <input className={formStyles.textArea}
                name="nit"
                type="number"
                value={valorState.nit}
                onChange={(
                  e
                ) => {
                          return setValorState(
                            {
                              ...valorState,
                              nit: Number(
                                e.target.value
                              ),
                            }
                          );
                }}
              />
            </div>
            <div className={layout.segmentRow}>
              <label className={formStyles.label} htmlFor={'dv'}>Digito de verificacion</label>
              <input className={formStyles.textArea}
                name="dv"
                type="number"
                value={valorState.dv}
                onChange={(
                  e
                ) => {
                          return setValorState(
                            {
                              ...valorState,
                              dv: Number(
                                e.target.value
                              ),
                            }
                          );
                }}
              />
            </div>

            <div className={layout.segmentRow}>
              <label className={formStyles.label} htmlFor={'concepto'}>concepto</label>
              <select className={formStyles.textArea}
                name="concepto"
                value={valorState.concepto}
                onChange={(
                  e
                ) => {
                          return setValorState(
                            {
                              ...valorState,
                              concepto: e.target.value,
                            }
                          );
                }}
              >
                {conceptos.map(
                  (
                    concepto
                  ) => {
                            return (
                              <option
                                key={concepto}
                                value={concepto}
                              >
                                {concepto}
                              </option>
                            );
                  }
                )}
              </select>
              <input
                name="concepto"
                type="text"
                placeholder={'otro'}
                value={valorState.concepto}
                onChange={(
                  e
                ) => {
                          return setValorState(
                            {
                              ...valorState,
                              concepto: e.target.value,
                            }
                          );
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend className={typography.headlineMedium }>Transacciones con divisa nacional</legend>
            <div className={layout.segmentRow}>
              <label htmlFor={'valorTotal'}>Total</label>
              <input
                name="valorTotal"
                type="number"
                value={valorState.valorTotal === 0
                  ? ''
                  : valorState.valorTotal}
                onChange={(
                  e
                ) => {
                          return setValorState(
                            {
                              ...valorState,
                              valorTotal: Number(
                                e.target.value
                              ),
                            }
                          );
                }}
              />
            </div>
            <h2>Impuesto al Consumo</h2>
            <div className={layout.segmentRow}>
              <label>
                <input
                  type="radio"
                  name="impoConsumo"
                  value="8"
                  onClick={() => {
                            setValorState(
                              {
                                ...valorState,
                                hasImpoConsumo: 8,
                              }
                            );
                  }}
                />
            No telefonia 8%
              </label>
              <label>
                <input
                  type="radio"
                  name="impoConsumo"
                  value="0"
                  onClick={() => {
                            setValorState(
                              {
                                ...valorState,
                                hasImpoConsumo: 0,
                              }
                            );
                  }}
                  defaultChecked={true}
                />
            No aplica impuesto al consumo
              </label>
              <label>
                <input
                  type="radio"
                  name="impoConsumo"
                  value="4"
                  onClick={() => {
                            setValorState(
                              {
                                ...valorState,
                                hasImpoConsumo: 4,
                              }
                            );
                  }}
                />
            Con Telefonia 4%
              </label>
            </div>
            <div className={layout.segmentRow}>
              <label className={formStyles.switchBox}>
                <input
                  className={formStyles.inputElement}
                  checked={hasICUI}
                  type="checkbox"
                  onChange={(
                    e
                  ) => {
                            return setHasICUI(
                              e.target.checked
                            );
                  }}
                />
                <span className={formStyles.slider}></span>
              </label>
            </div>
            <div className={layout.segmentRow}>
              <label className={formStyles.switchBox}>
                <input
                  className={formStyles.inputElement}
                  checked={hasIVA}
                  type="checkbox"
                  onChange={(
                    e
                  ) => {
                            return setHasIVA(
                              e.target.checked
                            );
                  }}
                />
                <span className={formStyles.slider}></span>
              </label>
            </div>
          </fieldset>

          <textarea
            name="facturaElectronica"
            placeholder="pegue en este espacio el texto que aparece con el codigo qr de la factura electronica"
            value={facturaElectronicaText}
            onChange={(
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

                      const newState = Object.fromEntries(
                        facturaMap
                      );

                      const newFactura = new Factura(
                        newState,
                        'sinRS',
                        'sinEspecificar',
                        1,
                      );
                      setFacturaElectronicaText(
                        e.target.value
                      );
                      return setValorState(
                        {
                          ...valorState,
                          ...newFactura,
                          facturaElectronica: value.split(
                            '\n'
                          ),
                        }
                      );
            }}
          />
          <button
            type="submit"
            className={layout.buttonForward}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      );
}
