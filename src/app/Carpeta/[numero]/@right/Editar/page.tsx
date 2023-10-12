'use client';

import { FieldPath, useFormContext } from 'react-hook-form';
import form from 'components/form/form.module.css';
import layout from '#@/styles/layout.module.css';
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
    'deudor.tel.fijo',
    'deudor.tel.celular',
  ];

  return (
    <div className={layout.right}>
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
    </div>
  );
}
