import { NombreComponent } from '#@/components/nombre';
import { getCarpetaByllaveProceso } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import typography from '#@/styles/fonts/typography.module.scss';

export default async function Page(
  {
    params 
  }: { params: { slug: string[] } } 
) {
  const [
    llaveProceso,
    idProceso
  ] = params.slug;

  const carpeta = await getCarpetaByllaveProceso(
    llaveProceso 
  );

  if ( !carpeta ) {
    return notFound();
  }

  return (
    <>
      <NombreComponent
        key={llaveProceso}
        deudor={carpeta.deudor}
      />
      {idProceso && <p className={typography.bodySmall}>Ultimas Actuaciones</p>}
    </>
  );
}
