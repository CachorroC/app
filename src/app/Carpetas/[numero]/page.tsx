import { NuevoProceso } from 'components/form/nuevo-proceso';
import { getDespachos } from '#@/lib/Procesos';
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import { Form } from '../../../components/form/Form';

export default async function PageCarpetaNumero(
  {
    params,
  }: {
  params: { numero: string };
} 
) {
  const carpeta = await getCarpetabyNumero(
    Number(
      params.numero 
    ) 
  );

  const despachos = await getDespachos();

  if ( !carpeta ) {
    return notFound();
  }

  return <Form key={params.numero} carpeta={carpeta} />;
}
