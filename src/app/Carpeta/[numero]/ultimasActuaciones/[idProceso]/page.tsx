import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { notFound } from 'next/navigation';
import { fetchActuaciones } from '#@/lib/project/utils/Actuaciones';
import { outActuacion } from '#@/lib/types/actuaciones';

export const dynamic = 'force-dynamic';

export const dynamicParams = true;
/*
//? Generate segments for [numero]

export async function generateStaticParams () {
      const carpetas = await getCarpetas();

      const flattenUp = carpetas.flatMap(
        (
          carpeta
        ) => {
                  const {
                    numero, idProcesos
                  } = carpeta;

                  if ( idProcesos.length === 0 ) {
                    return {
                      numero: String(
                        numero
                      ),
                      idProceso: 'idProceso'
                    };
                  }

                  return idProcesos.map(
                    (
                      idProceso
                    ) => {
                              return {
                                numero: String(
                                  numero
                                ),
                                idProceso: String(
                                  idProceso
                                )
                              };
                    }
                  );


        }
      );

      const chunkSize = 20;

      const chunks = [];

      for ( let i = 0; i < flattenUp.length; i += chunkSize ) {
        const chunk = flattenUp.slice(
          i, i + chunkSize
        );
        chunks.push(
          chunk
        );
      }

      return chunks[ 0 ];
}
 */


export default async function Page (
  {
    params,
  }: {
    params: {
      numero: string;
      idProceso: string;
    };
  }
) {

      if ( params.idProceso === 'idProceso' ) {
        return notFound();
      }




      const actuaciones = await fetchActuaciones(
        Number(
          params.idProceso
        )
      );

      if ( !actuaciones || actuaciones.length === 0 ) {
        return notFound();
      }

      return (
        <>
          { actuaciones.map(
            (
              actuacion, index
            ) => {
                      const newActuacion: outActuacion = {
                        ...actuacion,
                        isUltimaAct: actuacion.cant === actuacion.consActuacion,
                        idProceso  : Number(
                          params.idProceso
                        ),
                      };
                      return (
                        <ActuacionComponent
                          key={ index }
                          incomingActuacion={ newActuacion }
                          initialOpenState={ true }
                        />
                      );
            }
          ) }
        </>
      );
}
