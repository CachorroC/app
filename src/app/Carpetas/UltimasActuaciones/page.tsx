import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { FechaActuacionComponent } from './actuaciones';
import { Suspense } from 'react';
import { ActuacionLoader } from '#@/components/Actuaciones/actuacion-loader';
import typography from '#@/styles/fonts/typography.module.css';
import styles from '#@/components/Card/card.module.css';
import { ClientCardRow } from '#@/components/Card/client-card';
import { RevisadoCheckBox } from '../revisado-checkbox';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { Route } from 'next';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { TableRowCarpetaSortingButton } from '#@/components/Carpetas/client/carpetasButtonsSort';
import { Loader } from '#@/components/Loader/main-loader';
import OutputDateHelper from '#@/lib/project/output-date-helper';

export type SortActionType = {
  dir: 'asc' | 'dsc';
  sortingKey:
    | 'fecha'
    | 'numero'
    | 'nombre'
    | 'category'
    | 'id'
    | 'tipoProceso'
    | 'updatedAt';
};

function sortCarpetas(
  carpetas: MonCarpeta[], action: SortActionType 
) {
  const {
    dir, sortingKey 
  } = action;

  const asc = [
    -1,
    0,
    1
  ];

  const dsc = [
    1,
    0,
    -1
  ];

  const sorter = dir === 'asc'
    ? asc
    : dsc;

  const categoriesSorter: string[] = [
    'todos',
    'Bancolombia',
    'Reintegra',
    'SinEspecificar',
    'LiosJuridicos',
    'Insolvencia',
    'Terminados',
  ];

  switch ( sortingKey ) {
      case 'fecha': {
        return [
          ...carpetas
        ].sort(
          (
            a, b 
          ) => {
            if ( !a.fecha || a.fecha === undefined ) {
              return sorter[ 2 ];
            }

            if ( !b.fecha || b.fecha === undefined ) {
              return sorter[ 0 ];
            }

            const x = a.fecha;

            const y = b.fecha;

            if ( x < y ) {
              return sorter[ 2 ];
            }

            if ( x > y ) {
              return sorter[ 0 ];
            }

            return sorter[ 1 ];
          } 
        );
      }

      case 'category': {
        return [
          ...carpetas
        ].sort(
          (
            a, b 
          ) => {
            const x = categoriesSorter.indexOf(
              a.category 
            );

            const y = categoriesSorter.indexOf(
              b.category 
            );

            if ( x < y ) {
              return sorter[ 2 ];
            }

            if ( x > y ) {
              return sorter[ 0 ];
            }

            return sorter[ 1 ];
          } 
        );
      }

      case 'numero': {
        return [
          ...carpetas
        ].sort(
          (
            a, b 
          ) => {
            const x = a.numero;

            const y = b.numero;

            const idk = dir
              ? x - y
              : y - x;

            return idk;
          } 
        );
      }

      case 'nombre': {
        return [
          ...carpetas
        ].sort(
          (
            a, b 
          ) => {
            const x = a.nombre;

            const y = b.nombre;

            if ( x < y ) {
              return sorter[ 2 ];
            }

            if ( x > y ) {
              return sorter[ 0 ];
            }

            return sorter[ 1 ];
          } 
        );
      }

      default: {
        return [
          ...carpetas
        ].sort(
          (
            a, b 
          ) => {
            const aSortingKey = a[ sortingKey ];

            const bSortingKey = b[ sortingKey ];

            if ( !aSortingKey || aSortingKey === undefined ) {
              return sorter[ 2 ];
            }

            if ( !bSortingKey || bSortingKey === undefined ) {
              return sorter[ 0 ];
            }

            if ( aSortingKey < bSortingKey ) {
              return sorter[ 2 ];
            }

            if ( aSortingKey > bSortingKey ) {
              return sorter[ 0 ];
            }

            return 0;
          } 
        );
      }
  }
}

export default async function Page(
  {
    searchParams,
  }: {
  searchParams: {
    [key: string]: string | string[] | undefined;
    dir?: 'asc' | 'dsc';
    sortingKey?:
      | 'fecha'
      | 'numero'
      | 'nombre'
      | 'category'
      | 'id'
      | 'tipoProceso'
      | 'updatedAt';
  };
} 
) {
  const rawCarpetas = await getCarpetas();

  const carpetas = sortCarpetas(
    rawCarpetas, {
      dir: searchParams.dir
        ? searchParams.dir
        : 'asc',
      sortingKey: searchParams.sortingKey
        ? searchParams.sortingKey
        : 'fecha',
    } 
  );

  return (
    <table>
      <thead>
        <tr>
          <Suspense fallback={<Loader />}>
            <TableRowCarpetaSortingButton sortKey={'numero'} />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <TableRowCarpetaSortingButton sortKey={'nombre'} />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <TableRowCarpetaSortingButton sortKey={'fecha'} />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <TableRowCarpetaSortingButton sortKey={'category'} />
          </Suspense>
          <th>Actuaciones</th>
          <th>Revisado</th>
          <th>expediente</th>
        </tr>
      </thead>
      <tbody>
        {carpetas.flatMap(
          (
            carpeta 
          ) => {
            const {
              idProcesos,
              numero,
              nombre,
              fecha,
              llaveProceso,
              category,
              revisado,
            } = carpeta;

            return idProcesos.map(
              (
                idProceso 
              ) => {
                return (
                  <ClientCardRow
                    key={idProceso}
                    rowHref={`/Carpeta/${ numero }` as Route}
                    carpeta={carpeta}
                  >
                    <td>{numero}</td>
                    <td>{nombre}</td>
                    <td>
                      <OutputDateHelper incomingDate={fecha} />
                    </td>
                    <td>{category}</td>

                    <td>
                      <CopyButton
                        copyTxt={llaveProceso}
                        name={'expediente'}
                      />
                    </td>
                    <td>
                      {idProcesos.length === 0
                        ? (
                            <>
                              <h5
                                className={` ${ styles.actuacion } ${ typography.titleSmall }`}
                              >
                        Sin idProceso
                              </h5>
                              <sub className={typography.labelSmall}>0 de 0</sub>
                              <sub className={typography.labelMedium}>
                        por favor revise que el numero de expediente esté bien o
                        si la informacion la brinda el juzgado por otro canal
                              </sub>
                            </>
                          )
                        : (
                            <Suspense fallback={<ActuacionLoader />}>
                              <FechaActuacionComponent
                                idProceso={idProceso}
                                key={idProceso}
                              />
                            </Suspense>
                          )}
                    </td>
                    <td>
                      <RevisadoCheckBox
                        numero={numero}
                        initialRevisadoState={revisado}
                      />
                    </td>
                  </ClientCardRow>
                );
              } 
            );
          } 
        )}
      </tbody>
    </table>
  );
}
