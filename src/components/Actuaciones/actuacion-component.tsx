import { FetchResponseActuacionType,
  DatabaseActuacionType, } from '#@/lib/types/actuaciones';
import { ActuacionCard } from './actuacion-card';
import { ActuacionCardError,
  ActuacionCardErrorProps, } from './actuacion-card-error';
import { ActuacionCardSkeleton } from './actuacion-card-skeleton';

export function ActuacionComponent( {
  incomingActuacion,
}: {
  incomingActuacion: DatabaseActuacionType | FetchResponseActuacionType;
} ) {
  const isDb = 'idProceso' in incomingActuacion;

  return (
    <ActuacionCard
      actuacion={incomingActuacion.actuacion}
      fechaActuacion={incomingActuacion.fechaActuacion}
      anotacion={incomingActuacion.anotacion}
      fechaInicial={incomingActuacion.fechaInicial}
      fechaFinal={incomingActuacion.fechaFinal}
      fechaRegistro={incomingActuacion.fechaRegistro}
      codRegla={incomingActuacion.codRegla}
      conDocumentos={incomingActuacion.conDocumentos}
      cant={incomingActuacion.cant}
      llaveProceso={incomingActuacion.llaveProceso}
      consActuacion={incomingActuacion.consActuacion}
      isUltimaAct={isDb
        ? incomingActuacion.isUltimaAct
        : undefined}
      carpetaNumero={isDb
        ? incomingActuacion.carpetaNumero
        : undefined}
      idProceso={isDb
        ? incomingActuacion.idProceso
        : undefined}
      createdAt={isDb
        ? incomingActuacion.createdAt
        : undefined}
    />
  );
}

export function ActuacionErrorComponent( props: ActuacionCardErrorProps = {} ) {
  return <ActuacionCardError {...props} />;
}

export function ActuacionLoadingComponent() {
  return <ActuacionCardSkeleton />;
}
