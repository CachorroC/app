import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';
import { FechaActuacionComponentAlt } from './actuaciones';
import { Suspense } from 'react';
import ActuacionLoader from '#@/components/Card/actuacion-loader';
import typography from '#@/styles/fonts/typography.module.css';
import styles from '#@/components/Card/card.module.css';
import { ClientCardRow } from '#@/components/Card/client-card';
import Link from 'next/link';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { RevisadoCheckBox } from '../revisado-checkbox';
import { CopyButton } from '#@/components/Buttons/copy-buttons';

export default async function Page() {
      const carpetas = await getCarpetas();

      return (
        <table>
          <thead>
            <tr>
              <th>nombre</th>
              <th>numero</th>
              <th>fecha de la última actuacion</th>
              <th>numero de expediente para copiar</th>
              <th>categoria</th>
              <th>ultima actuacion</th>
              <th>anotacion</th>
              <th>Revisado</th>
            </tr>
          </thead>
          <tbody>
            {carpetas.flatMap(
              (
                carpeta, index
              ) => {
                        const {
                          idProcesos, numero, nombre
                        } = carpeta;

                        if ( idProcesos.length === 0 ) {
                          return (
                            <ClientCardRow
                              carpeta={carpeta}
                              key={numero}
                            >
                              <td>{ nombre }</td>
                              <td><Link href={`/Carpeta/${ numero }`}>{ numero }</Link></td>

                              <td>
                                <h5
                                  className={` ${ styles.actuacion } ${ typography.titleSmall }`}
                                >
                    Sin registro
                                </h5>
                                <sub className={typography.labelSmall}>0 de 0</sub>
                              </td>
                              <td>
                                <sub className={typography.headlineMedium}>
                    por favor revise que el numero de expediente esté bien o si
                    la informacion la brinda el juzgado por otro canal
                                </sub>
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
                                        key={idProceso}
                                        carpeta={carpeta}
                                      >
                                        <td>{nombre}</td>
                                        <td>
                                          {
                                            <Link
                                              href={`/Carpeta/${ numero }/ultimasActuaciones/${ idProceso }`}
                                              className={typography.titleSmall}
                                            >
                                              {  numero}
                                            </Link>
                                          }
                                        </td>
                                        <td>{OutputDateHelper(
                                          carpeta.fecha
                                        )}</td>

                                        <td>{carpeta.category}</td>






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
                                        <Suspense fallback={<ActuacionLoader />}>
                                          <FechaActuacionComponentAlt
                                            idProceso={idProceso}
                                            index={index}
                                            key={idProceso}
                                          />
                                        </Suspense>
                                      </ClientCardRow>
                                    );
                          }
                        );
              }
            )}
          </tbody>
        </table>
      );
}
