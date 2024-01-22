import { prisma } from '#@/lib/connection/prisma';
import { Route } from 'next';
import typography from '#@/styles/fonts/typography.module.css';
import Link from 'next/link';
import { inputElement, slider, switchBox } from '#@/components/Form/form.module.css';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { fixMoney } from '#@/lib/project/helper';
import styles from '#@/styles/layout.module.css';

export default async function PrismaCarpetas() {
      const rawCarpetas = await prisma.carpeta.findMany(
        {
          include: {
            ultimaActuacion: true,
            deudor         : true,
            codeudor       : true,
            notas          : true,
            tareas         : true,
            demanda        : {
              include: {
                notificacion: {
                  include: {
                    notifiers: true
                  }
                },
                medidasCautelares: true
              }
            },
            procesos: {
              include: {
                juzgado: true
              }
            },
          }
        }
      );

      const carpetas = [ ...rawCarpetas ].sort(
        (
          a, b
        ) => {
                  if ( !a.fecha || a.fecha === undefined ) {
                    return 1;
                  }

                  if ( !b.fecha || b.fecha === undefined ) {
                    return -1;
                  }

                  const x = a.fecha;

                  const y = b.fecha;

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
        <>{
          carpetas.map(
            (
              carpeta
            ) => {

                      const llaveLength = carpeta.llaveProceso?.length;

                      const errorLLaveProceso = llaveLength
                        ? llaveLength < 23
                        : true;

                      const {
                        numero, idProcesos
                      } = carpeta;

                      const idProcesosLength = idProcesos.length;
                      let carpetaHref;

                      if ( idProcesosLength === 1 ) {
                        carpetaHref = `/Carpeta/${ carpeta.numero }/ultimasActuaciones/${ idProcesos[ 0 ] }`;
                      } else {
                        carpetaHref = `/Carpeta/${ carpeta.numero }`;
                      }

                      return (
                        <tr key={carpeta.numero}>
                          <td>
                            {' '}
                            <Link
                              href={`/Carpeta/${ numero }` as Route}
                            >

                              {`#${ carpeta.numero }`}

                              <span className='material-symbols-outlined'>
            folder
                              </span>
                            </Link>
                          </td>
                          <td>
                            <Link
                              href={carpetaHref as Route}
                              className={typography.titleMedium}
                            >
                              {carpeta.nombre}
                            </Link>
                          </td>
                          <td>
                            <label className={switchBox}>
                              <input
                                className={inputElement}
                                defaultChecked={carpeta.revisado}
                                type="checkbox"
                              />
                              <span className={slider}></span>
                            </label>
                          </td>
                          <td>{carpeta.tipoProceso}</td>
                          <td>
                            {' '}
                            <label className={switchBox}>
                              <input
                                className={inputElement}
                                defaultChecked={carpeta.terminado}
                                type="checkbox"
                              />
                              <span className={slider}></span>
                            </label>
                          </td>

                          <td>{OutputDateHelper(
                            carpeta.fecha
                          )}</td>
                          <td>
                            <CopyButton
                              copyTxt={carpeta.llaveProceso}
                              name={'expediente'}
                            />
                          </td>
                          <td>{carpeta.category}</td>
                          <td>
                            {carpeta.demanda?.capitalAdeudado
          && fixMoney(
            {
              valor: Number(
                carpeta.demanda.capitalAdeudado
              ),
            }
          )}
                          </td>
                          <td>



                            {errorLLaveProceso && (
                              <Link
                                href={`/Carpeta/${ numero }/Editar` as Route}
                                className={styles.link}
                              >
                                {'error con el numero de expediente'}
                              </Link>
                            )}
                          </td>
                        </tr> );
            }
          )
        }</>
      );
}