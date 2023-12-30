import typography from '#@/styles/fonts/typography.module.css';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { notFound } from 'next/navigation';
import layout from '#@/styles/layout.module.css';
import { Fragment, Suspense } from 'react';
import { Loader } from '#@/components/Loader';
import { ProcesosComponent } from '#@/components/Proceso/server-components';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { ProcesosCardSkeleton } from '#@/components/Proceso/skeleton';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { getNotas } from '#@/lib/project/utils/Notas/getNotas';
import { Task } from '#@/components/Nota/nota';
import { SearchOutputListSkeleton } from '#@/components/layout/search/SearchProcesosOutputSkeleton';
import InformationComponent from '../information-component';
import { fixFechas } from '#@/lib/project/helper';

async function NotasList(
  {
    carpetaNumero
  }: { carpetaNumero: number }
) {
      const notas = await getNotas(
        carpetaNumero
      );
      return (
        <>
          {notas.map(
            (
              nota
            ) => {
                      return (
                        <Task
                          key={nota.id}
                          task={nota}
                        />
                      );
            }
          )}
        </>
      );
}

export default async function Page(
  {
    params: {
      numero
    },
  }: {
    params: { numero: string };
  }
) {
      const carpeta = await getCarpetabyNumero(
        Number(
          numero
        )
      );

      if ( !carpeta ) {
        notFound();
      }

      const {
        llaveProceso, demanda, fecha, updatedAt
      } = carpeta;

      const allFechas = new Set<{ name: string; date: Date }>();
      allFechas.add(
        {
          name: 'updatedAt',
          date: new Date(
            updatedAt
          ),
        }
      );

      if ( fecha ) {
        allFechas.add(
          {
            name: 'fechaUltimaActualizacion',
            date: new Date(
              fecha
            ),
          }
        );
      }

      if ( demanda ) {
        const {
          vencimientoPagare,
          entregaGarantiasAbogado,
          fechaPresentacion,
          mandamientoPago,
        } = demanda;

        if ( entregaGarantiasAbogado !== null ) {
          allFechas.add(
            {
              name: 'entregaGarantiasAbogado',
              date: new Date(
                entregaGarantiasAbogado
              ),
            }
          );
        }

        if ( fechaPresentacion !== null ) {
          fechaPresentacion.forEach(
            (
              fechaP
            ) => {
                      allFechas.add(
                        {
                          name: 'fechaPresentacion',
                          date: new Date(
                            fechaP
                          ),
                        }
                      );
            }
          );
        }

        if ( mandamientoPago !== null ) {
          allFechas.add(
            {
              name: 'mandamientoPago',
              date: new Date(
                mandamientoPago
              ),
            }
          );
        }

        for ( const vencimiento of vencimientoPagare ) {
          const indexOfVencimiento = vencimientoPagare.indexOf(
            vencimiento
          );

          if ( vencimiento === null ) {
            continue;
          }

          allFechas.add(
            {
              name: `vencimientoPagare.${ indexOfVencimiento }`,
              date: new Date(
                vencimiento
              ),
            }
          );
          continue;
        }
      }

      const allFechasArray = Array.from(
        allFechas
      );

      const fechasMaper = [
        ...allFechasArray
      ].sort(
        (
          a, b
        ) => {
                  const x = a.date.getTime();

                  const y = b.date.getTime();

                  if ( x < y ) {
                    return 1;
                  }

                  if ( x > y ) {
                    return -1;
                  }

                  return 0;
        }
      );

      return (
        <>
          <h2
            style={{
              gridArea: '1 / 1 / 2 / 4',
            }}
            className={typography.headlineMedium}
          >{`Carpeta número ${ numero }`}</h2>

          {updatedAt && <h3>{`actualizado a las ${ fixFechas(
            updatedAt
          ) }`}</h3>}

          <InformationComponent carpeta={carpeta} />

          {llaveProceso && (
            <Fragment key={llaveProceso}>
              <Suspense fallback={<Loader />}>
                <CopyButton
                  key={numero}
                  name={'numero de expediente'}
                  copyTxt={llaveProceso}
                />
              </Suspense>
            </Fragment>
          )}

          <Suspense fallback={<SearchOutputListSkeleton />}>
            <NotasList carpetaNumero={Number(
              numero
            )} />
          </Suspense>

          <section className={layout.sectionColumn}>
            <Suspense fallback={<Loader />}>
              {fechasMaper.map(
                (
                  fechaMap
                ) => {
                          return (
                            <div
                              key={fechaMap.name}
                              className={layout.segmentRow}
                            >
                              <h5 className={typography.titleMedium}>{fechaMap.name}</h5>
                              <p className={typography.labelMedium}>
                                {' '}
                                {OutputDateHelper(
                                  fechaMap.date
                                )}
                              </p>
                            </div>
                          );
                }
              )}
            </Suspense>
          </section>

          <Suspense fallback={<ProcesosCardSkeleton />}>
            {llaveProceso && (
              <ProcesosComponent
                key={llaveProceso}
                llaveProceso={llaveProceso}
              />
            )}
          </Suspense>
        </>
      );
}
