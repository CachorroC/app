import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { Form } from 'components/form/Form';
import { notFound } from 'next/navigation';

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

  if ( !carpeta ) {
    return notFound();
  }

  return (
    <Form
      key={params.numero}
      carpeta={carpeta}
    />
  );
}
