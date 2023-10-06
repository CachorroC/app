
import { Loader } from '#@/components/Loader';
import { getCarpetaByllaveProceso, } from '#@/lib/project/carpetas';
import { Fragment, Suspense } from 'react';
import { notFound } from 'next/navigation';
import { NombreComponent } from '#@/components/nombre';
import layout from '#@/styles/layout.module.css';
import { FechaActuacionComponent } from '../../UltimasActuaciones/actuaciones';

export default async function PageProcesosLeftllaveProceso(
  {
    params,
  }: {
  params: {
    llaveProceso: string;
  };
}
) {
  const Carpeta = await getCarpetaByllaveProceso(
    params.llaveProceso
  );

  if ( !Carpeta ) {
    notFound();
  }

  return (
    <Fragment key={params.llaveProceso}>
      <div className={ layout.top }>
        <Suspense fallback={<Loader />}>
          <NombreComponent
            key={Carpeta._id}
            deudor={Carpeta.deudor}
          />
        </Suspense>
      </div>
      <div className={ layout.left }>


        <Suspense fallback={<Loader key={Carpeta._id} />}>
          {Carpeta.idProcesos && Carpeta.idProcesos.map(
            (
              idProceso
            ) => {
              return (
                <FechaActuacionComponent
                  key={idProceso}
                  idProceso={idProceso}
                  index={1}
                />
              );
            }
          )}
        </Suspense>
      </div>
    </Fragment>
  );
}
