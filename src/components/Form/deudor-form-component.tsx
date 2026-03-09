'use client';

import { useCarpetaFormContext } from '#@/app/Context/carpeta-form-context';

export function DeudorFormComponent() {
  const {
    carpetaFormState, setCarpetaFormState 
  } = useCarpetaFormContext();

  const {
    deudor 
  } = carpetaFormState;

  if ( !deudor ) {
    return null;
  }

  return (
    <fieldset>
      <legend>Deudor</legend>
      <input
        name={'deudor.primerNombre'}
        value={deudor.primerNombre}
        type="text"
        placeholder={'primer nombre'}
        onChange={( e ) => {
          return setCarpetaFormState( {
            ...carpetaFormState,
            deudor: {
              ...deudor,
              primerNombre: e.target.value,
            },
          } );
        }}
      />
    </fieldset>
  );
}
