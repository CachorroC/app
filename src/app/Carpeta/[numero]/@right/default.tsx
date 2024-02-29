import typography from '#@/styles/fonts/typography.module.css';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { notFound } from 'next/navigation';
import layout from '#@/styles/layout.module.css';
import {  Suspense } from 'react';
import { Loader } from '#@/components/Loader';
import { ProcesosComponent } from '#@/components/Proceso/server-components';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { ProcesosCardSkeleton } from '#@/components/Proceso/skeleton';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { getNotas } from '#@/lib/project/utils/Notas/getNotas';
import { SearchOutputListSkeleton } from '#@/components/layout/search/SearchProcesosOutputSkeleton';
import { Nota } from '#@/app/Notas/nota';
import { NotasSortProvider } from '#@/app/Context/notas-sort-context';
import card from 'components/Card/card.module.css';
import { NotasLinkList } from '../notas-list';

async function NotasList(
  {
    carpetaNumero
  }: { carpetaNumero: number }
) {
      const notas = await getNotas(
        carpetaNumero
      );

      return (
        <NotasSortProvider notas={ notas }>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Numero</th>
                <th>contenido</th>
                <th>children</th>
                <th>eliminar</th>
              </tr>
            </thead>
            <tbody>
              {notas.map(
                (
                  nota
                ) => {
                          return (
                            <Nota
                              nota={nota}
                              key={nota.id}
                            >
                              <td>{OutputDateHelper(
                                nota.dueDate
                              )}</td>
                            </Nota>
                          );
                }
              )}
            </tbody>
          </table>

        </NotasSortProvider>
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
          mandamientoPago.forEach(
            (
              mandamiento, index
            ) => {
                      allFechas.add(
                        {
                          name: `mandamientoPago.${ index }`,
                          date: new Date(),
                        }
                      );
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

      const fechasMaper = [ ...allFechasArray ].sort(
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

          {llaveProceso && (
            <div className={card.container}>
              <Suspense fallback={<Loader />}>
                <CopyButton
                  key={numero}
                  name={'numero de expediente'}
                  copyTxt={llaveProceso}
                />
              </Suspense>
            </div>
          )}
          <div className={ card.container }>
            <h1>Notas</h1>
            <Suspense fallback={<SearchOutputListSkeleton />}>
              <NotasList carpetaNumero={Number(
                numero
              )} />
            </Suspense>
            <Suspense fallback={<Loader />}>
              <NotasLinkList
                carpetaNumero={Number(
                  numero
                )}
                key={numero}
              />
            </Suspense>
          </div>
          <div className={card.container}>
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
          </div>

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
