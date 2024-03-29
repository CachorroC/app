import { fixFechas } from '#@/lib/project/helper';
import { MonCarpeta } from '#@/lib/types/carpetas';
import typography from '#@/styles/fonts/typography.module.scss';
import { Actuacion } from '#@/lib/types/actuaciones';
import Link from 'next/link';
import styles from 'components/Card/card.module.css';
import { button } from 'components/Buttons/buttons.module.css';
import { Route } from 'next';
import { getActuaciones } from '#@/lib/Actuaciones';

export const FechaActuacionComponent = async (
  {
    carpeta,
    index,
  }: {
  carpeta: MonCarpeta;
  index: number;
}
) => {
  if ( !carpeta.idProceso ) {
    return null;
  }

  const actuaciones = await getActuaciones(
    {
      carpeta: carpeta,
      index  : index,
    }
  );

  if ( !actuaciones ) {
    return null;
  }

  const [
    ultimaActuacion
  ] = actuaciones;


  return (
    <div className={styles.section}>
      {ultimaActuacion.actuacion && (
        <h5 className={` ${ styles.actuacion } ${ typography.titleSmall }`}>
          {ultimaActuacion.actuacion}
        </h5>
      )}
      {ultimaActuacion.anotacion && (
        <p className={` ${ styles.anotacion } ${ typography.labelSmall }`}>
          {ultimaActuacion.anotacion}
        </p>
      ) }
      <sub className={styles.date}>
        {fixFechas(
          ultimaActuacion.fechaActuacion
        )}
      </sub>
    </div>
  );
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
        <div className={ styles.section }>
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
        <div className={ styles.links }>
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
              key={act.consActuacion}
            />
          );
        }
      )}
    </>
  );
};
