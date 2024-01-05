'use client';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { CarpetasTable } from '#@/components/Carpetas/client/carpetasList';
import { inputElement,
  slider,
  switchBox, } from '#@/components/form/form.module.css';
import { carpetasChopper } from '#@/lib/chopper-test';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { fixMoney } from '#@/lib/project/helper';
import Link from 'next/link';
import { useCarpetaSort } from '../context/carpetas-sort-context';

export default function Page(
  {
    searchParams,
  }: {
    searchParams: {
      pageSegment: string | undefined;
      sort: 'asc' | 'dsc' | undefined;
    };
  }
) {
      const carpetas = useCarpetaSort();

      const choped = carpetasChopper(
        {
          carpetas: carpetas,
        }
      );

      const pageRows = [];

      const totalPages = choped.length;

      for ( let index = 0; index < totalPages; index++ ) {
        pageRows.push(
          <td key={index}>
            <Link
              href={`/Carpetas?pageSegment=${ index }`}

            >
              {index}
            </Link>
          </td>,
        );
      }

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
                <th>numero</th>
                <th>nombre</th>
                <th>revisado</th>
                <th>tipo proceso</th>
                <th>terminado</th>
                <th>fecha ultima Actuacion</th>
                <th>expediente</th>
                <th>categoria</th>
                <th>Capital Adeudado</th>
              </tr>
            </thead>
            <tbody>
              <CarpetasTable />
              {carpetas.map(
                (
                  carpeta
                ) => {
                          const {
                            demanda
                          } = carpeta;
                          return (
                            <tr key={ carpeta.id }>
                              <td>{carpeta.numero}</td>
                              <td>
                                <Link href={`/Carpeta/${ carpeta.numero }`}>
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
                                {demanda?.capitalAdeudado
                                  ? fixMoney(
                                    {
                                      valor: Number(
                                        demanda.capitalAdeudado
                                      ),
                                    }
                                  )
                                  : fixMoney(
                                    {
                                      valor: 1000,
                                    }
                                  )}
                              </td>

                            </tr>
                          );
                }
              )}
            </tbody>
            <tfoot>
              <tr>{pageRows}</tr>
            </tfoot>
          </table>

        </>
      );
}
