import {  getActuaciones } from '#@/lib/Actuaciones';
import { Fragment, Suspense } from 'react';
import { Loader } from '#@/components/Loader';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { notFound } from 'next/navigation';

export default async function Page(
  {
    params,
  }: {
  params: {
    numero: number;
    idProceso: number;
  };
}
) {


  const actuaciones = await getActuaciones(

    {
      idProceso: params.idProceso,
      index    : 1
    }

  );

  if ( !actuaciones || actuaciones.length === 0 ) {
    return notFound();
  }

  return (
    <Fragment key={params.idProceso}>
      <Suspense fallback={<Loader />}>

        {actuaciones.map(
          (
            actuacion, index
          ) => {
            return (
              <ActuacionComponent
                key={ index } incomingActuacion={actuacion } initialOpenState={ true} />
            );
          }
        )}
      </Suspense>
    </Fragment>
  );
}
