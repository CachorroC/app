import { MonCarpeta } from '#@/lib/types/carpetas';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import type { Route } from 'next';
import layout from '#@/styles/layout.module.css';
import { inputElement, slider, switchBox } from '../Form/form.module.css';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { CopyButton } from '../Buttons/copy-buttons';
import { fixMoney } from '#@/lib/project/helper';
import { RevisadoCheckBox } from '#@/app/Carpetas/revisado-checkbox';

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
            contentIdProcesos = <span>no hay idProcesos</span>;
          } else {
            contentIdProcesos = idProcesos.map(
              (
                idProceso
              ) => {
                        return (
                          <Link
                            key={idProceso}
                            href={
                              `/Carpeta/${ String(
                                numero
                              ) }/ultimasActuaciones/${ String(
                                idProceso
                              ) }` as Route
                            }
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

export const CardRow = (
  {
    carpeta,
    children,
  }: {
    carpeta: MonCarpeta;
    children: ReactNode;
  }
) => {

          const llaveLength = carpeta.llaveProceso?.length;

          const errorLLaveProceso = llaveLength
            ? llaveLength < 23
            : true;

          const {
            numero, idProcesos, revisado
          } = carpeta;

          const idProcesosLength = idProcesos.length;
          let carpetaHref;

          if ( idProcesosLength > 1 ) {
            carpetaHref = idProcesos.map(
              (
                idProceso, index
              ) => {
                        return (
                          <Link key={ idProceso }
                            href={`/Carpeta/${ carpeta.numero }/ultimasActuaciones/${ idProceso }`}
                          >
                            <span className={`${ typography.labelLarge } ${ layout.text }`}>
                              {`#${ numero } - ${ index }`}
                            </span>
                            <span className={`material-symbols-outlined ${ layout.icon }`}>
            folder
                            </span>
                          </Link> );
              }
            );
          } else if ( idProcesosLength === 1 ) {
            carpetaHref = (
              <Link key={ idProcesos[ 0 ] }
                href={`/Carpeta/${ carpeta.numero }/ultimasActuaciones/${ idProcesos[ 0 ] }`}
              >
                <span className={`${ typography.labelLarge } ${ layout.text }`}>
                  {`#${ numero }`}
                </span>
                <span className={`material-symbols-outlined ${ layout.icon }`}>
            folder
                </span>
              </Link>
            );
          } else {
            carpetaHref = (
              <Link key={ numero }
                href={`/Carpeta/${ numero }`}
              >
                <span className={`${ typography.labelLarge } ${ layout.text }`}>
                  {`#${ numero }`}
                </span>
                <span className={`material-symbols-outlined ${ layout.icon }`}>
            folder
                </span>
              </Link>
            );
          }


          return (
            <tr>
              <td>
                {carpetaHref}
              </td>

              <td>
                <Link
                  href={carpetaHref as Route}
                  className={typography.titleMedium}
                >
                  {carpeta.nombre}
                </Link>
              </td>

              <td>{carpeta.tipoProceso}</td>
              <td>
                {' '}
                <label className={switchBox}>
                  <input
                    className={inputElement}
                    defaultChecked={carpeta.terminado}
                    type="checkbox"
                  />
                  <span className={slider}></span>
                </label>
              </td>

              <td>{OutputDateHelper(
                carpeta.fecha
              )}</td>
              <td>
                <CopyButton
                  copyTxt={carpeta.llaveProceso}
                  name={'expediente'}
                />
              </td>
              <td>{ carpeta.category }</td>

              <td>
                {carpeta.demanda?.capitalAdeudado
          && fixMoney(
            {
              valor: Number(
                carpeta.demanda.capitalAdeudado
              ),
            }
          )}
              </td>

              {errorLLaveProceso
                ? ( <td>
                    <Link
                      href={`/Carpeta/${ numero }/Editar` as Route}
                      className={styles.link}
                    >
                      {'error con el numero de expediente'}
                    </Link>
                  </td>
                  )
                : children }
              <RevisadoCheckBox numero={ numero } initialRevisadoState={ revisado } />


            </tr>
          );
};
