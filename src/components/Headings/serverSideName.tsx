import 'server-only';
import { Suspense } from 'react';
import { getCarpetaByllaveProceso,
         getCarpetasByllaveProceso, } from '#@/lib/project/carpetas';
import { Loader } from '../Loader';
import { NombreComponent } from '../nombre';

export async function Name(
  {
    llaveProceso 
  }: { llaveProceso: string } 
) {
  const proceso = await getCarpetaByllaveProceso(
    llaveProceso 
  );

  if ( !proceso || llaveProceso === '' ) {
    return null;
  }

  return (
    <Suspense fallback={<Loader />}>
      <NombreComponent key={llaveProceso} deudor={proceso.deudor} />
    </Suspense>
  );
}
