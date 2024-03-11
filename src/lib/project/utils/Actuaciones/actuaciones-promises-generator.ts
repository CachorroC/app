import {   RequestActuacion } from '#@/lib/types/actuaciones';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { sleep } from '../../helper';

export async function getActuaciones (
  {
    numero, idProceso,
  }: {numero: number; idProceso: number;}
): Promise<RequestActuacion> {
      try {
        if ( idProceso === 0 ) {
          throw new Error(
            `no hay idProceso: ${ numero }`
          );
        }

        await sleep(
          numero
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

        return {
          Message            : request.statusText,
          StatusCode         : request.status,
          ConsultaActuaciones: await request.json()
        };

      } catch ( error ) {
        return {
          Message: JSON.stringify(
            error
          ),
          StatusCode: 404
        };
      }

}

export async function AsyncGenerateActuaciones (
  {
    carpetas
  }: {carpetas: IntCarpeta[]}
) {
      return carpetas.flatMap(
        (
          carpeta
        ) => {
                  const {
                    idProcesos, numero
                  } = carpeta;

                  if ( idProcesos.length > 0 ) {
                    return idProcesos.map(
                      (
                        idProceso
                      ) => {
                                return {
                                  ...carpeta,
                                  idProceso       : idProceso,
                                  actuacionPromise: getActuaciones(
                                    {
                                      idProceso: idProceso,
                                      numero   : numero,
                                    }
                                  )
                                };
                      }
                    );
                  }

                  return {
                    ...carpeta,
                    actuacionPromise: getActuaciones(
                      {
                        idProceso: 0,
                        numero   : numero
                      }
                    )
                  };


        }
      );

}
