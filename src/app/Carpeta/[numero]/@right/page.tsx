import typography from '#@/styles/fonts/typography.module.css';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { notFound } from 'next/navigation';
import layout from '#@/styles/layout.module.css';
import { NotasList } from '#@/components/Nota/tasks-list';
import {  Suspense } from 'react';
import { Loader } from '#@/components/Loader';
import { ProcesosComponent } from '#@/components/Proceso/server-components';
import {  CopyButtons } from '#@/components/Buttons/copy-buttons';
import { ProcesosCardSkeleton } from '#@/components/Proceso/skeleton';
import { OutputDateHelper } from '#@/lib/project/date-helper';

export default async function Page(
  {
    params: {
      numero
    }
  }: {params: {numero: string}}
) {

  console.time(
    'filter array'
  );

  const carpeta = await getCarpetabyNumero(
    Number(
      numero
    )
  );

  if ( !carpeta ) {
    notFound();
  }

  const {
    llaveProceso, demanda, fecha
  } = carpeta;

  const {
    vencimientoPagare, entregaGarantiasAbogado, fechaPresentacion, mandamientoPago
  } = demanda;

  const allFechas = new Set<{name: string, date: Date}>();

  if ( fecha ) {
    allFechas.add(
      {
        name: 'fechaUltimaActualizacion',
        date: new Date(
          fecha
        )
      }
    );
  }

  if ( entregaGarantiasAbogado !== null ) {
    allFechas.add(
      {
        name: 'entregaGarantiasAbogado',
        date: new Date(
          entregaGarantiasAbogado
        )
      }
    );
  }

  if ( fechaPresentacion !== null ) {
    allFechas.add(
      {
        name: 'fechaPresentacion',
        date: new Date(
          fechaPresentacion
        )
      }
    );
  }

  if ( mandamientoPago !== null ) {
    allFechas.add(
      {
        name: 'mandamientoPago',
        date: new Date(
          mandamientoPago
        )
      }
    );
  }

  for ( const vencimiento of vencimientoPagare ) {
    const indexOfVencimiento = vencimientoPagare.indexOf(
      vencimiento
    );

    if ( vencimiento === null ) {
      continue;
    }

    allFechas.add(
      {
        name: `vencimientoPagare.${ indexOfVencimiento }`,
        date: new Date(
          vencimiento
        )
      }
    );
  }

  const allFechasArray = Array.from(
    allFechas
  );

  const fechasMaper = [
    ...allFechasArray
  ].sort(
    (
      a, b
    ) => {
      const x = a.date.getTime();

      const y = b.date.getTime();

      if ( x < y ) {
        return 1;
      }

      if ( x > y ) {
        return -1;
      }

      return 0;

    }
  );

  console.timeEnd(
    'filter array'
  );

  return (
    <>

      <h2 style={{
        gridArea: '1 / 1 / 2 / 4'
      }} className={ typography.headlineMedium }>{`Carpeta número ${ numero }`}</h2>



      <div className={ layout.sectionColumn }>
        <h5 className={typography.titleSmall}>Datos del Proceso para copiar</h5>
        <Suspense fallback={<Loader />}>
          <CopyButtons carpeta={ carpeta} />
        </Suspense>
      </div>


      <Suspense fallback={<Loader />}>
        <NotasList />
      </Suspense>



      <section className={layout.sectionColumn}>
        <Suspense fallback={<Loader />}>
          { fechasMaper.map(
            (
              fechaMap
            ) => {
              return (
                <div key={ fechaMap.name } className={ layout.segmentRow }>
                  <h5 className={ typography.titleMedium }>{fechaMap.name}</h5>
                  <p className={typography.labelMedium}> {OutputDateHelper(
                    fechaMap.date
                  )}</p>
                </div>
              );
            }
          )}
        </Suspense>
      </section>

      <Suspense fallback={<ProcesosCardSkeleton />}>
        { llaveProceso && ( <ProcesosComponent key={ llaveProceso}llaveProceso={llaveProceso} index={ 1 } /> )}
      </Suspense>

    </>
  );
}
