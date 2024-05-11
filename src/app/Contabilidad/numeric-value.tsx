'use client';

import { intFactura } from '#@/lib/types/contabilidad';
import { useState } from 'react';
import { useNuevaFacturaContext } from './nueva-factura-context-provider';
import formStyles from '#@/components/Form/form.module.css';

export function NumericValueInput(
  {
    inputName,
    inputLabel,
  }: {
  inputName: keyof intFactura;
  inputLabel: string;
} 
) {
  const {
    valorState, setValorState 
  } = useNuevaFacturaContext();

  const [
    isEditing,
    setIsEditing
  ] = useState(
    false 
  );

  return (
    <div className={formStyles.segmentRow}>
      <label
        htmlFor={inputName}
        className={formStyles.label}
      >
        {inputLabel}
      </label>
      <input
        name={inputName}
        className={formStyles.textArea}
        type={isEditing
          ? 'number'
          : ''}
        value={
          isEditing
            ? String(
              valorState[ inputName ] === '0.00'
                ? ''
                : valorState[ inputName ],
            )
            : Number(
              valorState[ inputName ] 
            )
              .toLocaleString(
                'es-CO', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  minimumIntegerDigits : 1,
                  currency             : 'COP',
                  style                : 'currency',
                  currencyDisplay      : 'symbol',
                } 
              )
        }
        inputMode={'decimal'}
        onFocus={() => {
          return setIsEditing(
            true 
          );
        }}
        onBlur={() => {
          return setIsEditing(
            false 
          );
        }}
        onChange={(
          e 
        ) => {
          return setValorState(
            {
              ...valorState,
              [ e.target.name ]: e.target.value === ''
                ? '0.00'
                : e.target.value,
            } 
          );
        }}
      />
    </div>
  );
}
