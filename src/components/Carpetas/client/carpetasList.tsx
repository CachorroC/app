'use client';
import { useCarpetaSort } from '#@/app/Context/carpetas-sort-context';
import {  Suspense, useDeferredValue } from 'react';
import { ClientCardRow } from '#@/components/Card/client-card';
import { Route } from 'next';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { RevisadoCheckBox } from '#@/app/Carpetas/revisado-checkbox';
import { Loader } from '#@/components/Loader/main-loader';
import { TableRowCarpetaSortingButton } from './carpetasButtonsSort';
import { ActuacionTableComponent, ActuacionTableErrorComponent } from '#@/components/Actuaciones/actuacion-table-component';

export function CarpetasTable() {
      const {
        carpetas,
      } = useCarpetaSort();

      const deferredCarpetas = useDeferredValue(
        carpetas
      );



      return (
        <table>
          <thead>
            <tr>
              <Suspense fallback={<Loader />}>
                <TableRowCarpetaSortingButton sortKey={ 'numero' } />
              </Suspense>
              <Suspense fallback={<Loader/>}>
                <TableRowCarpetaSortingButton sortKey={ 'nombre' } />
              </Suspense>
              <Suspense fallback={<Loader/>}>
                <TableRowCarpetaSortingButton sortKey={ 'category' } />
              </Suspense>
              <th>Actuaciones</th>
              <th>Revisado</th>
              <th>expediente</th>
              <th>Fecha de ultima revision</th>
              <th>ciudad</th>
            </tr>
          </thead>
          <tbody>
            { deferredCarpetas.flatMap(
              (
                carpeta
              ) => {
                        const {
                          ultimaActuacion, numero, nombre,  category, llaveProceso, revisado,
                        } = carpeta;

                        let words = nombre.split(
                          ' '
                        )
                              .map(
                                (
                                  palabra
                                ) => {


                                          return palabra.charAt(
                                            0
                                          )
                                                .toUpperCase() + palabra.toLowerCase()
                                                .substring(
                                                  1
                                                );
                                }
                              );


                        return (
                          <ClientCardRow
                            key={numero }
                            rowHref={`/Carpeta/${ numero }` as Route}
                            carpeta={carpeta}
                          >
                            <td>{words.join(
                              ' '
                            )}</td>

                            <td>{category}</td>

                            { ultimaActuacion
                              ? <ActuacionTableComponent numero={ numero } title={ ultimaActuacion.actuacion } content={ ultimaActuacion.anotacion } idProceso={ ultimaActuacion.idProceso}/>
                              : <ActuacionTableErrorComponent/>
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
                            <td>{ carpeta.fechaUltimaRevision?.toLocaleString() ?? 'no hay fecha ultima revision ' }</td>
                            <td>{carpeta.demanda.municipio}</td>
                          </ClientCardRow>
                        );
              }
            )
            }

          </tbody>
        </table>
      );
}
