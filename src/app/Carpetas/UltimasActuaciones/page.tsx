import { Card } from 'components/Card';
import { Loader } from '#@/components/Loader';
import getCarpetas from '#@/lib/project/getCarpetas';
import { Suspense } from 'react';
import { FechaActuacionComponent } from './actuaciones';
import { ActionName, carpetasSorter } from '#@/lib/project/sortert';
import { MonCarpeta } from '#@/lib/types/carpetas';

export const dynamic = 'force-dynamic';

export const dynamicParams = true;


export default async function Page(
  {
    searchParams
  }:{  searchParams: { [key: string]: string | string[] | undefined }}
) {
  const carpetasRaw = await getCarpetas();
  let carpetas : MonCarpeta[];

  const {
    sort
  } = searchParams;

  if ( sort ) {
    if ( Array.isArray(
      sort
    ) ) {
      const [
        firstSorter,
        secondSorter,
        thirdSorter,
        ...restSorters
      ] = sort;

      carpetas = carpetasSorter(
        carpetasRaw, {
          type         : 'sort',
          name         : firstSorter as ActionName,
          sortDirection: false
        }
      );
    }

    console.log(
      sort
    );
  }
  /*
  carpetas = [
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
  ); */

  return (
    <><Suspense fallback={<Loader />}>

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
