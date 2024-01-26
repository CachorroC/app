
import { TableRowCarpetaSortingButton } from '#@/components/Carpetas/client/carpetasButtonsSort';
import {  CarpetasTable } from '#@/components/Carpetas/client/carpetasList';

export default  function Page () {



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
                <th>tipo proceso</th>
                <th>terminado</th>
                <TableRowCarpetaSortingButton sortKey={ 'fecha' } />

                <th>expediente</th>
                <TableRowCarpetaSortingButton sortKey={'category'}/>
                <th>Capital Adeudado</th>
                <th>Actuaciones</th>
                <th>Revisado</th>
              </tr>
            </thead>
            <tbody>
              <CarpetasTable />
            </tbody>
          </table>

        </>
      );
}
