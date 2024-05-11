import { outProceso } from 'types/procesos';
import { getProcesosByllaveProceso } from '#@/lib/project/utils/Procesos';
import { ReactNode, Suspense } from 'react';
import { ActuacionLoader } from '../Actuaciones/actuacion-loader';
import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import { JuzgadoComponent } from './juzgado-component';
import { Loader } from '../Loader/main-loader';
import layout from '#@/styles/layout.module.css';
import { containerEnabled } from '../Card/outlined.module.css';
import SujetosProcesales from './sujetos-procesales';
import { ProcesoDetalleComponent } from './proceso-detalles-component';

export const ProcesoCard = (
  {
    children,
    proceso,
  }: {
  children: ReactNode;
  proceso: outProceso;
} 
) => {
  const {
    sujetosProcesales 
  } = proceso;

  return (
    <div className={containerEnabled}>
      <div className={layout.sectionRow}>
        <SujetosProcesales sujetosProcesalesRaw={sujetosProcesales} />
      </div>
      <div className={layout.sectionColumn}>{children}</div>
    </div>
  );
};

export async function ProcesosComponent(
  {
    llaveProceso,
  }: {
  llaveProceso: string;
} 
) {
  const procesos = await getProcesosByllaveProceso(
    llaveProceso 
  );

  if ( !procesos || procesos.length === 0 ) {
    return null;
  }

  return (
    <>
      {procesos.map(
        (
          proceso 
        ) => {
          const {
            idProceso 
          } = proceso;
          return (
            <ProcesoCard
              key={proceso.idProceso}
              proceso={proceso}
            >
              <Suspense>
                <ProcesoDetalleComponent idProceso={proceso.idProceso} />
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
        } 
      )}
    </>
  );
}
