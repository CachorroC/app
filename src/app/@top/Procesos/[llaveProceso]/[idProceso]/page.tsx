import { CarpetaCard } from '../../../../../components/Card/carpeta';
import { Loader } from '#@/components/Loader';
import { NombreComponent } from 'components/nombre';
import { getCarpetaByidProceso } from '#@/lib/project/carpetas';
import { Fragment, Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Calendar } from 'components/Calendar/main';

export default async function TopidProcesoPage(
            {
              params: {
                llaveProceso, idProceso 
              },
            }: {
  params: {
    llaveProceso: string;
    idProceso: string;
  };
} 
) {
  const carpeta = await getCarpetaByidProceso(
    Number(
      idProceso 
    ) 
  );

  if ( !carpeta ) {
    return notFound();
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
        <NombreComponent key={carpeta._id} deudor={carpeta.deudor} />
      </Suspense>
    </>
  );
}
