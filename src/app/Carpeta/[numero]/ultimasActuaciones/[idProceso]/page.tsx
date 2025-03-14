import { ActuacionComponent } from '#@/components/Actuaciones/actuacion-component';
import { notFound } from 'next/navigation';
import { outActuacion } from '#@/lib/types/actuaciones';
import fetchActuaciones from '#@/lib/project/utils/Actuaciones';


export default async function Page( {
  params,
}: {
  params: {
    numero: string;
    idProceso: string;
  };
} ) {
  if ( params.idProceso === 'idProceso' ) {
    return notFound();
  }

  const actuaciones = await fetchActuaciones( Number( params.idProceso ), );

  if ( !actuaciones || actuaciones.length === 0 ) {
    return notFound();
  }

  return (
    <>
      {actuaciones.map( (
        actuacion, index
      ) => {
        const newActuacion: outActuacion = {
          ...actuacion,
          isUltimaAct: actuacion.cant === actuacion.consActuacion,
          idProceso  : Number( params.idProceso ),
        };

        return (
          <ActuacionComponent
            key={index}
            incomingActuacion={newActuacion}
          />
        );
      } )}
    </>
  );
}
