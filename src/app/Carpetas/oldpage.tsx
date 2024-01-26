import { TableRowCarpetaSortingButton } from '#@/components/Carpetas/client/carpetasButtonsSort';
import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';
import { Suspense } from 'react';
import { FechaActuacionComponentAlt } from './UltimasActuaciones/actuaciones';
import { carpetasReducer } from '../server/carpetasReducer';
import { SearchOutputListSkeleton } from '#@/components/layout/search/SearchProcesosOutputSkeleton';
import { CardRow } from '#@/components/Card';
import ActuacionLoader from '#@/components/Card/actuacion-loader';
import typography from '#@/styles/fonts/typography.module.css';

export default async function Page (
  {
    searchParams
  }: { searchParams: {  type?: 'sort';
    dir?: 'asc' | 'dsc';
    sortingKey?:
    | 'fecha'
    | 'numero'
    | 'nombre'
    | 'category'
    | 'id'
    | 'tipoProceso'
    | 'updatedAt'; }}
) {
      const {
        type, dir, sortingKey
      } = searchParams;

      const initialSortingType = {
        type: type
          ?type
          :'sort',
        dir: dir
          ? dir
          : 'dsc',
        sortingKey: sortingKey
          ? sortingKey
          : 'fecha',
      };

      const rawCarpetas = await getCarpetas();

      const carpetas= carpetasReducer(
        rawCarpetas, initialSortingType
      );

      return (
        <>

          <table
            style={{
              gridColumn: '1 / span 4',
              gridRow   : '1 / span 5',
            }}
          >
            <thead>
              <tr>
                <TableRowCarpetaSortingButton sortKey={ 'numero' } />
                <TableRowCarpetaSortingButton sortKey={ 'nombre' } />
                <th>revisado</th>
                <th>tipo proceso</th>
                <th>terminado</th>
                <TableRowCarpetaSortingButton sortKey={ 'fecha' } />

                <th>expediente</th>
                <TableRowCarpetaSortingButton sortKey={'category'}/>
                <th>Capital Adeudado</th>
                <th>Actuaciones</th>
              </tr>
            </thead>
            <tbody>
              <Suspense fallback={<SearchOutputListSkeleton />}>

                {carpetas.flatMap(
                  (
                    carpeta, index
                  ) => {
                            const {
                              idProcesos, numero
                            } = carpeta;

                            if ( idProcesos.length === 0 ) {
                              return (
                                <CardRow
                                  carpeta={carpeta}
                                  key={numero}
                                >
                                  <span className={typography.headlineSmall}>Sin Actuacion</span>
                                </CardRow>
                              );
                            }

                            return idProcesos.map(
                              (
                                idProceso
                              ) => {
                                        return (
                                          <CardRow
                                            key={idProceso}
                                            carpeta={carpeta}
                                          >
                                            <Suspense fallback={<ActuacionLoader />}>
                                              <FechaActuacionComponentAlt
                                                idProceso={idProceso}
                                                index={index}
                                              />

                                            </Suspense>
                                          </CardRow>
                                        );
                              }
                            );
                  }
                )}
              </Suspense>
            </tbody>

          </table>

        </>
      );
}
