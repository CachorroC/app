import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';
import { FechaActuacionComponentAlt } from './actuaciones';
import { Suspense } from 'react';
import ActuacionLoader from '#@/components/Card/actuacion-loader';
import typography from '#@/styles/fonts/typography.module.css';
import styles from '#@/components/Card/card.module.css';
import { ClientCardRow } from '#@/components/Card/client-card';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { RevisadoCheckBox } from '../revisado-checkbox';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { Route } from 'next';


export default async function Page() {
      const carpetas = await getCarpetas();

      return (
        <table>
          <thead>
            <tr>
              <th style={{
                width: '20%'
              }}>nombre</th>
              <th>numero</th>
              <th>Expedienter</th>
              <th>categoria</th>
              <th>fecha de la última actuacion</th>
              <th>ultima Actuacion</th>
              <th>Revisado</th>
            </tr>
          </thead>
          <tbody>
            {carpetas.flatMap(
              (
                carpeta, index
              ) => {
                        const {
                          idProcesos, numero, nombre, fecha, llaveProceso, category, revisado
                        } = carpeta;

                        if ( idProcesos.length === 0 ) {
                          return (
                            <ClientCardRow
                              rowHref={`/Carpeta/${ numero }`}
                              carpeta={carpeta}
                              key={numero}
                            >
                              <td>{ nombre }</td>
                              <td>{ numero }</td>
                              <td>
                                <CopyButton
                                  copyTxt={llaveProceso}
                                  name={'expediente'}
                                />
                              </td>
                              <td>{ category }</td>
                              <td>
                                {OutputDateHelper(
                                  fecha
                                )}
                              </td>
                              <td>
                                <h5
                                  className={` ${ styles.actuacion } ${ typography.titleSmall }`}
                                >
                    Sin idProceso
                                </h5>
                                <sub className={typography.labelSmall}>0 de 0</sub>
                                <sub className={typography.labelMedium}>
                    por favor revise que el numero de expediente esté bien o si
                    la informacion la brinda el juzgado por otro canal
                                </sub>
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

                        return idProcesos.map(
                          (
                            idProceso
                          ) => {

                                    const {
                                      numero, revisado, nombre
                                    } = carpeta;


                                    return (
                                      <ClientCardRow
                                        key={ idProceso }
                                        rowHref={`/Carpeta/${ numero }/ultimasActuaciones/${ idProceso }` as Route}
                                        carpeta={carpeta}
                                      >
                                        <td>{numero}</td>
                                        <td>{nombre}</td>
                                        <td>{OutputDateHelper(
                                          carpeta.fecha
                                        )}</td>
                                        <td>{carpeta.category}</td>

                                        <td>
                                          <CopyButton
                                            copyTxt={carpeta.llaveProceso}
                                            name={'expediente'}
                                          />
                                        </td>
                                        <td>
                                          <Suspense fallback={<ActuacionLoader />}>
                                            <FechaActuacionComponentAlt
                                              idProceso={idProceso}
                                              index={index}
                                              key={idProceso}
                                            />
                                          </Suspense>
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
                        );
              }
            )
            }
          </tbody>
        </table>
      );
}
