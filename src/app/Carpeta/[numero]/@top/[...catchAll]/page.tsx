import { EditCarpeta } from '#@/components/Buttons/carpetaButtons';
import { Loader } from '#@/components/Loader';
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import typography from '#@/styles/fonts/typography.module.css';
import { CopyButtons } from '#@/components/Buttons/copy-buttons';

export default async function CatchAll(
  {
    params
  }: {params:{numero: string; catchAll: string[]}}
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

      <span className={ typography.titleMedium }>{ `# ${ params.numero }` }</span>
      <Suspense fallback={<Loader/>}>
        <EditCarpeta numero={ Number(
          params.numero
        ) } />
      </Suspense>
      <CopyButtons carpeta={ carpeta } />
    </>
  );
}