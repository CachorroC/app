import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { notFound } from 'next/navigation';
import { getActuaciones } from '#@/lib/project/utils/Actuaciones';
import { outActuacion } from '#@/lib/types/actuaciones';

//? Generate segments for [numero]
/*
export async function generateStaticParams () {
      const carpetas = await getCarpetas();

      return carpetas.flatMap(
        (
          carpeta
        ) => {
                  const {
                    numero, idProcesos
                  } = carpeta;

                  if ( !idProcesos || idProcesos.length === 0 ) {
                    return {
                      numero: String(
                        numero
                      ),
                      idProceso: 'idProceso'
                    };
                  }

                  return idProcesos.map(
                    (
                      idp
                    ) => {
                              return {
                                numero: String(
                                  numero
                                ),
                                idProceso: String(
                                  idp
                                ),
                              };
                    }
                  );
        }
      );
}



 */

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
                          initialOpenState={true}
                        />
                      );
            } 
          )}
        </>
      );
}
