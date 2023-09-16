import { ActuacionCard } from 'components/Actuacion/server-components';
import { fetchActuaciones, getActuaciones } from '#@/lib/Actuaciones';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import { getCarpetaByidProceso } from '#@/lib/project/carpetas';

export default async function Page(
  {
    params,
  }: {
  params: {
    llaveProceso: string;
    idProceso: string;
  };
} 
) {
  const carpeta = await getCarpetaByidProceso(
    Number(
      params.idProceso 
    ) 
  );

  if ( !carpeta ) {
    return notFound();
  }

  const actuaciones = await getActuaciones(
    {
      carpeta: carpeta,
      index  : 1,
    } 
  );

  if ( !actuaciones ) {
    return notFound();
  }

  return (
    <Fragment key={params.idProceso}>
      {carpeta.ultimaActuacion && (
        <ActuacionCard act={carpeta.ultimaActuacion} key={carpeta._id} />
      )}
      {actuaciones.map(
        (
          actuacion, index, arr 
        ) => {
          return <ActuacionCard act={actuacion} key={index} />;
        } 
      )}
    </Fragment>
  );
}
