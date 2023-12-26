import { NombreComponent } from '#@/components/nombre';
import { getCarpetaByllaveProceso } from '#@/lib/project/utils/Carpetas/carpetas';
import { notFound } from 'next/navigation';
import typography from '#@/styles/fonts/typography.module.css';

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

      const {
        deudor 
      } = carpeta;
      return (
        <>
          {deudor && (
            <NombreComponent
              key={llaveProceso}
              deudor={deudor}
            />
          )}
          {idProceso && <p className={typography.bodySmall}>Ultimas Actuaciones</p>}
        </>
      );
}
