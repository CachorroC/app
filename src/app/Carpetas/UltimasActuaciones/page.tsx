import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';
import { FechaActuacionComponentAlt } from './actuaciones';
import { CarpetaUltimaActuacionRow } from '#@/components/Table/row';
import { Suspense } from 'react';
import ActuacionLoader from '#@/components/Card/actuacion-loader';
import typography from '#@/styles/fonts/typography.module.css';
import styles from '#@/components/Card/card.module.css';

export default async function Page() {
      const carpetas = await getCarpetas();

      return (
        <table>
          <thead>
            <tr>
              <th>nombre</th>
              <th>numero</th>
              <th>revisado</th>
              <th>tipo de proceso</th>
              <th>terminado</th>
              <th>fecha de la última actuacion</th>
              <th>numero de expediente para copiar</th>
              <th>categoria</th>
              <th>ultima actuacion</th>
              <th>anotacion</th>
            </tr>
          </thead>
          <tbody>
            {carpetas.flatMap(
              (
                carpeta, index 
              ) => {
                        const {
                          idProcesos, numero 
                        } = carpeta;

                        if ( idProcesos.length === 0 ) {
                          return (
                            <CarpetaUltimaActuacionRow
                              carpeta={carpeta}
                              key={numero}
                            >
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
                            </CarpetaUltimaActuacionRow>
                          );
                        }

                        return idProcesos.map(
                          (
                            idProceso 
                          ) => {
                                    return (
                                      <CarpetaUltimaActuacionRow
                                        key={idProceso}
                                        carpeta={carpeta}
                                      >
                                        <Suspense fallback={<ActuacionLoader />}>
                                          <FechaActuacionComponentAlt
                                            idProceso={idProceso}
                                            index={index}
                                          />
                                        </Suspense>
                                      </CarpetaUltimaActuacionRow>
                                    );
                          } 
                        );
              } 
            )}
          </tbody>
        </table>
      );
}
