import typography from '#@/styles/fonts/typography.module.scss';
import { Actuacion } from '#@/lib/types/actuaciones';
import Link from 'next/link';
import styles from 'components/Card/card.module.css';
import { button } from 'components/Buttons/buttons.module.css';
import { Route } from 'next';
import { fetchActuaciones } from '#@/lib/Actuaciones';
import ActuacionComponent from '#@/components/Card/actuacion-component';
import { fixFechas } from '#@/lib/project/helper';

export const FechaActuacionComponent = async (
  {
    idProceso,
    index,
    initialOpenState
  }: {
  idProceso: number;
      index: number;
  initialOpenState: boolean
}
) => {
  const consultaActuaciones = await fetchActuaciones(
    idProceso, index
  );

  if ( !consultaActuaciones.actuaciones ) {
    return <p>{consultaActuaciones.Message}</p>;
  }

  const [
    ultimaActuacion
  ] = consultaActuaciones.actuaciones;

  return <ActuacionComponent initialOpenState={initialOpenState} incomingActuacion={ultimaActuacion} />;
};

export const ActuacionCard = (
  {
    act
  }: { act: Actuacion }
) => {
  const {
    consActuacion,
    fechaActuacion,
    actuacion,
    anotacion,
    conDocumentos,
    cant,
  } = act;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.section}>
          <h1 className={`${ typography.titleMedium } ${ styles.title }`}>
            {`${ actuacion }`}
          </h1>
          <sub
            className={`${ typography.labelSmall } ${ styles.sub }`}
          >{`${ consActuacion } de ${ cant }`}</sub>
        </div>
        {anotacion && <p className={typography.bodyMedium}>{`${ anotacion }`}</p>}
        {conDocumentos && (
          <span className={`material-symbols-outlined ${ styles.icon }`}>
            file_present
          </span>
        )}
        <div className={styles.links}>
          <Link
            href={'/Notas/Nueva' as Route}
            className={button}
          >
            <span className={`material-symbols-outlined ${ styles.icon }`}>
              note_add
            </span>
          </Link>
          <sup className={`${ typography.labelMedium } ${ styles.date }`}>
            {fixFechas(
              fechaActuacion
            )}
          </sup>
        </div>
      </div>
    </div>
  );
};

export const ActuacionesList = (
  {
    actuaciones,
  }: {
  actuaciones: Actuacion[];
}
) => {
  return (
    <>
      {actuaciones.map(
        (
          act
        ) => {
          return (
            <ActuacionCard
              act={act}
              key={act.idRegActuacion}
            />
          );
        }
      )}
    </>
  );
};
