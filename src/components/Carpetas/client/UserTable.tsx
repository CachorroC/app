'use client';
import { ClientCardRow } from '#@/components/Card/client-card';
import { Route } from 'next';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { RevisadoCheckBox } from '#@/app/Carpetas/revisado-checkbox';
import { ActuacionTableComponent,
  ActuacionTableErrorComponent, } from '#@/components/Actuaciones/actuacion-table-component';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import { JuzgadoComponent,
  JuzgadoErrorComponent, } from '#@/components/Proceso/juzgado-component';
import styles from './styles.module.css';
import { useTable } from '#@/app/Context/TableContext';
import { MonCarpeta } from '#@/lib/types/carpetas';

export const UsersTable = () => {
  // Explicitly tell the hook what type of data we are using
  const {
    visibleData, dispatch, state
  } = useTable<MonCarpeta>();

  const getSortIcon = (
    key: keyof MonCarpeta
  ) => {
    if ( state.sortConfig.key !== key ) {
      return '↕️';
    }

    return state.sortConfig.direction === 'asc'
      ? '⬆️'
      : '⬇️';
  };

  return (
    <table style={{
      borderCollapse: 'collapse',
      width         : '100%'
    }}
    >
      <thead>

        <tr style={{
          textAlign : 'left',
          background: '#f4f4f4'
        }}
        >
          <th onClick={() => {
            return dispatch(
              {
                type   : 'SORT',
                payload: 'numero'
              }
            );
          }} style={{
            cursor: 'pointer'
          }}
          >
            Name {getSortIcon(
              'numero'
            )}
          </th>
          <th onClick={() => {
            return dispatch(
              {
                type   : 'SORT',
                payload: 'nombre'
              }
            );
          }} style={{
            cursor: 'pointer'
          }}
          >
            Role {getSortIcon(
              'nombre'
            )}
          </th>
          <th onClick={() => {
            return dispatch(
              {
                type   : 'SORT',
                payload: 'fecha'
              }
            );
          }} style={{
            cursor: 'pointer'
          }}
          >
            Age {getSortIcon(
              'category'
            )}
          </th>
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
            className={ styles.highlight }
            onClick={() => {
              return dispatch(
                {
                  type   : 'SORT',
                  payload: 'fecha'
                }
              );
            } }
            style={ {
              cursor: 'pointer'
            }}
          >
            Fecha de ultima Actuacion{getSortIcon(
              'fecha'
            )}
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
        { visibleData.length === 0
          ? (
              <tr><td colSpan={3}>No data found</td></tr>
            )
          : ( visibleData.map(
              (
                carpeta
              ) => {
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
                  .split(
                    ' '
                  )
                  .map(
                    (
                      palabra: string
                    ) => {
                      return (
                        palabra.charAt(
                          0
                        )
                          .toUpperCase()
                + palabra.toLowerCase()
                  .substring(
                    1
                  )
                      );
                    }
                  )
                  .join(
                    ' '
                  );

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
              }
            ) )

        }
      </tbody>
    </table>
  );
};
