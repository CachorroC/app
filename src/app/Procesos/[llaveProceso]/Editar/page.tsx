import { NuevoProceso } from 'components/form/nuevo-proceso';
import { getDespachos } from '#@/lib/Procesos';
import { getCarpetaByllaveProceso,
         getCarpetabyNumero,
         getCarpetasByllaveProceso, } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import { Form } from 'components/form/Form';

export default async function PageCarpetaNumero(
  {
    params,
  }: {
  params: { llaveProceso: string };
} 
) {
  const carpeta = await getCarpetaByllaveProceso(
    params.llaveProceso 
  );

  const despachos = await getDespachos();

  if ( !carpeta ) {
    return notFound();
  }

  return <Form key={params.llaveProceso} carpeta={carpeta} />;
}
