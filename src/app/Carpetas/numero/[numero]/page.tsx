import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import { Form } from 'components/form/Form';
import Link from 'next/link';
import { Route } from 'next';

export default async function PageCarpetaNumero(
  {
    params,
  }: {
  params: { numero: number };
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
      <Link
        href={`/Carpetas/id/${ carpeta._id }` as Route}
      >{`${ carpeta._id }`}</Link>
      <Form
        key={params.numero}
        carpeta={carpeta}
      />
    </>
  );
}
