import { DetalleProceso, outProceso } from 'types/procesos';
import {  fetchProcesosByllaveProceso } from '#@/lib/project/utils/Procesos/procesos';
import { ReactNode, Suspense } from 'react';
import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import { JuzgadoComponent } from './juzgado-component';
import { Loader } from '../Loader/main-loader';
import layout from '#@/styles/layout.module.css';
import SujetosProcesales from './sujetos-procesales';
import { consultaProcesoDetalleURL } from '#@/lib/project/utils/main';
import typography from '#@/styles/fonts/typography.module.css';
import { containerEnabled } from '../Card/outlined.module.css';
import FruitPicker from '../Buttons/etapaProsesalSelector';
import buttonStyles from '../Buttons/buttons.module.css';
import Link from 'next/link';

export const ProcesoCard = ( {
  children,
  proceso,
}: {
  children: ReactNode;
  proceso : outProceso;
} ) => {
  const {
    sujetosProcesales, idProceso
  } = proceso;

  return (
    <div className={containerEnabled}>
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
      <div className={ layout.segmentColumn } style={ {
        backgroundColor: 'var(--error-container)'
      }}
      >
        <h4
          style={{
            color: 'var(--on-error-container)',
            flex : 1,
          }}
          className={typography.labelSmall}
        >
          No hay detalles del proceso
        </h4>
        <p
          style={{
            color: 'var(--on-error-container)',
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


            <h5
              style={{
                color: 'var(--primary)',
                flex : 1,
              }}
              className={typography.labelLarge}
            >
              {detalleEspecifico.key}
            </h5>
            <p
              style={{
                color: 'var(--on-surface)',
                flex : 1,
              }}
              className={typography.bodySmall}
            >
              {`${ outputTxt }`}
            </p>
          </div>
        );
      } )}
    </div>
  );
}

export async function ProcesosComponent( {
  llaveProceso,
  numero,
}: {
  llaveProceso: string;
  numero      : number;
} ) {
  const procesos = await fetchProcesosByllaveProceso( llaveProceso );

  if ( procesos === null || procesos.length === 0 ) {
    return (
      <h2>no hay procesos</h2>
    );
  }

  return (
    <Suspense fallback={ <Loader /> }>
      {procesos.map( ( proceso ) => {
        const {
          idProceso
        } = proceso;

        return (
          <ProcesoCard
            key={idProceso}
            proceso={proceso}
          >

            <Suspense fallback={ <Loader /> }>
              <FechaActuacionComponent
                key={idProceso}
                idProceso={idProceso}
              />
            </Suspense>
            <JuzgadoComponent juzgado={proceso.juzgado} />
            <FruitPicker />
            <Link
              key={idProceso}
              className={buttonStyles.buttonPassiveCategory}
              href={`/Carpeta/${ numero }/ultimasActuaciones/${ idProceso }`}
            >
              <span
                className={`material-symbols-outlined ${ buttonStyles.icon }`}
              >
                description
              </span>
              <span className={buttonStyles.text}>
                Todas las actuaciones de este juzgado
              </span>
            </Link>
          </ProcesoCard>
        );
      } )}
    </Suspense>
  );
}
