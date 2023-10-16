import { Card } from '#@/components/Card';
import getCarpetas from '#@/lib/project/getCarpetas';
import { Suspense } from 'react';
import { FechaActuacionComponent } from '../UltimasActuaciones/actuaciones';
import { Loader } from '#@/components/Loader';
import { CategoryCarpetasReducer } from '#@/app/hooks/useCategoryFilterHook';
import { Category } from '#@/lib/types/carpetas';

export default async function Page(
  {
    params,
  }: {
  params: { categoria: string };
}
) {
  const carpetasRaw = await getCarpetas();

  const ncarps = CategoryCarpetasReducer(
    carpetasRaw, {
      type: params.categoria as Category
    }
  );
  /*
  const ncarps = [
    ...carpetasRaw
  ].filter(
    (
      carpeta
    ) => {
      return carpeta.category === params.categoria;
    }
  );
 */
  return (
    <>
      {ncarps.map(
        (
          carpeta, index
        ) => {
          return (
            <Card
              key={carpeta._id}
              path={'/Carpeta'}
              carpeta={carpeta}
            >
              <Suspense fallback={<Loader />}>
                {carpeta.idProcesos?.map(
                  (
                    idProceso
                  ) => {
                    return (
                      <FechaActuacionComponent
                        initialOpenState={false}
                        idProceso={idProceso}
                        index={index}
                        key={idProceso}
                      />
                    );
                  }
                )}
              </Suspense>
            </Card>
          );
        }
      )}
    </>
  );
}
