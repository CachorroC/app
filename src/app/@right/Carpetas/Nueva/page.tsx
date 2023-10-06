'use client';

import { useCarpetaFormContext } from '#@/app/context/carpeta-form-context';
import { useFormContext } from 'react-hook-form';

export default function Page () {
  const {
    getValues,
    formState: {
      dirtyFields
    }
  } = useFormContext();

  const {
    nuevaCarpeta
  } = useCarpetaFormContext();

  return (
    <>
      <pre>{nuevaCarpeta.demanda.capitalAdeudado.toLocaleString(
        'es-CO', {
          currency: 'COP',
          style: 'currency',
          currencyDisplay: 'name'
        }
      )}</pre>
      <pre>{ JSON.stringify(
        nuevaCarpeta, null, 2
      ) }</pre>

      <button
        type="button"
        onClick={ () => {
          alert(
            JSON.stringify(
              getValues(), null, 2
            )
          );
        } }
      >

      </button>
    </>
  );
}