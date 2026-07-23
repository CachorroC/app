import Link from 'next/link';
import { Route } from 'next';
import { DatabaseActuacionType } from '#@/lib/types/actuaciones';
import { ActuacionCard } from './actuacion-card';
import { ActuacionCardError,
  ActuacionCardErrorProps, } from './actuacion-card-error';
import { mapDbActuacionToCardProps } from './actuacion-card-props';
import styles from './actuacion-table-component.module.css';

export function ActuacionTableComponent( {
  numero,
  incomingActuacion,
}: {
  numero           : number;
  incomingActuacion: DatabaseActuacionType;
} ) {
  const actuacionesHref: Route<`/dashboard/Carpeta/${number}/ultimasActuaciones/${string}`> = `/dashboard/Carpeta/${ numero }/ultimasActuaciones/${ incomingActuacion.idProceso }`;

  return (
    <td data-label="ultimaActuacion">
      <Link
        className={styles.cardLink}
        href={actuacionesHref}
      >
        <ActuacionCard {...mapDbActuacionToCardProps( incomingActuacion )} />
      </Link>
    </td>
  );
}

export function ActuacionTableErrorComponent( props: ActuacionCardErrorProps = {}, ) {
  return (
    <td data-label="ultimaActuacion">
      <ActuacionCardError {...props} />
    </td>
  );
}
