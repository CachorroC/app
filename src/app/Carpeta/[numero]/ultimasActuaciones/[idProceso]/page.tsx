import { ActuacionComponent } from '#@/components/Actuaciones/actuacion-component';
import { notFound } from 'next/navigation';
import { DatabaseActuacionType } from '#@/lib/types/actuaciones';
import fetchActuaciones from '#@/lib/project/utils/Actuaciones';

export default async function Page( {
  params,
}: {
  params: Promise<{
    numero   : string;
    idProceso: string;
  }>;
} ) {
  const {
    numero, idProceso
  } = await params;

  console.log( numero );

  if ( idProceso === 'idProceso' ) {
    return notFound();
  }

  const actuaciones = await fetchActuaciones(
    idProceso, Number( numero )
  );

  if ( !actuaciones || actuaciones.length === 0 ) {
    return notFound();
  }

  return (
    <>
      {actuaciones.map( ( actuacion ) => {
        const newActuacion: DatabaseActuacionType = {
          ...actuacion,
          idRegActuacion: `${ actuacion.idRegActuacion }`,
          carpetaNumero : Number( numero ),
          idProceso     : idProceso,
        };
        const anchorId = `actuacion-${ newActuacion.idRegActuacion }`;

        return (
          <div
            key={newActuacion.idRegActuacion}
            id={anchorId}
          >
            <ActuacionComponent incomingActuacion={newActuacion} />
          </div>
        );
      } )}
    </>
  );
}
