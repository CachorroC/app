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
import { ActuacionComponent,
  ActuacionErrorComponent,
  ActuacionLoadingComponent, } from '#@/components/Actuaciones/actuacion-component';
import { Metadata } from 'next';
import {  fetchWithSmartRetryNoRateLimit } from '#@/lib/fetchWithSmartRetry';

const browserHeaders = {
  'User-Agent'        : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept'            : 'application/json, text/plain, */*',
  'Accept-Language'   : 'es-CO,es-419;q=0.9,es;q=0.8,en;q=0.7', // Prioritize Colombian Spanish
  'Accept-Encoding'   : 'gzip, deflate, br',
  'Connection'        : 'keep-alive',
  // Some firewalls check these modern "Sec-" headers
  'Sec-Ch-Ua'         : '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
  'Sec-Ch-Ua-Mobile'  : '?0',
  'Sec-Ch-Ua-Platform': '"Windows"',
  'Sec-Fetch-Dest'    : 'empty',
  'Sec-Fetch-Mode'    : 'cors',
  'Sec-Fetch-Site'    : 'same-site',
  // Government APIs often require a Referer to prove you came from their frontend
  'Referer'           : 'https://consultaprocesos.ramajudicial.gov.co/',
};

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
}: { idProceso: string } ) {
  const data = await fetchWithSmartRetryNoRateLimit(
    `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`, {
      method : 'GET',
      headers: browserHeaders,
    } 
  );

  if ( !data.ok ) {
    return (
      <>
        <ActuacionErrorComponent />
        <ActuacionErrorComponent />
        <ActuacionErrorComponent />
        <ActuacionErrorComponent />
        <ActuacionErrorComponent />
        <ActuacionErrorComponent />
      </>
    );
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

        <Suspense fallback={ <>
          <ActuacionLoadingComponent />
          <ActuacionLoadingComponent />
          <ActuacionLoadingComponent />
          <ActuacionLoadingComponent />
          <ActuacionLoadingComponent />
          <ActuacionLoadingComponent />
        </> }
        >
          <ActuacionesListModalget idProceso={idProceso} />
        </Suspense>
      </Suspense>
    </>
  );
}
