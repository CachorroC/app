import {  PrismaForm } from '#@/components/form/Form';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
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
          <PrismaForm
            carpeta={carpeta}
            key={carpeta.id}
          />
        </>
      );
}
