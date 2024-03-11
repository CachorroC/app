'use client';
import { useCarpetaSort } from '#@/app/Context/carpetas-sort-context';
import {  useDeferredValue } from 'react';
import typography from '#@/styles/fonts/typography.module.css';
import { ClientCardRow } from '#@/components/Card/client-card';
import  OutputDateHelper from '#@/lib/project/output-date-helper';
import { Route } from 'next';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { RevisadoCheckBox } from '#@/app/Carpetas/revisado-checkbox';
import { useRouter } from 'next/navigation';

export function ActuacionTableComponent (
  {
    numero, title, content, idProceso
  }: {
    numero: number;
    title: string;content: string | null; idProceso: number
  }
) {
      const router = useRouter();
      return (
        <td onClick={ () => {
                  return router.push(
                    `/Carpeta/${ numero }/ultimasActuaciones/${ idProceso }` as Route
                  );
        }}>
          <h2 className={ typography.titleMedium }>
            {title}
          </h2>

          { content && (
            <span className={typography.labelSmall}>
              {content}
            </span>
          )}

        </td>
      );
}

export function ActuacionTableErrorComponent () {
      return (
        <td>
          <h5 className={typography.headlineSmall} style={{
            backgroundColor: 'var(--error-container)',
            color          : 'var(--on-error-container)',
            borderBottom   : 'solud 0.2rem var(--error)'
          } }>
    Sin actuaciones
          </h5>
          <span className={typography.labelSmall}>
    Esta carpeta no tiene registros en la Rama Judicial
          </span>
        </td>
      );
}

export function CarpetasTable() {
      const {
        carpetas,
      } = useCarpetaSort();

      const deferredCarpetas = useDeferredValue(
        carpetas
      );



      return (
        <>
          { deferredCarpetas.map(
            (
              carpeta
            ) => {
                      const {
                        ultimaActuacion, numero, nombre, fecha, category, llaveProceso, revisado,
                      } = carpeta;
                      return (
                        <ClientCardRow
                          key={numero }
                          rowHref={`/Carpeta/${ numero }` as Route}
                          carpeta={carpeta}
                        >
                          <td>{nombre.trim()
                                .toLocaleLowerCase()}</td>
                          <td>
                            <OutputDateHelper incomingDate={ fecha } className={typography.bodySmall } />
                          </td>
                          <td>{category}</td>

                          { ultimaActuacion
                            ? <ActuacionTableComponent numero={ numero } title={ ultimaActuacion.actuacion } content={ ultimaActuacion.anotacion } idProceso={ ultimaActuacion.idProceso}/>
                            : <ActuacionTableErrorComponent/>
                          }
                          <td>
                            <RevisadoCheckBox
                              numero={numero}
                              initialRevisadoState={revisado}
                            />
                          </td>
                          <td>
                            <CopyButton
                              copyTxt={llaveProceso}
                              name={'expediente'}
                            />
                          </td>
                        </ClientCardRow>
                      );
            }
          ) }

        </> );
}

export function CompleteCarpetasRows () {
      const {
        completeCarpetas
      } = useCarpetaSort();
      return ( <>
        { completeCarpetas.map(
          (
            carpeta, index
          ) => {
                    return (
                      <pre key={index}>{JSON.stringify(
                        carpeta, null, 2
                      )}</pre>
                    );
          }
        ) }
      </> );
}