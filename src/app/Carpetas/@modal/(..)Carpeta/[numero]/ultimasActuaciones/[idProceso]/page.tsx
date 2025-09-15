import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { NombreComponent } from '#@/components/nombre';
import styles from '#@/styles/layout.module.css';
import { ModalLoader } from '#@/components/Loader/main-loader';
import { JuzgadoComponent,
  JuzgadoErrorComponent, } from '#@/components/Proceso/juzgado-component';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { ConsultaActuacion } from '#@/lib/types/actuaciones';
import { ActuacionComponent } from '#@/components/Actuaciones/actuacion-component';

async function ActuacionesListModalget( {
  idProceso 
}: { idProceso: number } ) {
  const data = await fetch(
    `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,
    {
      cache: 'no-store',
    },
  );

  if ( !data.ok ) {
    notFound();
  }

  const {
    actuaciones 
  } = ( await data.json() ) as ConsultaActuacion;

  return actuaciones.map( ( actuacion ) => {
    return (
      <ActuacionComponent
        key={actuacion.idRegActuacion}
        incomingActuacion={actuacion}
      />
    );
  } );
}

export default async function Page( {
  params,
}: {
  params: { numero: string; idProceso: string };
} ) {
  if ( params.idProceso === 'idProceso' ) {
    return notFound();
  }

  const carpetaNumero = Number( params.numero );

  const carpeta = await getCarpetabyNumero( carpetaNumero );

  return (
    <>
      <div
        className={styles.segmentRow}
        style={{
          gridColumn: 'span 4',
        }}
      >
        <NombreComponent
          nombre={carpeta.nombre}
          carpetaNumero={carpeta.numero}
        />
        {carpeta.juzgado
          ? (
              <JuzgadoComponent juzgado={carpeta.juzgado} />
            )
          : (
              <JuzgadoErrorComponent />
            )}
        <CopyButton
          horizontal={true}
          copyTxt={carpeta.demanda.radicado ?? 'sin radicado'}
          name={'radicado'}
        />
        <CopyButton
          horizontal={true}
          copyTxt={carpeta.llaveProceso}
          name={'expediente'}
        />
      </div>

      <Suspense fallback={<ModalLoader />}>
        <ActuacionesListModalget idProceso={Number( params.idProceso )} />
      </Suspense>
    </>
  );
}
