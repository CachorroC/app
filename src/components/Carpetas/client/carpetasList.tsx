'use client';
import { useCarpetaSort } from '#@/app/Context/carpetas-sort-context';
import { Suspense } from 'react';
import { ClientCardRow } from '#@/components/Card/client-card';
import { Route } from 'next';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { RevisadoCheckBox } from '#@/app/Carpetas/revisado-checkbox';
import { Loader } from '#@/components/Loader/main-loader';
import { TableRowCarpetaSortingButton } from '../../../app/Carpetas/@right/carpetasButtonsSort';
import { ActuacionTableComponent,
  ActuacionTableErrorComponent, } from '#@/components/Actuaciones/actuacion-table-component';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import { JuzgadoComponent,
  JuzgadoErrorComponent, } from '#@/components/Proceso/juzgado-component';
import styles from './styles.module.css';

export function CarpetasTable() {
  const {
    carpetas
  } = useCarpetaSort();

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
            <TableRowCarpetaSortingButton sortKey={'category'} />
          </Suspense>
          <th
            scope="col"
            className={styles.highlight}
          >
            Actuaciones
          </th>
          <th
            scope="col"
            className={styles.highlight}
          >
            Revisado
          </th>
          <th
            scope="col"
            className={styles.highlight}
          >
            expediente
          </th>
          <th
            scope="col"
            className={styles.highlight}
          >
            Fecha de ultima Actuacion
          </th>
          <th
            scope="col"
            className={styles.highlight}
          >
            ciudad
          </th>
          <th
            scope="col"
            className={styles.highlight}
          >
            Juzgado
          </th>
        </tr>
      </thead>
      <tbody>
        {carpetas.map( ( carpeta ) => {
          const {
            ultimaActuacion,
            numero,
            nombre,
            id,
            category,
            fecha,
            llaveProceso,
            revisado,
            juzgado,
          } = carpeta;

          const words = nombre
            .split( ' ' )
            .map( ( palabra ) => {
              return (
                palabra.charAt( 0 )
                  .toUpperCase()
                + palabra.toLowerCase()
                  .substring( 1 )
              );
            } )
            .join( ' ' );

          return (
            <ClientCardRow
              key={numero}
              rowHref={`/Carpeta/${ numero }` as Route}
              carpeta={carpeta}
            >
              <td>{words}</td>

              <td>{category}</td>

              {ultimaActuacion
                ? (
                    <ActuacionTableComponent
                      key={numero}
                      numero={numero}
                      title={ultimaActuacion.actuacion}
                      content={ultimaActuacion.anotacion}
                      idProceso={ultimaActuacion.idProceso}
                    />
                  )
                : (
                    <ActuacionTableErrorComponent />
                  )}

              <td>
                <RevisadoCheckBox
                  numero={numero}
                  id={id}
                  initialRevisadoState={revisado}
                />
              </td>
              <td>
                <CopyButton
                  copyTxt={llaveProceso}
                  name={'expediente'}
                />
              </td>
              <td>
                <OutputDateHelper incomingDate={fecha} />
              </td>
              <td>{carpeta.demanda.municipio}</td>
              <td>
                {juzgado
                  ? (
                      <JuzgadoComponent
                        key={numero}
                        juzgado={juzgado}
                      />
                    )
                  : (
                      <JuzgadoErrorComponent />
                    )}
              </td>
            </ClientCardRow>
          );
        } )}
      </tbody>
    </table>
  );
}
