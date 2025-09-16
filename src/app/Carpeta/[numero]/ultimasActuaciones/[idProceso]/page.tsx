import { ActuacionComponent } from '#@/components/Actuaciones/actuacion-component';
import { notFound } from 'next/navigation';
import { outActuacion } from '#@/lib/types/actuaciones';
import fetchActuaciones from '#@/lib/project/utils/Actuaciones';

export default async function Page( {
  params,
}: {
  params: Promise<{
    numero: string;
    idProceso: string;
  }>;
  } ) {
  const {
    numero, idProceso 
  } = await params;

  if ( idProceso === 'idProceso' ) {
    return notFound();
  }

  const actuaciones = await fetchActuaciones( Number( idProceso ) );

  if ( !actuaciones || actuaciones.length === 0 ) {
    return notFound();
  }

  return (
    <>
      {actuaciones.map( ( actuacion ) => {
        const newActuacion: outActuacion = {
          ...actuacion,
          isUltimaAct: actuacion.cant === actuacion.consActuacion,
          idProceso  : Number( idProceso ),
        };

        return (
          <ActuacionComponent
            key={ newActuacion.idRegActuacion}
            incomingActuacion={newActuacion}
          />
        );
      } )}
    </>
  );
}
