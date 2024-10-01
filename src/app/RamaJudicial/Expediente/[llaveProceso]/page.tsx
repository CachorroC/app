import { Loader } from '#@/components/Loader/main-loader';
import { ProcesoDetalle } from '#@/components/Proceso/server-components';
import SujetosProcesales from '#@/components/Proceso/sujetos-procesales';
import { getProcesosByllaveProceso } from '#@/lib/project/utils/Procesos/procesos';
import { Fragment, Suspense } from 'react';

export default async function Page( {
  params,
}: {
  params: { llaveProceso: string };
} ) {
  const procesos = await getProcesosByllaveProceso( params.llaveProceso );

  return (
    <>
      {procesos.map( ( proceso ) => {
        return (
          <Fragment key={proceso.idProceso}>
            <SujetosProcesales
              sujetosProcesalesRaw={proceso.sujetosProcesales}
            />

            <Suspense fallback={<Loader />}>
              <ProcesoDetalle
                key={proceso.idProceso}
                idProceso={proceso.idProceso}
              />
            </Suspense>
          </Fragment>
        );
      } )}
    </>
  );
}
