import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import { ProcesoCard } from '#@/components/Proceso/server-components';
import { getProceso } from '#@/lib/Procesos';
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

export default async function Page(
  {
    params
  }: { params: { numero: string } }
) {
  const carpeta = await getCarpetabyNumero(
    Number(
      params.numero
    )
  );

  if ( !carpeta || !carpeta.llaveProceso ) {
    return notFound();
  }

  const consultaProcesos = await getProceso(
    carpeta.llaveProceso, Number(
      params.numero
    )
  );

  if ( !consultaProcesos ) {
    return notFound();
  }

  return (
    <>
      {consultaProcesos.map(
        (
          proceso
        ) => {
          return (
            <Fragment key={proceso.idProceso}>
              <ProcesoCard
                key={proceso.idProceso}
                proceso={proceso}
              />
              <FechaActuacionComponent
                idProceso={proceso.idProceso}
                index={carpeta.numero}
                initialOpenState={true}
              />
            </Fragment>
          );
        }
      )}
    </>
  );
}
