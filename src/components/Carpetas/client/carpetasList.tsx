'use client';
import { useCarpetaSort } from '#@/app/Context/carpetas-sort-context';
import { Card, } from '#@/components/Card';
import { useSearch } from '#@/app/Context/search-context';
import { JSX } from 'react';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { useCategory } from '#@/app/Context/category-context';
import typography from '#@/styles/fonts/typography.module.css';
import { ClientCardRow } from '#@/components/Card/client-card';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { Route } from 'next';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { RevisadoCheckBox } from '#@/app/Carpetas/revisado-checkbox';
import Link from 'next/link';

export function CarpetasList() {
      const rows: JSX.Element[] = [];

      const {
        carpetas
      } = useCarpetaSort();

      const {
        search
      } = useSearch();

      const {
        currentCategory
      } = useCategory();
      carpetas.forEach(
        (
          proceso
        ) => {
                  const {
                    ultimaActuacion
                  } = proceso;

                  if ( proceso.nombre.toLowerCase()
                        .indexOf(
                          search.toLowerCase()
                        ) === -1 ) {
                    return;
                  }

                  if ( currentCategory === 'todos' || currentCategory === proceso.category ) {
                    rows.push(
                      <Card
                        key={proceso.numero}
                        carpeta={proceso}
                      >
                        {ultimaActuacion && (
                          <ActuacionComponent
                            key={ultimaActuacion.idProceso}
                            incomingActuacion={ultimaActuacion}
                          />
                        )}
                      </Card>,
                    );
                  }
        }
      );

      return <>{rows}</>;
}


export function CarpetasTable() {
      const {
        carpetas,
      } = useCarpetaSort();

      return (
        <>
          { carpetas.map(
            (
              carpeta
            ) => {
                      const {
                        ultimaActuacion, numero, nombre, fecha, category, llaveProceso, revisado,
                      } = carpeta;
                      return (
                        <ClientCardRow
                          key={numero }
                          rowHref={`/Carpeta/${ numero }` as Route}
                          carpeta={carpeta}
                        >
                          <td>{nombre.normalize(
                            'NFD'
                          )
                                .trim()
                                .toLocaleLowerCase()}</td>
                          <td>{OutputDateHelper(
                            fecha
                          )}</td>
                          <td>{category}</td>
                          <td>
                            { ultimaActuacion
                              ? (
                                  <>
                                    <Link className={ typography.titleMedium } href={ `/Carpeta/${ numero }/ultimasActuaciones/${ ultimaActuacion.idProceso }` as Route }>
                                      {ultimaActuacion.actuacion}
                                    </Link>
                                    {ultimaActuacion.anotacion && (
                                      <span className={typography.labelSmall}>
                                        {ultimaActuacion.anotacion}
                                      </span>
                                    )}
                                  </> )
                              : (
                                  <>
                                    <h5 className={typography.headlineSmall} style={{
                                      backgroundColor: 'var(--error-container)',
                                      color          : 'var(--on-error-container)',
                                      borderBottom   : 'solud 0.2rem var(--error)'
                                    } }>
                                  Sin actuaciones
                                    </h5>
                                    <span className={typography.labelSmall}>
                                  Esta carpeta no tiene registros en la Rama Judicial
                                    </span>
                                  </>
                                )
                            }
                          </td>
                          <td>
                            <RevisadoCheckBox
                              numero={numero}
                              initialRevisadoState={revisado}
                            />
                          </td>
                          <td>
                            <CopyButton
                              copyTxt={llaveProceso}
                              name={'expediente'}
                            />
                          </td>
                        </ClientCardRow>
                      );
            }
          ) }

        </> );
}

export function CompleteCarpetasRows () {
      const {
        completeCarpetas 
      } = useCarpetaSort();
      return ( <>
        { completeCarpetas.map(
          (
            carpeta, index
          ) => {
                    return (
                      <pre key={index}>{JSON.stringify(
                        carpeta, null, 2
                      )}</pre>
                    );
          }
        ) }
      </> );
}
/*
export function CarpetasTable(
  {
    actuacionPromises
  }: {actuacionPromises: [number, Promise<RequestActuacion>][]}
) {
      const mapActuaciones = new Map(
        actuacionPromises
      );

      const carpetasReduced = useCarpetaSort();

      return <>

        { carpetasReduced.map(
          (
            carpeta
          ) => {
                    const {
                      ultimaActuacion, numero, nombre, fecha, category, llaveProceso, revisado, idProcesos
                    } = carpeta;
                    return (
                      <ClientCardRow
                        key={numero }
                        rowHref={`/Carpeta/${ numero }` as Route}
                        carpeta={carpeta}
                      >
                        <td>{numero}</td>
                        <td>{nombre}</td>
                        <td>{OutputDateHelper(
                          fecha
                        )}</td>
                        <td>{category}</td>

                        <td>
                          <CopyButton
                            copyTxt={llaveProceso}
                            name={'expediente'}
                          />
                        </td>
                        <td>
                          { ultimaActuacion
                            ? (
                                <>
                                  <h5 className={typography.titleMedium}>
                                    {ultimaActuacion.actuacion}
                                  </h5>
                                  {ultimaActuacion.anotacion && (
                                    <span className={typography.labelSmall}>
                                      {ultimaActuacion.anotacion}
                                    </span>
                                  )}
                                </> )
                            : (
                                <>
                                  <h5 className={typography.headlineSmall} style={{
                                    backgroundColor: 'var(--error-container)',
                                    color          : 'var(--on-error-container)',
                                    borderBottom   : 'solud 0.2rem var(--error)'
                                  }}>
                                Sin actuaciones
                                  </h5>
                                  <span className={typography.labelSmall}>
                                  Esta carpeta no tiene registros en la Rama Judicial
                                  </span>
                                </>
                              )
                          }
                          { idProcesos.map(
                            (
                              idProceso
                            ) => {
                                      let contentId;

                                      const actuacionById = mapActuaciones.get(
                                        idProceso
                                      );

                                      if ( actuacionById ) {
                                        const actuacion = use(
                                          actuacionById
                                        );
                                        contentId = actuacion.Message;
                                      } else {
                                        contentId = 'sin request';
                                      }

                                      return (
                                        <>{contentId}</>
                                      );
                            }
                          )}

                        </td>
                        <td>
                          <RevisadoCheckBox
                            numero={numero}
                            initialRevisadoState={revisado}
                          />
                        </td>
                      </ClientCardRow>
                    );
          }
        )}</>;
}
 */