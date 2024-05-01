import typography from '#@/styles/fonts/typography.module.css';
import { outProceso } from 'types/procesos';
import { getProceso } from '#@/lib/project/utils/Procesos';
import { ReactNode, Suspense } from 'react';
import { ActuacionLoader } from '../Actuaciones/actuacion-loader';
import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import { JuzgadoComponent } from './juzgado-component';
import { Loader } from '../Loader';
import layout from '#@/styles/layout.module.css';
import { containerEnabled } from '../Card/outlined.module.css';

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

          const objectify = Array.from(
            mapperObject.entries()
          );

          return (
            <div className={containerEnabled}>
              <div className={layout.sectionRow}>
                { objectify.map(
                  (
                    object
                  ) => {
                            const [ key, value ] = object;
                            return (
                              <div className={layout.sectionRow} key={ key }>
                                <sub style={{
                                  color: 'var(--primary)'
                                }} className={typography.labelSmall}>{ key }</sub>
                                <h5 className={typography.titleMedium}>{value}</h5>
                              </div>
                            );
                  }
                ) }
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
