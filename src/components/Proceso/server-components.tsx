import styles from './procesos.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import Link from 'next/link';
import type { Route } from 'next';
import { outProceso } from 'types/procesos';
import { fixDemandado, fixFechas } from '#@/lib/project/helper';
import { getProceso } from '#@/lib/project/utils/Procesos';

export const ProcesoCard = (
  {
    proceso 
  }: { proceso: outProceso } 
) => {
          const {
            idProceso,
            llaveProceso,
            sujetosProcesales,
            despacho,
            esPrivado,
            fechaUltimaActuacion,
            juzgado,
          } = proceso;

          if ( esPrivado ) {
            return null;
          }

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
                <h1 className={typography.titleMedium}>
                  {JSON.stringify(
                    `{${ sujetosReplacer }}`, null, 2 
                  )}
                </h1>
                <Link
                  className={styles.button}
                  href={`/Carpetas/Expediente/${ llaveProceso }/${ idProceso }`}
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
                    href={juzgado.url as Route}
                    target={'_blank'}
                  >
                    <span className={typography.labelLarge}>
                      {juzgado.id.toString()}
                    </span>
                    <span className={typography.bodySmall}>{juzgado.tipo}</span>
                  </Link>
                )}
              </div>
            </div>
          );
};

export async function ProcesosComponent(
  {
    llaveProceso,
  }: {
    llaveProceso: string;
  } 
) {
      const procesos = await getProceso(
        llaveProceso 
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
