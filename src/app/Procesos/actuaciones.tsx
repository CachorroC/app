import { fixFechas, sleep } from '#@/lib/project/helper';
import { MonCarpeta } from '#@/lib/types/carpetas';
import typography from '#@/styles/fonts/typography.module.scss';
import { Actuacion, ConsultaActuacion } from '#@/lib/types/actuaciones';
import Link from 'next/link';
import styles from 'components/Card/card.module.css';
import { button } from 'components/Buttons/buttons.module.css';
import { Route } from 'next';
interface ErrorActuacion {
  StatusCode: number;
  Message: string;
}


async function getActuaciones(
  {
    idProceso, index
  }: {idProceso: number; index: number}
) {
  try {
    await sleep(
      index
    );

    const req = await fetch(
      `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`, {
        next: {

          revalidate: 32400
        }
      }
    );

    if ( !req.ok ) {
      const json = ( await req.json() ) as ErrorActuacion;

      throw new Error(
        ` status: ${ req.status }, text: ${
          req.statusText
        }, json: ${ JSON.stringify(
          json
        ) }`,
      );
    }

    const json = ( await req.json() ) as ConsultaActuacion;

    return json;
  } catch ( error ) {
    if ( error instanceof Error ) {
      console.log(
        `${ idProceso }: error en la fetchActuaciones => ${ error.name } : ${ error.message }`,
      );

      return null;
    }
    console.log(
      `${ idProceso }: : error en la  fetchActuaciones  =>  ${ error }`
    );

    return null;
  }
}

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

  const consultaActuaciones = await getActuaciones(
    {
      idProceso: carpeta.idProceso,
      index    : index,
    }
  );

  if ( !consultaActuaciones ) {
    return null;
  }

  const {
    actuaciones
  }= consultaActuaciones;

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
