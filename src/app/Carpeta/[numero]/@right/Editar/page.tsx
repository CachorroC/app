'use client';

import { FieldPath, useFormContext, useWatch } from 'react-hook-form';
import form from 'components/form/form.module.css';
import layout from '#@/styles/layout.module.css';
import { IntCarpeta } from '#@/lib/types/carpetas';
import styles from '#@/app/Carpetas/@right/Nueva/styles.module.css';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { fixMoney } from '#@/lib/project/helper';

export default function Page() {
      const {
        setFocus, getValues
      } = useFormContext<IntCarpeta>();


      const carpetaKeys: FieldPath<IntCarpeta>[] = [
        'deudor.primerNombre',
        'deudor.segundoNombre',
        'deudor.primerApellido',
        'deudor.segundoApellido',
        'deudor.cedula',
        'deudor.direccion',
        'deudor.tel.fijo',
        'deudor.tel.celular',
      ];

      const carpeta = useWatch<IntCarpeta>();
      return (
        <>

          <section className={ layout.segmentColumn }>
            <div className={ styles.divider }></div>
            <div className={ styles.divider }></div>
            <div className={ styles.divider }></div>
            <pre>
              {carpeta.demanda?.capitalAdeudado &&  fixMoney(
                {
                  valor: carpeta.demanda.capitalAdeudado,
                }
              ) }
            </pre>
            <p>{carpeta.demanda && ( parseInt(
              carpeta.demanda.capitalAdeudado?.toString() ?? ''
            ) ) }</p>
            <p>{carpeta.demanda && ( parseFloat(
              carpeta.demanda.capitalAdeudado?.toString() ?? ''
            ) ) }</p>
            <p>{carpeta.demanda && ( Number(
              carpeta.demanda.capitalAdeudado?.toString() ?? ''
            ) )}</p>
            <div className={ styles.divider }></div>
            <pre>{ OutputDateHelper(
              carpeta.demanda?.entregaGarantiasAbogado
            ) }</pre>
            <div className={ styles.divider }></div>

            <pre>{ JSON.stringify(
              carpeta, null, 2
            ) }</pre>

            <pre>{ JSON.stringify(
              getValues(), null, 2
            ) }</pre>


            <div className={ styles.divider }></div>
            <button
              type="button"
              onClick={ () => {
                        alert(
                          JSON.stringify(
                            carpeta, null, 2
                          )
                        );
              } }
            ></button>
            <div className={ styles.divider }></div>
          </section>
          {carpetaKeys.map(
            (
              carpetaKey
            ) => {
                      return (
                        <button
                          key={carpetaKey}
                          type={'button'}
                          className={form.button}
                          onClick={() => {
                                    setFocus(
                                      carpetaKey, {
                                        shouldSelect: true,
                                      }
                                    );
                          }}
                        >
                          <span>{carpetaKey}</span>
                        </button>
                      );
            }
          )}
          <button
            type={'button'}
            className={form.button}
            onClick={() => {
                      setFocus(
                        'numero', {
                          shouldSelect: true,
                        }
                      );
            }}
          >
            <span>{'numero'}</span>
          </button>
          <button
            type={'button'}
            className={form.button}
            onClick={() => {
                      setFocus(
                        'category', {
                          shouldSelect: true,
                        }
                      );
            }}
          >
            <span>{'categoria'}</span>
          </button>

          <button
            type={'button'}
            className={form.button}
            onClick={() => {
                      setFocus(
                        'demanda.tipoProceso', {
                          shouldSelect: true,
                        }
                      );
            }}
          >
            <span>{'tipo de proceso'}</span>
          </button>
          <button
            type={'button'}
            className={form.button}
            onClick={() => {
                      setFocus(
                        'deudor.primerNombre', {
                          shouldSelect: true,
                        }
                      );
            }}
          >
            <span>{'nombre'}</span>
          </button>
          <button
            type={'button'}
            className={form.button}
            onClick={() => {
                      setFocus(
                        'deudor.segundoNombre', {
                          shouldSelect: true,
                        }
                      );
            }}
          >
            <span>{'segundo nombre'}</span>
          </button>
        </>
      );
}
