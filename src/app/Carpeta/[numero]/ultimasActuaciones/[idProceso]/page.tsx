import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { notFound } from 'next/navigation';
import { getActuaciones } from '#@/lib/project/utils/Actuaciones';
import { outActuacion } from '#@/lib/types/actuaciones';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';


//? Generate segments for [numero]

export async function generateStaticParams() {
      const carpetas = await getCarpetas();

      const flattenUp = carpetas.flatMap(
        (
          carpeta
        ) => {
                  const {
                    numero, procesos
                  } = carpeta;

                  if ( procesos.length === 0 ) {
                    return {
                      numero: String(
                        numero
                      ),
                      idProceso: 'idProceso',
                    };
                  }

                  return procesos.map(
                    (
                      proceso
                    ) => {
                              if ( proceso.esPrivado ) {
                                return {
                                  numero: String(
                                    numero
                                  ),
                                  idProceso: 'idProceso',
                                };
                              }

                              return {
                                numero: String(
                                  numero
                                ),
                                idProceso: String(
                                  proceso.idProceso
                                ),
                              };
                    }
                  );
        }
      );

      const chunkSize = 100;

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

export default async function Page(
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

      const actuaciones = await getActuaciones(
        Number(
          params.idProceso
        )
      );

      if ( !actuaciones || actuaciones.length === 0 ) {
        return notFound();
      }

      return (
        <>
          {actuaciones.map(
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
                          key={index}
                          incomingActuacion={newActuacion}
                        />
                      );
            }
          )}
        </>
      );
}
