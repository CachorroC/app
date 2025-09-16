import { NombreComponent } from '#@/components/nombre';
import { getCarpetaByllaveProceso } from '#@/lib/project/utils/Carpetas/carpetas';
import { notFound } from 'next/navigation';
import typography from '#@/styles/fonts/typography.module.css';

export default async function Page( {
  params
}: { params: Promise<{ slug: string[]; }>; } ) {
  const {
    slug 
  } = await params;

  const [
    llaveProceso,
    idProceso
  ] = slug;

  const carpeta = await getCarpetaByllaveProceso( llaveProceso );

  if ( !carpeta ) {
    return notFound();
  }

  const {
    deudor
  } = carpeta;

  return (
    <>
      {deudor && (
        <NombreComponent
          key={llaveProceso}
          nombre={carpeta.nombre}
          carpetaNumero={carpeta.numero}
        />
      )}
      {idProceso && <p className={typography.bodySmall}>Ultimas Actuaciones</p>}
    </>
  );
}
