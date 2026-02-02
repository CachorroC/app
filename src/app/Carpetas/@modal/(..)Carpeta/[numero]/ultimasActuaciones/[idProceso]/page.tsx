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
import { ActuacionComponent, ActuacionErrorComponent } from '#@/components/Actuaciones/actuacion-component';
import { Metadata } from 'next';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';

/*
export async function generateStaticParams() {
  const carpetas = await getCarpetas();

  return carpetas.flatMap(
    (
      carpeta
    ) => {
      const {
        numero, idProcesos
      } = carpeta;

      return idProcesos.map(
        (
          idProceso
        ) => {
          return {
            numero   : `${ numero }`,
            idProceso: `${ idProceso }`
          };
        }
      );


    }
  );

}
 */
export async function generateMetadata( {
  params,
}: {
  params: Promise<{ numero: string }>;
} ): Promise<Metadata> {
  const {
    numero
  } = await params;

  const product = await getCarpetabyNumero( Number( numero ) );

  if ( !product ) {
    return {
      title: 'sin carpeta',
    };
  }

  return {
    title      : product.nombre,
    description: `Carpeta de ${ product.nombre } - ${ product.tipoProceso }`,

    keywords: [
      product.nombre,
      product.tipoProceso,
      product.numero.toString(),
      product.tipoProceso,
      product.category,
    ],
  };
}

async function ActuacionesListModalget( {
  idProceso
}: { idProceso: number } ) {
  const data = await fetch( `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`, );

  if ( !data.ok ) {
    return ( <ActuacionErrorComponent /> );
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
  params: Promise<{ numero: string; idProceso: string }>;
} ) {
  const {
    numero, idProceso
  } = await params;

  if ( idProceso === 'idProceso' ) {
    return notFound();
  }

  const carpetaNumero = Number( numero );

  const carpeta = await getCarpetabyNumero( carpetaNumero );

  return (
    <>
      <Suspense fallback={<ModalLoader />}>
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
          <ActuacionesListModalget idProceso={Number( idProceso )}/>
        </Suspense>
      </Suspense>
    </>
  );
}
