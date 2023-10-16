
import { fetchActuaciones } from '#@/lib/Actuaciones';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { Suspense } from 'react';
import { Loader } from '#@/components/Loader';

export async function FechaActuacionComponent(
  {
    idProceso,
    index,
    initialOpenState
  }: {
  idProceso: number;
      index: number;
  initialOpenState: boolean
}
) {
  const consultaActuaciones = await fetchActuaciones(
    idProceso, index
  );

  if ( !consultaActuaciones.actuaciones ) {
    return <p>{consultaActuaciones.Message}</p>;
  }

  const [
    ultimaActuacion
  ] = consultaActuaciones.actuaciones;

  return (
    <Suspense fallback={<Loader />}>
      <ActuacionComponent initialOpenState={initialOpenState} incomingActuacion={ultimaActuacion} />
    </Suspense>
  );
}
