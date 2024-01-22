'use client';

import { InputDateHelper } from '#@/lib/project/date-helper';
import {  intFactura } from '#@/lib/types/contabilidad';
import { ChangeEvent } from 'react';
import { addFactura, addFacturaGenerator, addToContabilidad } from './actions';
import formStyles from '#@/components/Form/form.module.css';
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

            const adder = await addFactura(
              valorState
            );

            if ( adder ) {
              alert(
                'se ingresó la informacion a la base de datos in prisma'
              );
            } else {
              alert(
                'error, no se pudo ingresar la forma a la base de dato in prismas'
              );
            }

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
              valorTotal: '0.00',
              valorBase : '0.00',
              hasIva    : false,
              hasOtroImp: false,
              ciudad    : '',
              dv        : 0,
              fecha     : new Date(
                '1997-01-03'
              ),
              id            : '',
              nit           : 0,
              razonSocial   : '',
              valorIva      : '0.00',
              valorOtroImp  : '0.00',
              concepto      : '',
              direccion     : '',
              hasIcui       : false,
              hasImpoConsumo: false
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
          className={formStyles.container}
        >
          <fieldset className={formStyles.segmentColumn}>
            <legend style={ josefina.style } className={ typography.headlineMedium }>Establecimiento</legend>
            <div className={ formStyles.segmentRowWrap }>
              <div className={ formStyles.segmentColumn }>
                <div className={formStyles.segmentRow}>
                  <label
                    className={formStyles.label}
                    htmlFor={'id'}
                  >
            Numero de factura
                  </label>
                  <input
                    name="id"
                    type="text"
                    className={formStyles.textArea}
                    value={valorState.id}
                    onChange={handleChange}
                  />
                </div>
                <div className={formStyles.segmentRow}>
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
                <div className={formStyles.segmentRow}>
                  <label
                    className={formStyles.label}
                    htmlFor={'nombreComercial'}
                  >
            Razon Social
                  </label>
                  <input
                    name="nombreComercial"
                    type="text"
                    className={formStyles.textArea}
                    value={valorState.nombreComercial}
                    onChange={(
                      e
                    ) => {
                              return setValorState(
                                {
                                  ...valorState,
                                  nombreComercial: e.target.value,
                                }
                              );
                    }}
                  />
                </div>
                <div className={formStyles.segmentRow}>
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
                <div className={formStyles.segmentRow}>
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
              </div>
              <div className={ formStyles.segmentColumn }>
                <div className={formStyles.segmentRow}>
                  <label className={formStyles.label} htmlFor={'direccion'}>direccion</label>
                  <input className={formStyles.textArea}
                    name="direccion"
                    type="text"
                    value={valorState.direccion}
                    onChange={handleChange}
                  />
                </div>
                <div className={formStyles.segmentRow}>
                  <label className={formStyles.label} htmlFor={'ciudad'}>ciudad</label>
                  <input className={formStyles.textArea}
                    name="ciudad"
                    type="text"
                    value={valorState.ciudad}
                    onChange={handleChange}
                  />
                </div>
                <div className={formStyles.segmentRow}>
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
                <div className={formStyles.segmentRow}>
                  <label className={formStyles.label} htmlFor={'concepto'}>concepto</label>
                  <div className={ formStyles.segmentColumn}>
                    <select className={formStyles.selectArea}
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
                                      className={valorState.concepto === concepto
                                        ? formStyles.buttonActive
                                        : formStyles.buttonPassive}
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
                      className={formStyles.textArea}
                      name="concepto"
                      type="text"
                      placeholder={'otro'}
                      value={valorState.concepto}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>



          </fieldset>
          <fieldset className={formStyles.segmentColumn}>
            <legend className={typography.headlineMedium }>Transacciones con divisa nacional</legend>

            <NumericValueInput inputName={ 'valorTotal' } inputLabel={ 'Valor Total' } />
            <NumericValueInput inputName={ 'valorOtroImp' } inputLabel={ 'otros impuestos' }/>
            <NumericValueInput inputName={ 'valorIva' } inputLabel={ 'IVA' } />
            <NumericValueInput inputName={ 'valorBase' } inputLabel={ 'Valor Base' } />
          </fieldset>
          <fieldset className={formStyles.segmentColumn}>
            <legend className={typography.headlineMedium }>tiene</legend>
            <div className={ formStyles.segmentRow }>
              <label htmlFor={'hasOtroImp'} className={formStyles.label}>otro impuesto</label>
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
            <div className={ formStyles.segmentRow }>
              <label htmlFor={'hasIva'} className={formStyles.label}>iva</label>
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
            <div className={ formStyles.segmentRow }>
              <label htmlFor={'hasIcui'} className={formStyles.label}>Icui</label>
              <label className={formStyles.switchBox}>
                <input
                  className={formStyles.inputElement}
                  checked={valorState.hasIcui}
                  type="checkbox"
                  name='hasIcui'
                  onChange={(
                    e
                  ) => {
                            return setValorState(
                              {
                                ...valorState,
                                hasIcui: e.target.checked
                              }
                            );
                  }}
                />
                <span className={formStyles.slider}></span>
              </label>
            </div>  <div className={ formStyles.segmentRow }>
              <label htmlFor={'hasImpoConsumo'} className={formStyles.label}>ImpoConsumo</label>
              <label className={formStyles.switchBox}>
                <input
                  className={formStyles.inputElement}
                  checked={valorState.hasImpoConsumo}
                  type="checkbox"
                  name='hasImpoConsumo'
                  onChange={(
                    e
                  ) => {
                            return setValorState(
                              {
                                ...valorState,
                                hasImpoConsumo: Boolean(
                                  e.target.checked
                                )
                              }
                            );
                  }}
                />
                <span className={formStyles.slider}></span>
              </label>
            </div>
          </fieldset>
          <button type='button' className={formStyles.button} onClick={ createFacturaGenerator }>
            <span className={`material-symbols-outlined ${ formStyles.icon }`}>person_add</span>
            <span className={formStyles.text}>Crear el generador de Factura</span>
          </button>
          <ParseTextarea />
          <button
            type="submit"
            className={formStyles.button}
          >
            <span className={ `material-symbols-outlined ${ formStyles.icon }` }>send</span>
            <span className={formStyles.text}>Enviar</span>
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
      return (   <div className={formStyles.segmentRow}>
        <label htmlFor={inputName} className={formStyles.label}>{inputLabel}</label>
        <input
          name={ inputName }
          className={formStyles.textArea}
          type="number"
          value={             String(
            valorState[ inputName ]
          )

          }
          onChange={(
            e
          ) => {
                    return setValorState(
                      {
                        ...valorState,
                        [ e.target.name ]: String(
                          e.target.value
                        ),
                      }
                    );
          }}
        />
      </div> );
}