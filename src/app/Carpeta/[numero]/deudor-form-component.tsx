'use client';

import { useCarpetaFormContext } from '#@/app/Context/carpeta-form-context';

export function DeudorFormComponent() {
      const {
        stateCarpeta, setStateCarpeta
      } = useCarpetaFormContext();

      const {
        deudor
      } = stateCarpeta;

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
            onChange={(
              e
            ) => {
                      return setStateCarpeta(
                        {
                          ...stateCarpeta,
                          deudor: {
                            ...deudor,
                            primerNombre: e.target.value,
                          },
                        }
                      );
            }}
          />
        </fieldset>
      );
}
