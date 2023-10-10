import { CarpetaCard } from '#@/components/Card/carpeta';
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { Route } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page(
  {
    params 
  }: { params: { numero: string } } 
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
      {carpeta && (
        <CarpetaCard
          key={carpeta._id}
          carpeta={carpeta}
        />
      )}
    </>
  );
}
