'use client';

import { RevisadoCheckBox } from '#@/app/Carpetas/revisado-checkbox';
import { useSearch } from '#@/app/Context/search-context';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { Route } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';
import { CopyButton } from '../Buttons/copy-buttons';
import styles from './card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';

export const ClientCardRow = (
  {
    carpeta,
    children,
  }: {
    carpeta: IntCarpeta;
    children: ReactNode;
  }
) => {

          const {
            search
          } = useSearch();

          if ( search !== '' && carpeta.nombre.toLowerCase()
                .lastIndexOf(
                  search.toLowerCase()
                ) === -1 ) {
            return null;
          }

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
                          <Link
                            key={idProceso}
                            href={
                              `/Carpeta/${ carpeta.numero }/ultimasActuaciones/${ idProceso }` as Route
                            }
                          >
                            <span className={`${ typography.labelLarge } ${ layout.text }`}>
                              {`#${ numero } - ${ index }`}
                            </span>
                          </Link>
                        );
              }
            );
          } else if ( idProcesosLength === 1 ) {
            carpetaHref = (
              <Link
                key={idProcesos[ 0 ]}
                href={
                  `/Carpeta/${ carpeta.numero }/ultimasActuaciones/${ idProcesos[ 0 ] }` as Route
                }
              >
                <span className={`${ typography.labelLarge } ${ layout.text }`}>
                  {`#${ numero }`}
                </span>
              </Link>
            );
          } else {
            carpetaHref = (
              <Link
                key={numero}
                href={`/Carpeta/${ numero }`}
              >
                <span className={`${ typography.labelLarge } ${ layout.text }`}>
                  {`#${ numero }`}
                </span>
              </Link>
            );
          }

          return (
            <tr>
              <td>{carpetaHref}</td>
              <td>
                {
                  <Link
                    href={`/Carpeta/${ numero }`}
                    className={typography.titleSmall}
                  >
                    {carpeta.nombre.toLocaleLowerCase()}
                  </Link>
                }
              </td>
              <td>{OutputDateHelper(
                carpeta.fecha
              )}</td>

              <td>{carpeta.category}</td>
              {errorLLaveProceso
                ? (
                    <>
                      <td>
                        <Link
                          href={`/Carpeta/${ numero }/Editar` as Route}
                          className={styles.link}
                        >
                          {'error con el numero de expediente'}
                        </Link>
                      </td>
                      <td>Sin anotaciones</td>
                    </>
                  )
                : (
                    children
                  )}
              <RevisadoCheckBox
                numero={numero}
                initialRevisadoState={revisado}
              />
              <td>
                <CopyButton
                  copyTxt={carpeta.llaveProceso}
                  name={'expediente'}
                />
              </td>
            </tr>
          );
};