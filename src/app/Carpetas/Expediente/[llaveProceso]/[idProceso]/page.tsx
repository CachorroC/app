
import { getActuaciones } from '#@/lib/Actuaciones';
import { notFound } from 'next/navigation';
import { Fragment, Suspense } from 'react';
import { getCarpetaByidProceso } from '#@/lib/project/carpetas';
import { NombreComponent } from '#@/components/nombre';
import layout from '#@/styles/layout.module.css';
import { Loader } from '#@/components/Loader';
import { ActuacionCard } from '../../../UltimasActuaciones/actuaciones';

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
    <Fragment key={ params.idProceso }>
      <div className={ layout.top }>
        <Suspense fallback={<Loader />}>
          <NombreComponent key={params.idProceso} deudor={ carpeta.deudor } />
        </Suspense>
      </div>
      <div className={ layout.left }>

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
      </div>
    </Fragment>
  );
}
