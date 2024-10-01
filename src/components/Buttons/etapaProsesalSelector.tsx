'use client';
import { useDemandaFormContext } from '#@/app/Context/carpeta-form-context';
import { useState } from 'react';

const etapasProcesalesOptions = [
  'ADMISION',
  'APELACION',
  'AUDIENCIA',
  'CONTESTACION DEMANDA',
  'CURADOR AD LITEM',
  'EJECUCION',
  'EMPLAZAMIENTO',
  'EXCEPCIONES',
  'LIQUIDACION',
  'NOTIFICACION',
  'PENDIENTE SENTENCIA Y OFICIOS',
  'SENTENCIA',
  'SOLICITUD LIQUIDACION CREDITO - COVINOC',
  'SOLICITUD LIQUIDACION CREDITO - REINTEGRA',
  'SUBSANACION',
  'SUSPENDIDO',
  'TERMINADO',
];

export default function FruitPicker() {
  const {
    demandaFormState, demandaFormAction 
  } = useDemandaFormContext();

  const [
    etapaProcesalState,
    setEtapaProcesalState
  ] = useState( demandaFormState.demanda.etapaProcesal ?? '', );

  return (
    <form action={demandaFormAction}>
      <label>
        Pick a fruit:
        <select
          value={etapaProcesalState}
          onChange={( e ) => {
            return setEtapaProcesalState( e.target.value );
          }}
        >
          {etapasProcesalesOptions.map( ( optionEtapa ) => {
            return (
              <option
                key={optionEtapa}
                value={optionEtapa}
              >
                {optionEtapa.toLocaleLowerCase()}
              </option>
            );
          } )}
        </select>
      </label>

      <p>Your favorite fruit: {etapaProcesalState}</p>
      <p>Your favorite vegetables: {demandaFormState.demanda.etapaProcesal}</p>
    </form>
  );
}
