import {  Card } from 'components/Card';
import { Loader } from '#@/components/Loader';
import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';
import { Suspense } from 'react';
import { FechaActuacionComponent } from './actuaciones';
import { SearchOutputListSkeleton } from '#@/components/layout/search/SearchProcesosOutputSkeleton';

export default async function Page() {
      const carpetasRaw = await getCarpetas();

      const carpetas = [
        ...carpetasRaw
      ].sort(
        (
          a, b
        ) => {
                  if ( !a.fecha || a.fecha === undefined ) {
                    return 1;
                  }

                  if ( !b.fecha || b.fecha === undefined ) {
                    return -1;
                  }

                  const x = a.fecha;

                  const y = b.fecha;


                  if ( x < y ) {
                    return 1;
                  }

                  if ( x > y ) {
                    return -1;
                  }

                  return 0;
        }
      );

      return (
        <>
          <Suspense fallback={ <SearchOutputListSkeleton /> }>

            {carpetas.map(
              (
                carpeta, index
              ) => {
                        const {
                          idProcesos, numero
                        } = carpeta;
                        return (
                          <Card

                            carpeta={carpeta }
                            key={numero}
                          >
                            <Suspense fallback={<Loader />}>
                              {idProcesos
                && idProcesos.map(
                  (
                    idProceso
                  ) => {
                            return (
                              <FechaActuacionComponent
                                index={index}
                                initialOpenState={ false }
                                idProceso={ idProceso }
                                key={ idProceso } />
                            );
                  }
                )
                              }
                            </Suspense>
                          </Card>
                        );
              }
            )
            }
          </Suspense>
        </>
      );
}
