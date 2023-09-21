import { MonCarpeta } from 'types/carpetas';
import { Fragment } from 'react';
import styles from './procesos.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import Link from 'next/link';
import type { Route } from 'next';
import { Proceso } from 'types/procesos';
import { fixDemandado, fixFechas } from '#@/lib/project/helper';
import { getProceso } from '#@/lib/Procesos';

export const ProcesoCard = (
  {
    proceso
  }: { proceso: Proceso }
) => {
  const {
    idProceso,
    llaveProceso,
    sujetosProcesales,
    despacho,
    esPrivado,
    fechaUltimaActuacion,
  } = proceso;

  if ( esPrivado ) {
    return null;
  }

  const juzgado = despacho
    ? despacho.replace(
      / /g, '-'
    )
      .toLocaleLowerCase()
      .slice(
        0, -1
      )
    : null;

  return (
    <div
      className={styles.container}
      key={proceso.idProceso}
    >
      <div className={styles.card}>
        <h1 className={`${ typography.titleLarge } ${ styles.title }`}>
          {fixDemandado(
            sujetosProcesales
          )}
        </h1>
        <Link
          className={styles.button}
          href={`/Procesos/${ llaveProceso }/${ idProceso }` as Route}
        >
          <span className={`material-symbols-outlined ${ styles.icon }`}>
            open_in_new
          </span>
        </Link>
        <p className={`${ typography.bodyMedium } ${ styles.content }`}>
          {despacho}
        </p>
        {fechaUltimaActuacion && (
          <sub className={styles.date}>{fixFechas(
            fechaUltimaActuacion.toString()
          )}</sub>
        )}
        {juzgado && (
          <Link
            className={styles.button}
            href={`https://ramajudicial.gov.co/web/${ juzgado.replaceAll(
              'á',
              'a',
            ) }`}
          >
            <p className={typography.bodySmall}>
              {juzgado.replaceAll(
                'á', 'a'
              )}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export const ProcesoComponent = async (
  {
    carpeta,
    index,
  }: {
  carpeta: MonCarpeta;
  index: number;
}
) => {
  if ( !carpeta.llaveProceso ) {
    return null;
  }

  const procesos = await getProceso(
    {
      llaveProceso: carpeta.llaveProceso,
      index       : index,
    }
  );

  if ( !procesos || procesos.length === 0 ) {
    return null;
  }

  return (
    <Fragment key={carpeta.llaveProceso}>
      {procesos.map(
        (
          proceso
        ) => {
          return (
            <ProcesoCard
              key={proceso.idProceso}
              proceso={proceso}
            />
          );
        }
      )}
    </Fragment>
  );
};
