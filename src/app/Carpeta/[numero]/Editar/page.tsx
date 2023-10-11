import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import EditCarpeta from '#@/components/form/Editar-carpeta';

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

      <EditCarpeta
        carpeta={carpeta}
        key={carpeta._id}
      />


    </>
  );
}
