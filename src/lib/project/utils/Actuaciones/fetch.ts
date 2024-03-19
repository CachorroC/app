import { Message, RequestActuacion } from '#@/lib/types/actuaciones';
import { sleep } from '../../helper';

export default async function fetchActuaciones (
  {
    idProceso, index
  }:{  idProceso: number, index: number}
): Promise<RequestActuacion> {
      try {

        await sleep(
          index
        );

        const request = await fetch(
          `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`, {
            next: {
              revalidate: 86400
            }
          }

        );

        if ( !request.ok ) {
          return request.json();
        }

        const consultaActuaciones = await request.json();
        return {
          ConsultaActuaciones: consultaActuaciones,
          Message            : request.statusText as Message,
          StatusCode         : request.status
        };
      } catch ( error ) {
        console.log(
          `${ idProceso }ERROR ===> FETCHACTUACIONES ${ JSON.stringify(
            error, null, 2
          ) }`
        );
        return {
          StatusCode: 0,
          Message   : JSON.stringify(
            error
          ) as Message
        };
      }
}
