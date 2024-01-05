import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';
import { FechaActuacionComponentAlt } from './actuaciones';
import { CarpetaUltimaActuacionRow } from '#@/components/Table/row';
import { Loader } from '#@/components/Loader';
import { Suspense } from 'react';

export default async function Page() {
      const carpetasRaw = await getCarpetas();

      const carpetas = [ ...carpetasRaw ].sort(
        (
          a, b
        ) => {
                  if ( !a.fecha || a.fecha.toString() === 'Invalid Date' ) {
                    return -1;
                  }

                  if ( !b.fecha || b.fecha.toString() === 'Invalid Date' ) {
                    return 1;
                  }

                  const x = a.fecha;

                  const y = b.fecha;

                  if ( x < y ) {
                    return -1;
                  }

                  if ( x > y ) {
                    return 1;
                  }

                  return 0;
        }
      );
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
                              <td>sin actuacion</td>
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
                                        <Suspense fallback={<Loader />}>
                                          <FechaActuacionComponentAlt
                                            idProceso={idProceso}
                                            index={index}
                                            initialOpenState={false}
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
