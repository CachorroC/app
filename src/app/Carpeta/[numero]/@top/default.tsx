
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { notFound } from 'next/navigation';
import typography from '#@/styles/fonts/typography.module.css';
import { EditCarpeta } from '#@/components/Buttons/carpetaButtons';
import { Suspense } from 'react';
import { Loader } from '#@/components/Loader';
import { CopyButtons } from '#@/components/Buttons/copy-buttons';

type Props = {
  params: { numero: string };
};

export default async function Page(
  {
    params,
  }: Props
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
      <CopyButtons carpeta={ carpeta} />
    </>
  );
}
