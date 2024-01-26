'use client';

import { ChangeEvent, useState } from 'react';
import { addFactura, addFacturaGenerator, addToContabilidad } from './actions';
import formStyles from '#@/components/Form/form.module.css';
import { useNuevaFacturaContext } from './nueva-factura-context-provider';
import typography from '#@/styles/fonts/typography.module.css';
import { josefina } from '#@/styles/fonts';
import { ParseTextarea } from './parse-text';
import Nit from './nit';
import { NumericValueInput } from './numeric-value';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { InputDateHelper } from '#@/lib/project/date-helper';

export function IngresoComponent(
  {
    carpetas
  }: {carpetas: IntCarpeta[]}
) {
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




      const [ perteneceProceso, setPerteneceProceso ] = useState(
        false
      );


      async function createIngresoInDatabase () {



            const sender = await addToContabilidad(
              valorState
            );

            const adder = await addFactura(
              valorState
            );

            if ( adder.success ) {
              alert(
                `se ingresó la informacion a la base de datos in prisma ${ adder.data }`
              );
            } else {
              alert(
                `error, no se pudo ingresar la forma a la base de dato in prismas ${ adder.data }`
              );
            }

            if ( sender.success ) {
              alert(
                `se ingresó la informacion a la base de datos ${ sender.data }`
              );
            } else {
              alert(
                `error, no se pudo ingresar la forma a la base de datos ${ sender.data }`
              );
            }

            if ( !adder.success || !sender.success ) {
              return setValorState(
                {
                  ...valorState
                }
              );
            }

            const newFactura = {
              valorTotal        : '0.00',
              valorBase         : '0.00',
              valorOtroImp      : '0.00',
              valorIva          : '0.00',
              hasIva            : false,
              hasOtroImp        : false,
              hasIcui           : false,
              hasImpoConsumo    : false,
              facturaElectronica: '',
              secondaryFactura  : {},
              carpetaNumero     : 0,
              nombreComercial   : '',
              ciudad            : '',
              dv                : 0,
              id                : '',
              nit               : 0,
              razonSocial       : '',
              concepto          : '',
              direccion         : '',
              fecha             : '',

            };
            return setValorState(
              {
                ...newFactura,
                fecha: new Date(
                  newFactura.fecha
                )
              }
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

      function handleStringChange(
        e: ChangeEvent<HTMLInputElement| HTMLSelectElement>
      ) {
            return setValorState(
              {
                ...valorState,
                [ e.target.name ]: String(
                  e.target.value
                )
              }
            );
      }

      function handleNumericChange (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) {

            return setValorState(
              {
                ...valorState,
                [ e.target.name ]: Number(
                  e.target.value
                )
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
                    onChange={handleStringChange}
                  />
                </div>
                <Nit />
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
                    onChange={handleStringChange}
                  />
                </div>
                <div className={formStyles.segmentRow}>
                  <label
                    className={formStyles.label}
                    htmlFor={'nombreComercial'}
                  >
        Nombre Comercial
                  </label>
                  <input
                    name="nombreComercial"
                    type="text"
                    className={formStyles.textArea}
                    value={valorState.nombreComercial}
                    onChange={handleStringChange}
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
                              const {
                                value
                              } = e.target;

                              const [
                                yearStringer,
                                monthStringer,
                                dayStringer
                              ]
                    =  value.split(
                      '-'
                    );
                              return setValorState(
                                {
                                  ...valorState,
                                  fecha: new Date(
                                    `${ yearStringer }-${ monthStringer }-${ dayStringer }`
                                  )
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
                    onChange={handleStringChange}
                  />
                </div>
                <div className={formStyles.segmentRow}>
                  <label className={formStyles.label} htmlFor={'ciudad'}>ciudad</label>
                  <input className={formStyles.textArea}
                    name="ciudad"
                    type="text"
                    value={valorState.ciudad}
                    onChange={handleStringChange}
                  />
                </div>
                <div className={formStyles.segmentRow}>
                  <label className={formStyles.label} htmlFor={'dv'}>Digito de verificacion</label>
                  <input className={formStyles.textArea}
                    name="dv"
                    type="number"
                    value={valorState.dv}
                    onChange={handleNumericChange}
                  />
                </div>
                <div className={formStyles.segmentRow}>
                  <label className={formStyles.label} htmlFor={'concepto'}>concepto</label>
                  <div className={ formStyles.segmentColumn}>
                    <select className={formStyles.selectArea}
                      name="concepto"
                      value={valorState.concepto}
                      onChange={ (
                        e
                      ) => {
                                const {
                                  value
                                } = e.target;

                                if ( value === 'ProcesoBancolombia' || value === 'ProcesoReintegra' ) {
                                  setPerteneceProceso(
                                    true
                                  );
                                }

                                return setValorState(
                                  {
                                    ...valorState,
                                    concepto: value
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
                      onChange={handleStringChange}
                    />
                  </div>
                </div>
              </div>
            </div>



          </fieldset>
          <fieldset className={formStyles.segmentColumn}>
            <legend className={typography.headlineMedium }>Transacciones con divisa nacional</legend>

            <NumericValueInput inputName={ 'valorTotal' } inputLabel={ 'Valor Total' }  />
            <NumericValueInput inputName={ 'valorOtroImp' } inputLabel={ 'otros impuestos' } />
            <NumericValueInput inputName={ 'valorIva' } inputLabel={ 'IVA' }  />
            <NumericValueInput inputName={ 'valorBase' } inputLabel={ 'Valor Base' }  />
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
              <label className={formStyles.label}>iva</label>
              <label className={formStyles.switchBox}>
                <input
                  className={formStyles.inputElement}
                  checked={valorState.hasIva}
                  type="checkbox"
                  name={'hasIva'}
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
              <label className={formStyles.label}>Icui</label>
              <label className={formStyles.switchBox}>
                <input
                  className={formStyles.inputElement}
                  checked={valorState.hasIcui}
                  type="checkbox"
                  name={'hasIcui'}
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
            </div>
            <div className={ formStyles.segmentRow }>
              <label className={formStyles.label}>ImpoConsumo</label>
              <label className={formStyles.switchBox}>
                <input
                  className={formStyles.inputElement}
                  checked={valorState.hasImpoConsumo}
                  type="checkbox"
                  name={'hasImpoConsumo'}
                  onChange={(
                    e
                  ) => {
                            return setValorState(
                              {
                                ...valorState,
                                hasImpoConsumo: e.target.checked

                              }
                            );
                  }}
                />
                <span className={formStyles.slider}></span>
              </label>
            </div>
            <div className={ formStyles.segmentRow }>
              <label className={formStyles.label}>Proceso</label>
              <label className={formStyles.switchBox}>
                <input
                  className={formStyles.inputElement}
                  checked={perteneceProceso}
                  type="checkbox"
                  onChange={() => {
                            return setPerteneceProceso(
                              !perteneceProceso
                            );
                  }}
                />
                <span className={formStyles.slider}></span>
              </label>
            </div>
            {perteneceProceso && (
              <div className={ formStyles.segmentRow }>
                <label className={ formStyles.label } htmlFor={ 'carpetaNumero' }>Numero de proceso al que pertenece</label>
                <select value={ valorState.carpetaNumero } onChange={ (
                  e
                ) => {
                          return setValorState(
                            {
                              ...valorState,
                              carpetaNumero: Number(
                                e.target.value
                              )
                            }
                          );
                }}>
                  { carpetas.map(
                    (
                      carpeta
                    ) => {
                              return (
                                <option key={carpeta.numero} value={carpeta.numero}>{carpeta.nombre}</option>
                              );
                    }
                  )
                  }
                </select>

              </div>
            )}
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
