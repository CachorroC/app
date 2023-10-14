import { getActuaciones } from '#@/lib/Actuaciones';
import { notFound } from 'next/navigation';
import { Fragment, Suspense } from 'react';
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { Loader } from '#@/components/Loader';
import { ActuacionCard } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';

export default async function Page(
  {
    params,
  }: {
  params: {
    numero: string;
    idProceso: string;
  };
} 
) {
  const carpeta = await getCarpetabyNumero(
    Number(
      params.numero 
    ) 
  );

  if ( !carpeta ) {
    return notFound();
  }

  const actuaciones = await getActuaciones(
    {
      idProceso: Number(
        params.idProceso 
      ),
      index: 1,
    } 
  );

  if ( !actuaciones ) {
    return notFound();
  }

  return (
    <Fragment key={params.idProceso}>
      <Suspense fallback={<Loader />}>
        {carpeta.ultimaActuacion && (
          <ActuacionCard
            act={carpeta.ultimaActuacion}
            key={carpeta._id}
          />
        )}
        {actuaciones.map(
          (
            actuacion, index 
          ) => {
            return (
              <ActuacionCard
                act={actuacion}
                key={index}
              />
            );
          } 
        )}
      </Suspense>
    </Fragment>
  );
}
