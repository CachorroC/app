import { FechaActuacionComponent } from 'components/Actuacion/server-components';
import { Loader } from '#@/components/Loader';
import { getCarpetaByllaveProceso,
         getCarpetasByllaveProceso, } from '#@/lib/project/carpetas';
import { Fragment, Suspense } from 'react';
import { notFound } from 'next/navigation';

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
      <p>Page Left llaveProceso</p>

      <Suspense fallback={<Loader key={Carpeta._id} />}>
        {Carpeta.idProceso && (
          <FechaActuacionComponent
            key={Carpeta.idProceso}
            carpeta={Carpeta}
            index={1}
          />
        )}
      </Suspense>
    </Fragment>
  );
}
