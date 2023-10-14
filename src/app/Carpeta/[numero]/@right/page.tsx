import { buttonActiveCategory, icon, segmentRow } from '#@/components/Buttons/buttons.module.css';
import Link from 'next/link';
import typography from '#@/styles/fonts/typography.module.scss';
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';

export default async function Page(
  {
    params: {
      numero
    }
  }: {params: {numero: string}}
) {
  const carpeta = await getCarpetabyNumero(
    Number(
      numero
    )
  );

  if ( !carpeta ) {
    notFound();
  }

  return (
    <>
      <section className={ segmentRow }>
        <h2 className={typography.headlineMedium}>Actuaciones</h2>
        { carpeta.idProcesos && (
          carpeta.idProcesos.map(
            (
              idProceso
            ) => {
              return (
                <Link key={ idProceso } className={buttonActiveCategory} href={ `/Carpeta/${ carpeta.numero }/ultimasActuaciones/${ idProceso }` }>
                  <span className={`material-symbols-outlined ${ icon }`}>description
                  </span>
                </Link>
              );
            }
          )
        )}
      </section>

    </>
  );
}
