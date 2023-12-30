import { MonCarpeta } from '#@/lib/types/carpetas';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import type { Route } from 'next';
import layout from '#@/styles/layout.module.css';

export const Card = (
  {
    carpeta,
    children,
  }: {
    carpeta: MonCarpeta;
    children: ReactNode;
  }
) => {
          let contentIdProcesos;

          const llaveLength = carpeta.llaveProceso?.length;

          const errorLLaveProceso = llaveLength
            ? llaveLength < 23
            : true;

          const {
            idProcesos, nombre, numero
          } = carpeta;

          if ( !idProcesos || idProcesos.length === 0 ) {
            console.log(
              'no hay idProcesos'
            );
          } else {
            contentIdProcesos = idProcesos.map(
              (
                idProceso
              ) => {
                        return (
                          <Link
                            key={idProceso}
                            href={`/Carpeta/${ String(
                              numero
                            ) }/ultimasActuaciones/${ String(
                              idProceso,
                            ) }` as Route}
                            className={styles.link}
                          >
                            <span className={`material-symbols-outlined ${ styles.icon }`}>
            inventory
                            </span>
                          </Link>
                        );
              }
            );
          }

          return (
            <div className={styles.container}>
              <div
                className={`${ styles.card } ${
                  errorLLaveProceso && styles.errorContainer
                }`}
              >
                <section className={layout.sectionRow}>
                  <h4 className={typography.titleMedium}>{nombre}</h4>
                  <Link
                    className={styles.link}
                    href={`/Carpeta/${ numero }` as Route}
                  >
                    <span className={`${ typography.labelLarge } ${ layout.text }`}>
                      {numero.toString()}
                    </span>
                    <span className={`material-symbols-outlined ${ layout.icon }`}>
              folder
                    </span>
                  </Link>
                </section>
                {children}
                <div className={layout.segmentRow}>{contentIdProcesos}</div>

                <div className={styles.links}>
                  {errorLLaveProceso && (
                    <Link
                      href={`/Carpeta/${ numero }/Editar` as Route}
                      className={styles.link}
                    >
                      {'error con el numero de expediente'}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
};
