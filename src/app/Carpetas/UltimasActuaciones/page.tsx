import { Card } from 'components/Card';
import { Loader } from '#@/components/Loader';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { Suspense } from 'react';
import { FechaActuacionComponent } from './actuaciones';

export const dynamic = 'force-dynamic';

export const dynamicParams = true;

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
    <><Suspense fallback={ <Loader /> }>

      {carpetas.map(
        (
          carpeta, index
        ) => {
          return (
            <Card
              path={'/Carpeta'}
              carpeta={carpeta}
              key={carpeta._id}
            >
              <Suspense fallback={<Loader />}>
                {carpeta.idProcesos
                && carpeta.idProcesos.map(
                  (
                    idProceso
                  ) => {
                    return (
                      <FechaActuacionComponent
                        initialOpenState={ false }
                        idProceso={ idProceso }
                        key={ idProceso }
                        index={ index } />
                    );
                  }
                )}
              </Suspense>


            </Card>
          );
        }
      )}
    </Suspense>
    </>
  );
}
