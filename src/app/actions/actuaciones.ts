'use server';

import { updateUltimaActuacionInPrisma } from '#@/lib/project/utils/Actuaciones/updater';
import { ConsultaActuacion, outActuacion } from '#@/lib/types/actuaciones';

const sleep = (
  ms: number
) => {
          return new Promise(
            (
              resolve
            ) => {
                      return setTimeout(
                        resolve, ms * 200
                      );
            }
          );
};

export async function fetchActuaciones (
  {
    idProceso, index = 1
  }: { idProceso: number; index: number }
) {
      await sleep(
        index
      );

      try {
        const request = await fetch(
          `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,
        );

        if ( !request.ok ) {
          throw new Error(
            `${ idProceso }: ${ request.status } ${ request.statusText }${ JSON.stringify(
              request,
              null,
              2,
            ) }`,
          );
        }

        const json = ( await request.json() ) as ConsultaActuacion;

        const {
          actuaciones
        } = json;

        if ( actuaciones.length === 0 ) {
          throw new Error(
            `no hay actuaciones para el idProceso ${ idProceso }`
          );

        }

        const outActuaciones: outActuacion[] = actuaciones.map(
          (
            actuacion
          ) => {
                    return {
                      ...actuacion,
                      isUltimaAct: actuacion.cant === actuacion.consActuacion,
                      idProceso  : idProceso,
                    };
          }
        );

        const [ ultimaActuacion ] = outActuaciones;
        updateUltimaActuacionInPrisma(
          ultimaActuacion
        );
        return {
          actuaciones: outActuaciones,
          message    : 'ok'
        };
      } catch ( error ) {
        console.log(
          error
        );
        return {
          actuaciones: null,
          message    : JSON.stringify(
            error
          )
        };
      }
}