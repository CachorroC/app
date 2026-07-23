import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fixMoney } from '#@/lib/project/helper';
import { Fragment, Suspense } from 'react';
import layout, { buttonActiveCategory } from '#@/styles/layout.module.css';
import { Loader, TableLoader } from '#@/components/Loader/main-loader';
import { InputSection } from '#@/components/Form/input-section';
import { DeudorFormComponent } from '#@/components/Form/deudor-form-component';
import { JuzgadoComponent,
  JuzgadoErrorComponent, } from '#@/components/Proceso/juzgado-component';
import styles from './styles.module.css';
import { ProcesosComponent } from '#@/components/Proceso/server-components';
import ProtoPage from '../../../../components/proto-page';
import type { Route } from 'next';
import { AvailableProcesosByName } from '#@/components/available-procesos-by-name';

export default async function Page( {
  params,
}: {
  params: Promise<{ numero: string }>;
} ) {
  const {
    numero 
  } = await params;

  const carpeta = await getCarpetabyNumero( Number( numero ) );

  if ( !carpeta ) {
    return notFound();
  }

  const {
    idProcesos, llaveProceso, juzgado, nombre 
  } = carpeta;

  let idProcesoContent;

  if ( idProcesos && idProcesos.length > 0 ) {
    idProcesoContent = idProcesos.map( ( idProceso ) => {
      const actuacionesHref: Route<`/dashboard/Carpeta/${string}/ultimasActuaciones/${string}`> = `/dashboard/Carpeta/${ numero }/ultimasActuaciones/${ idProceso }`;

      return (
        <Link
          key={idProceso}
          className={buttonActiveCategory}
          href={actuacionesHref}
        >
          <span>{nombre}</span>
        </Link>
      );
    } );
  }

  return (
    <>
      <ProtoPage carpeta={carpeta} />
      <div className={layout.sectionRow}>
        {carpeta.demanda?.capitalAdeudado && (
          <div className={styles.valueCard}>
            <h2 className={styles.valueCardTitle}>Capital Adeudado</h2>
            <h3 className={styles.valueCardValue}>
              {fixMoney( carpeta.demanda.capitalAdeudado )}
            </h3>
          </div>
        )}
        {carpeta.demanda?.avaluo && (
          <div className={styles.valueCard}>
            <h2 className={styles.valueCardTitle}>Valor del Avaluo</h2>
            <h3 className={styles.valueCardValue}>
              {fixMoney( carpeta.demanda.avaluo )}
            </h3>
          </div>
        )}
        {carpeta.demanda?.liquidacion && (
          <div className={styles.valueCard}>
            <h2 className={styles.valueCardTitle}>Valor de la liquidacion</h2>
            <h3 className={styles.valueCardValue}>
              {fixMoney( carpeta.demanda.liquidacion )}
            </h3>
          </div>
        )}

        <div className={styles.valueCard}>
          <h2 className={styles.valueCardTitle}>Tipo de Proceso</h2>
          <h3 className={styles.valueCardValue}>{carpeta.tipoProceso}</h3>
        </div>

        <div className={layout.sectionColumn}>
          <Suspense fallback={<Loader />}>
            {juzgado
              ? (
                  <JuzgadoComponent juzgado={juzgado} />
                )
              : (
                  <JuzgadoErrorComponent />
                )}
          </Suspense>
        </div>
      </div>
      <div className={layout.sectionRow}>
        <Suspense fallback={<Loader />}>
          <ProcesosComponent
            llaveProceso={llaveProceso}
            numero={Number( numero )}
          />
        </Suspense>
      </div>
      <div className={layout.sectionColumn}>
        <Suspense fallback={<Loader />}>
          <DeudorFormComponent />
        </Suspense>
      </div>

      <div className={layout.sectionColumn}>
        <Suspense fallback={<Loader />}>
          <InputSection
            key={numero}
            name={'llaveProceso'}
            title={'Numero de expediente'}
            type={'text'}
          />
        </Suspense>
      </div>
      <div className={layout.sectionColumn}>{idProcesoContent}</div>
      {/*  <div style={ {
        gridArea: 'span 2 / span 4',
        overflow: 'scroll'

      }}
      > */}
      <Suspense fallback={<Loader />}>
        <AvailableProcesosByName nombre={carpeta.nombre} />
      </Suspense>
      {/*  </div> */}
    </>
  );
}
