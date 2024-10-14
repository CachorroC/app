import { DetalleProceso, outProceso } from 'types/procesos';
import { getProcesosByllaveProceso } from '#@/lib/project/utils/Procesos/procesos';
import { Fragment, ReactNode, Suspense } from 'react';
import { ActuacionLoader } from '../Actuaciones/actuacion-loader';
import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import { JuzgadoComponent } from './juzgado-component';
import { Loader } from '../Loader/main-loader';
import layout from '#@/styles/layout.module.css';
import SujetosProcesales from './sujetos-procesales';
import { consultaProcesoDetalleURL } from '#@/lib/project/utils/main';
import typography from '#@/styles/fonts/typography.module.css';
import { CopyButton } from '../Buttons/copy-buttons';
import { containerEnabled } from '../Card/elevated.module.css';

export const ProcesoCard = ( {
  children,
  proceso,
}: {
  children: ReactNode;
  proceso: outProceso;
} ) => {
  const {
    sujetosProcesales, idProceso
  } = proceso;

  return (
    <div className={containerEnabled}>
      <h4>Proceso Card</h4>
      <div className={layout.segmentRow}>
        <SujetosProcesales sujetosProcesalesRaw={sujetosProcesales} />
      </div>
      <div className={layout.segmentColumn}>
        <Suspense fallback={<Loader />}>{children}</Suspense>

        <Suspense fallback={<Loader />}>
          <ProcesoDetalle idProceso={idProceso} />
        </Suspense>
      </div>
    </div>
  );
};

export async function ProcesoDetalle( {
  idProceso
}: { idProceso: number } ) {
  const urlNameMaker = consultaProcesoDetalleURL( idProceso );

  const fetchProc = await fetch( urlNameMaker );

  const infoDetalle = [];

  if ( !fetchProc.ok ) {
    console.log( `proceso detalle failer with error: ${ fetchProc.statusText }` );

    return (
      <div className={layout.segmentColumn}>
        <h4
          style={{
            color: 'var(--primary)',
            flex : 1,
          }}
          className={typography.labelSmall}
        >
          No hay detalles del proceso
        </h4>
        <p
          style={{
            color: 'var(--on-surface)',
            flex : 1,
          }}
          className={typography.titleMedium}
        >
          error
        </p>
      </div>
    );
  }

  const detalleProceso = ( await fetchProc.json() ) as DetalleProceso;

  for ( const key in detalleProceso ) {
    if ( Object.prototype.hasOwnProperty.call(
      detalleProceso, key
    ) ) {
      const element = detalleProceso[ key ];

      infoDetalle.push( {
        key  : key,
        value: element,
      } );
    }
  }

  return (
    <div className={layout.segmentRow}>
      <h4 className={typography.titleLarge}>Detalles del proceso</h4>

      {infoDetalle.map( (
        detalleEspecifico, index
      ) => {
        let outputTxt;

        if (
          detalleEspecifico.key === 'fechaConsulta'
          || detalleEspecifico.key === 'ultimaActualizacion'
          || detalleEspecifico.key === 'fechaProceso'
        ) {
          outputTxt = new Date( detalleEspecifico.value )
            .toLocaleDateString(
              'es-co',
              {
                weekday: 'long',
                year   : 'numeric',
                month  : 'long',
                day    : 'numeric',
              },
            );
        } else {
          outputTxt = detalleEspecifico.value;
        }

        return (
          <div
            key={index}
            className={layout.segmentColumn}
          >
            <CopyButton
              copyTxt={String( outputTxt )}
              name={detalleEspecifico.key}
            />
          </div>
        );
      } )}
    </div>
  );
}

export async function ProcesosComponent( {
  llaveProceso,
}: {
  llaveProceso: string;
} ) {
  const procesos = await getProcesosByllaveProceso( llaveProceso );

  if ( !procesos || procesos.length === 0 ) {
    return null;
  }

  return (
    <>
      {procesos.map( ( proceso ) => {
        const {
          idProceso
        } = proceso;

        return (
          <ProcesoCard
            key={idProceso}
            proceso={proceso}
          >
            <Suspense fallback={<Loader />}>
              <ProcesoDetalle idProceso={proceso.idProceso} />
            </Suspense>
            <Suspense fallback={<ActuacionLoader />}>
              <FechaActuacionComponent
                key={idProceso}
                idProceso={idProceso}
              />
            </Suspense>
            <Suspense fallback={<Loader />}>
              <JuzgadoComponent juzgado={proceso.juzgado} />
            </Suspense>
          </ProcesoCard>
        );
      } )}
    </>
  );
}
