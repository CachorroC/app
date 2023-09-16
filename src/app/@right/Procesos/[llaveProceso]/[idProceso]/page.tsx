import { Calendar } from '#@/components/Calendar/main';
import { CarpetaCard } from '#@/components/Card/carpeta';
import { Loader } from '#@/components/Loader';
import { NombreComponent } from '#@/components/nombre';
import { getCarpetaByidProceso } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import { Fragment, Suspense } from 'react';

export default async function RightidProcesoPage(
  {
    params,
  }: {
  params: {
    llaveProceso: string;
    idProceso: string;
  };
} 
) {
  const isTypeofidProcesoString = typeof params.idProceso === 'string';

  const carpeta = await getCarpetaByidProceso(
    Number(
      params.idProceso 
    ) 
  );

  if ( !carpeta ) {
    return notFound();
  }

  return (
    <>
      {carpeta.fecha && (
        <Suspense fallback={<Loader />}>
          <Calendar
            key={carpeta.fecha.toString()}
            date={carpeta.fecha.toLocaleString()}
          />
        </Suspense>
      )}
      <Suspense fallback={<Loader />}>
        <CarpetaCard key={carpeta._id} carpeta={carpeta} />
      </Suspense>
    </>
  );
}
