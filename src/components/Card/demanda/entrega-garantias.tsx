'use client';

import { useState } from 'react';
import { InputDateHelper, OutputDateHelper } from '../../../lib/project/date-helper';

export default function InputEntregaGarantias (
  {
    entregaGarantiasAbogado
  }: { entregaGarantiasAbogado: Date }
) {
  const textIncoming = InputDateHelper(
    entregaGarantiasAbogado

  );

  const [
    inputGarantias,
    setInputGarantias
  ] = useState(
    textIncoming
  );
  return (
    <form>
      <input name='entregaGarantiasAbogado' value={ inputGarantias } onChange={ (
        e
      ) => {
        setInputGarantias(
          e.target.value
        );
      } } />
      <p>{OutputDateHelper(
        inputGarantias
      )}</p>
    </form>
  );
}