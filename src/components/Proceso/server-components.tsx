import typography from '#@/styles/fonts/typography.module.css';
import { outProceso } from 'types/procesos';
import { fixDemandado } from '#@/lib/project/helper';
import { getProceso } from '#@/lib/project/utils/Procesos';
import { ReactNode, Suspense } from 'react';
import { ActuacionLoader } from '../Actuaciones/actuacion-loader';
import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import { JuzgadoComponent } from './juzgado-component';
import { Loader } from '../Loader';
import layout from '#@/styles/layout.module.css';

export const ProcesoCard = (
  {
    children,
    proceso,
  }: {
    children: ReactNode;
    proceso: outProceso;
  }
) => {
          const mapperObject = new Map();

          const {
            sujetosProcesales
          } = proceso;

          const matcher = sujetosProcesales.matchAll(
            /(\s?)([A-Za-z\s/]+)(:)(\s?)([A-Za-z\s.ÓóÚúÍíÁáÉéÑñ()]+)(\|?)/gm,
          );

          for ( const matchedValue of matcher ) {
            mapperObject.set(
              matchedValue[ 2 ].trim(), matchedValue[ 5 ].trim()
            );
          }

          const objectify = Object.fromEntries(
            mapperObject
          );

          return (
            <div className={layout.sectionColumn}>
              <h1 className={typography.titleMedium}>
                {fixDemandado(
                  sujetosProcesales
                )}
              </h1>
              <pre>{ JSON.stringify(
                objectify
              )}</pre>
              <div className={layout.segmentRow}>{children}</div>
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
      const procesos = await getProceso(
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
