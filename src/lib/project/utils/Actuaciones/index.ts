
import { outActuacion } from '#@/lib/types/actuaciones';
import { sleep } from '../../helper';
import fetchActuaciones from './fetch';
import { updateUltimaActuacionInPrisma } from './updater';

process.env[ 'NODE_TLS_REJECT_UNAUTHORIZED' ] = '0';

export async function getActuaciones(
  idProceso: number, index: number = 1
) {
      await sleep(
        index
      );

      try {
        const request = await fetchActuaciones(
          idProceso
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

        const  ultimaActuacion = outActuaciones.find(
          (
            out
          ) => {
                    return out.isUltimaAct;
          }
        );
        updateUltimaActuacionInPrisma(
          ultimaActuacion ?? outActuaciones[ 0 ]
        );
        return outActuaciones;
      } catch ( error ) {
        console.log(
          `${ idProceso }: : error en la  fetchActuaciones  =>  ${ error }`
        );

        return [];
      }
}
