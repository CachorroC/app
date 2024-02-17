'use client';
import { useCarpetaSort } from '#@/app/Context/carpetas-sort-context';
import { Card, CardRow } from '#@/components/Card';
import { useSearch } from '#@/app/Context/search-context';
import { JSX } from 'react';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { useCategory } from '#@/app/Context/category-context';
import typography from '#@/styles/fonts/typography.module.css';

export function CarpetasList() {
      const rows: JSX.Element[] = [];

      const carpetasReduced = useCarpetaSort();

      const {
        search
      } = useSearch();

      const {
        currentCategory
      } = useCategory();
      carpetasReduced.forEach(
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

      const carpetasReduced = useCarpetaSort();



      return <>{carpetasReduced.map(
        (
          carpeta
        ) => {
                  const {
                    ultimaActuacion
                  } = carpeta;
                  return (
                    <CardRow
                      key={carpeta.numero}
                      carpeta={carpeta}
                    >
                      { ultimaActuacion
                        ? (
                            <td>
                              <h5 className={typography.titleMedium}>
                                {ultimaActuacion.actuacion}
                              </h5>
                              {ultimaActuacion.anotacion && (
                                <span className={typography.labelSmall}>
                                  {ultimaActuacion.anotacion}
                                </span>
                              )}
                            </td> )
                        : (
                            <td>
                              <h5 className={typography.headlineSmall}>
                               Sin actuaciones
                              </h5>
                              <span className={typography.labelSmall}>
                                  Esta carpeta no tiene registros en la Rama Judicial
                              </span>
                            </td>
                          )
                      }
                    </CardRow>
                  );
        }
      )}</>;
}
