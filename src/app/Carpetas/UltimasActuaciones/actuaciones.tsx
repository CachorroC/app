
import { getActuaciones } from '#@/lib/Actuaciones';
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
  const consultaActuaciones = await getActuaciones(
    {
      idProceso: idProceso,
      index    : index
    }
  );

  if ( !consultaActuaciones ) {
    return null;
  }

  const [
    ultimaActuacion
  ] = consultaActuaciones;

  return (
    <Suspense fallback={<Loader />}>
      <ActuacionComponent initialOpenState={initialOpenState} incomingActuacion={ultimaActuacion} />
    </Suspense>
  );
}
