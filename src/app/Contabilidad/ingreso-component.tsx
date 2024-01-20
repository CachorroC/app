'use client';

import { InputDateHelper } from '#@/lib/project/date-helper';
import {  intFactura } from '#@/lib/types/contabilidad';
import layout from '#@/styles/layout.module.css';
import { ChangeEvent } from 'react';
import { addFacturaGenerator, addToContabilidad } from './actions';
import formStyles from '#@/components/form/form.module.css';
import { useNuevaFacturaContext } from './nueva-factura-context-provider';
import typography from '#@/styles/fonts/typography.module.css';
import { josefina } from '#@/styles/fonts';
import { ParseTextarea } from './parse-text';

export function IngresoComponent() {
      const conceptos = [
        'Telefonia'
        , 'CyB'
        , 'Servicios Publicos'
        , 'Restaurante o Bar'
        , 'Parqueadero o Peaje'
        , 'Dotacion'
        , 'Arreglos'
        , 'ProcesoBancolombia'
        , 'ProcesoReintegra'
        , 'sinEspecificar'
      ];

      const {
        valorState, setValorState
      } = useNuevaFacturaContext();


      async function createIngresoInDatabase () {


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
              valorTotal  : '0.00',
              valorBase   : '0.00',
              hasIva      : false,
              hasOtroImp  : false,
              ciudad      : '',
              dv          : 0,
              fecha       : new Date(),
              id          : '',
              nit         : 0,
              razonSocial : '',
              valorIva    : '',
              valorOtroImp: '',
              concepto    : '',
              direccion   : ''
            };
            return setValorState(
              newFactura
            );
      }

      async function createFacturaGenerator () {
            const creator = await addFacturaGenerator(
              valorState
            );

            if ( creator.success ) {
              alert(
                creator.data
              );
            } else {
              console.log(
                `Error Factura Generator => ${ creator.data }`
              );
              alert(
                `Error Factura Generator => ${ creator.data }`
              );
            }
      }

      function handleChange(
        e: ChangeEvent<HTMLInputElement| HTMLSelectElement>
      ) {
            return setValorState(
              {
                ...valorState,
                [ e.target.name ]: e.target.value
              }
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
              <label className={formStyles.label} htmlFor={'direccion'}>direccion</label>
              <input className={formStyles.textArea}
                name="direccion"
                type="text"
                value={valorState.direccion}
                onChange={handleChange}
              />
            </div>
            <div className={layout.segmentRow}>
              <label className={formStyles.label} htmlFor={'ciudad'}>ciudad</label>
              <input className={formStyles.textArea}
                name="ciudad"
                type="text"
                value={valorState.ciudad}
                onChange={handleChange}
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
                onChange={handleChange}
              >
                {conceptos.map(
                  (
                    concepto
                  ) => {
                            return (
                              <option
                                key={concepto}
                                value={ concepto }
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
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend className={typography.headlineMedium }>Transacciones con divisa nacional</legend>

            <NumericValueInput inputName={ 'valorTotal' } inputLabel={ 'Valor Total' } />
            <NumericValueInput inputName={ 'valorOtroImp' } inputLabel={ 'otros impuestos' }/>
            <NumericValueInput inputName={ 'valorIva' } inputLabel={ 'IVA' } />
            <NumericValueInput inputName={ 'valorBase' } inputLabel={ 'Valor Base' } />

            <div className={layout.segmentRow}>
              <label className={formStyles.switchBox}>
                <input
                  className={formStyles.inputElement}
                  checked={ valorState.hasOtroImp }
                  name='hasOtroImp'
                  type="checkbox"
                  onChange={(
                    e
                  ) => {
                            return setValorState(
                              {
                                ...valorState,
                                hasOtroImp: e.target.checked
                              }
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
                  checked={valorState.hasIva}
                  type="checkbox"
                  name='hasIva'
                  onChange={(
                    e
                  ) => {
                            return setValorState(
                              {
                                ...valorState,
                                hasIva: e.target.checked
                              }
                            );
                  }}
                />
                <span className={formStyles.slider}></span>
              </label>
            </div>
          </fieldset>
          <button type='button' onClick={ createFacturaGenerator }>
            <span className='material-symbols-outlined'>person_add</span>
            <span>Crear el generador de Factura</span>
          </button>
          <ParseTextarea />
          <button
            type="submit"
            className={layout.buttonForward}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      );
}



export function NumericValueInput (
  {
    inputName, inputLabel
  }: { inputName: keyof intFactura;  inputLabel: string}
) {
      const {
        valorState, setValorState
      } = useNuevaFacturaContext();
      return (   <div className={layout.segmentRow}>
        <label htmlFor={inputName}>{inputLabel}</label>
        <input
          name={inputName}
          type="number"
          value={String(
            valorState[ inputName ]
          )}
          onChange={(
            e
          ) => {
                    return setValorState(
                      {
                        ...valorState,
                        [ e.target.name ]: Number(
                          e.target.value
                        ),
                      }
                    );
          }}
        />
      </div> );
}