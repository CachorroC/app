'use client';

import { FieldPath, useFormContext } from 'react-hook-form';
import form from 'components/Form/form.module.css';
import { IntCarpeta } from '#@/lib/types/carpetas';

export default function Page() {
      const {
        setFocus
      } = useFormContext<IntCarpeta>();

      const carpetaKeys: FieldPath<IntCarpeta>[] = [
        'deudor.primerNombre',
        'deudor.segundoNombre',
        'deudor.primerApellido',
        'deudor.segundoApellido',
        'deudor.cedula',
        'deudor.direccion',
        'deudor.telFijo',
        'deudor.telCelular',
      ];

      return (
        <>
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
                        'llaveProceso', {
                          shouldSelect: true,
                        }
                      );
            }}
          >
            <span>{'expediente'}</span>
          </button>
          <button
            type={'button'}
            className={form.button}
            onClick={() => {
                      setFocus(
                        'tipoProceso', {
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
