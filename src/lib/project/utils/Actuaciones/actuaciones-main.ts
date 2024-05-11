import { outActuacion } from '#@/lib/types/actuaciones';
import { cache } from 'react';
import fetchActuaciones from './fetch';

process.env[ 'NODE_TLS_REJECT_UNAUTHORIZED' ] = '0';

export const getActuaciones = cache(
  async (
    {
      idProceso 
    }: { idProceso: number } 
  ) => {
    try {
      if ( idProceso === 0 ) {
        throw new Error(
          `no hay idProceso: ${ idProceso }` 
        );
      }

      const request = await fetchActuaciones(
        {
          idProceso,
        } 
      );

      if ( !request.ConsultaActuaciones ) {
        throw new Error(
          `${ request.Message }` 
        );
      }

      const {
        actuaciones 
      } = request.ConsultaActuaciones;

      const outActuaciones = actuaciones.map(
        (
          actuacion 
        ) => {
          return {
            ...actuacion,
            isUltimaAct   : actuacion.cant === actuacion.consActuacion,
            idProceso     : idProceso,
            fechaActuacion: new Date(
              actuacion.fechaActuacion 
            ),
            fechaRegistro: new Date(
              actuacion.fechaRegistro 
            ),
            fechaInicial: actuacion.fechaInicial
              ? new Date(
                actuacion.fechaInicial 
              )
              : null,
            fechaFinal: actuacion.fechaFinal
              ? new Date(
                actuacion.fechaFinal 
              )
              : null,
          } as outActuacion;
        } 
      );
      /*  await updateActuacionesInPrisma(
          outActuaciones
        ); */
      return outActuaciones;
    } catch ( error ) {
      console.log(
        `${ idProceso }: : error en la  fetchActuaciones  =>  ${ error }`,
      );

      return [];
    }
  },
);
