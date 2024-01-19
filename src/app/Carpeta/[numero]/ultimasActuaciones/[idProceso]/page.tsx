import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { notFound } from 'next/navigation';
import { fetchActuaciones } from '#@/lib/project/utils/Actuaciones';
import { outActuacion } from '#@/lib/types/actuaciones';
import { prisma } from '#@/lib/connection/prisma';



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


      await prisma.carpeta.update(
        {
          where: {
            numero: Number(
              params.numero
            ),
          },
          data: {
            revisado: true,
          },
        }
      );

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
