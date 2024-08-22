import { Loader } from '#@/components/Loader/main-loader';
import { ProcesoDetalleComponent } from '#@/components/Proceso/proceso-detalles-component';
import SujetosProcesales from '#@/components/Proceso/sujetos-procesales';
import { getProcesosByllaveProceso } from '#@/lib/project/utils/Procesos';
import { Fragment, Suspense } from 'react';

export default async function Page(
  {
    params,
  }: {
  params: { llaveProceso: string };
}
) {
  const procesos = await getProcesosByllaveProceso(
    params.llaveProceso
  );
  return (
    <>
      {procesos.map(
        (
          proceso,
        ) => {
          return (
            <Fragment key={proceso.idProceso}>
              <SujetosProcesales
                sujetosProcesalesRaw={proceso.sujetosProcesales}
              />

              <Suspense fallback={<Loader />}>
                <ProcesoDetalleComponent
                  key={proceso.idProceso}
                  idProceso={proceso.idProceso}
                />
              </Suspense>
            </Fragment>
          );
        }
      )}
    </>
  );
}
