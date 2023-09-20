
import { Loader } from '#@/components/Loader';
import { NombreComponent } from 'components/nombre';
import { getCarpetaByllaveProceso } from '#@/lib/project/carpetas';
import { Fragment, Suspense } from 'react';
import { notFound } from 'next/navigation';

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
        <NombreComponent
          key={Carpeta._id}
          deudor={Carpeta.deudor}
        />
      </Suspense>
    </Fragment>
  );
}
