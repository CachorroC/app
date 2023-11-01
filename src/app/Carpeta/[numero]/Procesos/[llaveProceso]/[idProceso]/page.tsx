import {  getActuaciones } from '#@/lib/Actuaciones';
import { Fragment, Suspense } from 'react';
import { Loader } from '#@/components/Loader';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { notFound } from 'next/navigation';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';

export async function generateStaticParams () {
  const maperProducts = new Map<number, { numero: string;  llaveProceso: string; idProceso: string}>();

  const products = await getCarpetas();

  for ( const carpeta of products ) {

    if ( carpeta.idProcesos.length === 0 ) {
      maperProducts.set(
        carpeta.numero,
          numero   : carpeta.numero.toString(),
          idProceso: 'sinProcesos'
        }
      );
      continue;
    }

    for ( const idProceso of carpeta.idProcesos ) {
      maperProducts.set(
        idProceso, {
          numero   : carpeta.numero.toString(),
          idProceso: idProceso.toString()
        }
      );
    }
  }

  return Array.from(
    maperProducts.values()
  );
}


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


  const actuaciones = await getActuaciones(

    {
      idProceso: Number(
        params.idProceso
      ),
      index: 1
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
