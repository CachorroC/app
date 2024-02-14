import { TableRowCarpetaSortingButton } from '#@/components/Carpetas/client/carpetasButtonsSort';
import { CarpetasTable } from '#@/components/Carpetas/client/carpetasList';

export default function Page() {
      return (
        <>
          <table
            style={{
              width : '100%',
              height: '100%',
            }}
          >
            <thead>
              <tr>
                <TableRowCarpetaSortingButton sortKey={'numero'} />
                <TableRowCarpetaSortingButton sortKey={'nombre'} />
                <TableRowCarpetaSortingButton sortKey={'fecha'} />
                <TableRowCarpetaSortingButton sortKey={'category'} />
                <th>Actuaciones</th>
                <th>Revisado</th>
                <th>expediente</th>
              </tr>
            </thead>
            <tbody>
              <CarpetasTable />
            </tbody>
          </table>
        </>
      );
}
