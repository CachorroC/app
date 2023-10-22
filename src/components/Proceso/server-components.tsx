
import styles from './procesos.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import Link from 'next/link';
import type { Route } from 'next';
import { intProceso } from 'types/procesos';
import { fixDemandado, fixFechas } from '#@/lib/project/helper';
import { getProceso } from '#@/lib/Procesos';
import { DespachoJudicial } from '#@/lib/types/carpetas';

export const ProcesoCard = (
  {
    proceso
  }: { proceso: intProceso }
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

  const juzgado = new DespachoJudicial(
    proceso
  );

  const sujetosReplacer = sujetosProcesales.replaceAll(
    '|', ','
  );

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
        <h1 className={typography.titleMedium }>
          {JSON.stringify(
            `{${ sujetosReplacer }}`, null, 2
          )}
        </h1>
        <Link
          className={styles.button}
          href={`/Carpetas/Expediente/${ llaveProceso }/${ idProceso }` }
        >
          <span className={`material-symbols-outlined ${ styles.icon }`}>
            open_in_new
          </span>
        </Link>
        <p className={`${ typography.bodyMedium } ${ styles.content }`}>
          {despacho}
        </p>
        {fechaUltimaActuacion && (
          <sub className={styles.date}>
            {fixFechas(
              fechaUltimaActuacion.toString()
            )}
          </sub>
        )}
        {juzgado && (
          <Link
            className={styles.button}
            href={juzgado.url as Route} target={'_blank'}
          >
            <sub className={typography.labelLarge}>{juzgado.id}</sub>
            <p className={typography.bodySmall}>
              {juzgado.tipo}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export async function ProcesosComponent(
  {
    llaveProceso, index
  }: {llaveProceso: string; index: number}
) {


  const procesos = await getProceso(
    llaveProceso, index
  );

  if ( !procesos || procesos.length === 0 ) {
    return null;
  }

  return (
    <>
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
    </>
  );
}
