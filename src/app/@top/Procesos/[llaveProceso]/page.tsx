import { CarpetaCard } from 'components/Card/carpeta';
import { Loader } from '#@/components/Loader';
import { NombreComponent } from 'components/nombre';
import { getCarpetaByllaveProceso,
         getCarpetasByllaveProceso, } from '#@/lib/project/carpetas';
import { Fragment, Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Calendar } from 'components/Calendar/main';

export default async function DefaultProcesosllaveProceso(
            {
              params: {
                llaveProceso 
              },
            }: {
  params: { llaveProceso: string };
} 
) {
  const Carpeta = await getCarpetaByllaveProceso(
    llaveProceso 
  );

  if ( !Carpeta ) {
    notFound();
  }

  return (
    <Fragment key={llaveProceso}>
      <Suspense fallback={<Loader />}>
        <NombreComponent key={Carpeta._id} deudor={Carpeta.deudor} />
      </Suspense>
    </Fragment>
  );
}
