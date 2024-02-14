import { RawDb } from '#@/lib/types/rawDB';
import { JSX } from 'react';
import { read, utils } from 'xlsx';

const prefix = process.env.NODE_ENV === 'development'
  ? 'beta'
  : 'app';

export default async function JSXLSX() {
      const rows: JSX.Element[] = [];

      const request = await fetch(
        `https://${ prefix }.rsasesorjuridico.com/general.xlsx`
      );

      const arrBuff = await request.arrayBuffer();

      const wb = read(
        arrBuff
      );

      for ( const sheetName of wb.SheetNames ) {
        const ws = wb.Sheets[ sheetName ];

        const data = utils.sheet_to_json(
          ws
        ) as RawDb[]; // generate objects

        data.forEach(
          (
            carpeta, index
          ) => {
                    rows.push(
                      <tr key={ index }>
                        <td>{ carpeta[ 'NUMERO' ] }</td>
                        <td>{ carpeta[ 'DEMANDADO_NOMBRE' ] }</td>
                        <td>{ carpeta[ 'DEMANDADO_IDENTIFICACION' ] }</td>
                        <td>{ carpeta[ 'EXPEDIENTE' ] }</td>
                        <td>{carpeta[ 'RADICADO' ]}</td>
                        <td>
                          { carpeta[ 'JUZGADO_EJECUCION' ] ?? carpeta[ 'JUZGADO_ORIGEN' ] }
                        </td>
                        <td>
                          <pre>{carpeta[ 'OBSERVACIONES' ]?.replaceAll(
                            '//', '\n-'
                          )}</pre>
                        </td>
                      </tr>
                    );
          }
        );
      }

      return (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Cedula</th>
              <th>Expediente</th>
              <th>Radicado</th>
              <th>Juzgado</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      );

}