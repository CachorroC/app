import { getCarpetaById } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import EditCarpeta from '#@/components/form/Editar-carpeta';
import Link from 'next/link';
import { Route } from 'next';

export default async function PageCarpetaId(
  {
    params,
  }: {
  params: { _id: string };
} 
) {
  const carpeta = await getCarpetaById(
    params._id 
  );

  if ( !carpeta ) {
    return notFound();
  }

  return (
    <>
      <EditCarpeta
        carpeta={carpeta}
        key={carpeta._id}
      />
      <Link
        href={`/Carpetas/numero/${ carpeta.numero }` as Route}
      >{`${ carpeta.numero }`}</Link>
    </>
  );
}
