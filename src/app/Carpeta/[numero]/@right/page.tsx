import styles from '#@/components/Buttons/buttons.module.css';
import Link from 'next/link';
import typography from '#@/styles/fonts/typography.module.scss';
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import type { Route } from 'next';
import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import layout from '#@/styles/layout.module.css';
import { NotasList } from '#@/components/Nota/tasks-list';

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
      <section className={ layout.segmentColumn }>
        <h2 className={typography.headlineMedium}>Notas</h2>
        <NotasList />
      </section>

      <section className={ layout.segmentColumn }>
        <h2 className={typography.headlineMedium}>Ultimas Actuaciones</h2>
        { carpeta.idProcesos && (
          carpeta.idProcesos.map(
            (
              idProceso
            ) => {
              return (
                <section className={layout.segmentRow} key={ idProceso }>
                  <FechaActuacionComponent
                    initialOpenState={ true }
                    key={ idProceso }
                    idProceso={ idProceso }
                    index={ 1 } />
                  <Link key={ idProceso } className={ styles.buttonPassiveCategory} href={ `/Carpeta/${ carpeta.numero }/ultimasActuaciones/${ idProceso }` as Route }>
                    <span className={ `material-symbols-outlined ${ styles.icon }` }>description
                    </span>
                  </Link>

                </section>
              );
            }
          )
        )}
      </section>

    </>
  );
}
