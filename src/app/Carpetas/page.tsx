'use client';
import { CarpetasTable } from '#@/components/Carpetas/client/carpetasList';
import { carpetasChopper } from '#@/lib/chopper-test';
import Link from 'next/link';
import { useCarpetaSort } from '../context/carpetas-sort-context';
import { TableRowCarpetaSortingButton } from '#@/components/Carpetas/client/carpetasButtonsSort';

export default function Page() {
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
              <CarpetasTable />
            </tbody>
            <tfoot>
              <tr>{pageRows}</tr>
            </tfoot>
          </table>

        </>
      );
}
