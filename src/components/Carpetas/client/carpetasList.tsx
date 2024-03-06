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
import { useRouter } from 'next/navigation';

export function CarpetasList () {
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

      const router = useRouter();

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

                          { ultimaActuacion
                            ? (
                                <td onClick={ () => {
                                          return router.push(
                                            `/Carpeta/${ numero }/ultimasActuaciones/${ ultimaActuacion.idProceso }` as Route
                                          );
                                }}>
                                  <h2 className={ typography.titleMedium }>
                                    {ultimaActuacion.actuacion}
                                  </h2>
                                  {ultimaActuacion.anotacion && (
                                    <span className={typography.labelSmall}>
                                      {ultimaActuacion.anotacion}
                                    </span>
                                  )}
                                </td> )
                            : (
                                <td>
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
                                </td>
                              )
                          }

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