import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getActuaciones } from '#@/lib/project/utils/Actuaciones/actuaciones-main';
import { ActuacionesLoader } from '#@/components/Actuaciones/actuacion-loader';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { NombreComponent } from '#@/components/nombre';
import styles from '#@/styles/layout.module.css';
import { ActuacionesListContainer } from '#@/components/Actuaciones/actuaciones-list';
import { ModalLoader } from '#@/components/Loader/main-loader';
import { JuzgadoComponent,
  JuzgadoErrorComponent, } from '#@/components/Proceso/juzgado-component';
import { Metadata } from 'next';
import { CopyButton } from '#@/components/Buttons/copy-buttons';

export async function generateMetadata(
  {
    params,
  }: {
  params: { numero: string };
} 
): Promise<Metadata> {
  const {
    numero 
  } = params;

  const product = await getCarpetabyNumero(
    Number(
      numero 
    ) 
  );

  return {
    title: `${ numero } - ${ product.nombre }`,

    keywords: [
      product.nombre,
      product.tipoProceso,
      product.numero.toString(),
      product.tipoProceso,
      product.category,
    ],
  };
}

async function ActuacionesListModalget(
  {
    idProceso 
  }: { idProceso: number } 
) {
  const actuacionesPromise = getActuaciones(
    {
      idProceso: Number(
        idProceso 
      ),
    } 
  );

  return (
    <Suspense fallback={<ActuacionesLoader />}>
      <ActuacionesListContainer actuacionesPromise={actuacionesPromise} />
    </Suspense>
  );
}

export default async function Page(
  {
    params,
  }: {
  params: { numero: string; idProceso: string };
} 
) {
  if ( params.idProceso === 'idProceso' ) {
    return notFound();
  }

  const carpetaNumero = Number(
    params.numero 
  );

  const carpeta = await getCarpetabyNumero(
    carpetaNumero 
  );

  return (
    <>
      <div className={styles.segmentRow}>
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
          copyTxt={carpeta.demanda.radicado ?? 'sin radicado'}
          name={'radicado'}
        />
        <CopyButton
          copyTxt={carpeta.llaveProceso}
          name={'expediente'}
        />
      </div>

      <Suspense fallback={<ModalLoader />}>
        <ActuacionesListModalget idProceso={Number(
          params.idProceso 
        )} />
      </Suspense>
    </>
  );
}
