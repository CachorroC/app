import { Form } from '#@/components/form/Form';
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';

export default async function PageCarpetaId(
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
    <>
      <Form
        carpeta={carpeta}
        key={carpeta._id}
      />
    </>
  );
}
