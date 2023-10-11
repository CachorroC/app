import { NombreComponent } from '#@/components/nombre';
import {  getCarpetabyNumero } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import typography from '#@/styles/fonts/typography.module.scss';

export default async function Page (
  {
    params
  }: {
    params: {
      numero: string
    }
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
      <NombreComponent
        key={params.numero}
        deudor={carpeta.deudor}
      />
      <span className={typography.titleMedium}>{`# ${ params.numero }`}</span>
    </>
  );
}