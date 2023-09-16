import { Card } from '../../components/Card';
import { Loader } from '#@/components/Loader';
import getCarpetas from '#@/lib/project/getCarpetas';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { FechaActuacionComponent } from 'components/Actuacion/server-components';

export const dynamic = 'force-dynamic';

export const dynamicParams = true;

export const metadata: Metadata = {
  title: 'Procesos',
};

export default async function RightProcesos() {
  const carpetasRaw = await getCarpetas();

  const carpetas = [
    ...carpetasRaw
  ].sort(
    (
      a, b
    ) => {
      const typeofA = typeof a.fecha;

      const typeofB = typeof b.fecha;

      if ( !a.fecha || a.fecha === undefined ) {
        return 1;
      }

      if ( !b.fecha || b.fecha === undefined ) {
        return -1;
      }

      const x = a.fecha.toISOString();

      const y = b.fecha.toISOString();

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

      {carpetas.map(
        (
          carpeta, index
        ) => {
          const {
            deudor
          } = carpeta;

          return (
            <Card path={'/Procesos'} carpeta={carpeta} key={carpeta._id}>
              <Suspense fallback={<Loader key={carpeta._id} />}>
                <FechaActuacionComponent
                  carpeta={carpeta}
                  key={carpeta._id}
                  index={index}
                />
              </Suspense>
            </Card>
          );
        }
      )}

    </>
  );
}
