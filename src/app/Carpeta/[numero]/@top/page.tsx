import { NombreComponent } from '#@/components/nombre';
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import typography from '#@/styles/fonts/typography.module.scss';
import { EditCarpeta } from '#@/components/Buttons/carpetaButtons';
import { Loader } from '#@/components/Loader';
import { Suspense } from 'react';
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

      <Suspense fallback={<Loader />}>
        <NombreComponent
          key={params.numero}
          deudor={carpeta.deudor}
        />
      </Suspense>
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
