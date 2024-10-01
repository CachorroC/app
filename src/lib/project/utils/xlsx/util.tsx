'use client';
import { RawDb } from '#@/lib/types/rawDB';
import React, { useCallback, useEffect, useState } from 'react';
import { read, utils, writeFileXLSX } from 'xlsx';

export default function SheetJSReactAoO() {
  /* the component state is an array of presidents */
  const [
    pres,
    setPres
  ] = useState<RawDb[]>( [] );

  /* Fetch and update the state once */
  useEffect(
    () => {
      ( async () => {
        const f = await (
          await fetch( 'https://beta.rsasesorjuridico.com/general.xlsx' )
        ).arrayBuffer();

        const wb = read( f ); // parse the array buffer

        for ( const sheetName of wb.SheetNames ) {
          const ws = wb.Sheets[ sheetName ];

          const data = utils.sheet_to_json( ws ) as RawDb[]; // generate objects

          setPres( [
            ...pres,
            ...data
          ] ); // update state
        }
      } )();
    }, [
      pres
    ] 
  );

  /* get state data and export to XLSX */
  const exportFile = useCallback(
    () => {
      const ws = utils.json_to_sheet( pres );

      const wb = utils.book_new();

      utils.book_append_sheet(
        wb, ws, 'Data' 
      );
      writeFileXLSX(
        wb, 'SheetJSReactAoO.xlsx' 
      );
    }, [
      pres
    ] 
  );

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
        </tr>
      </thead>
      <tbody>
        {
          /* generate row for each president */
          pres.map( (
            pres, index 
          ) => {
            return (
              <tr key={index}>
                <td>{pres[ 'NUMERO' ]}</td>
                <td>{pres[ 'DEMANDADO_NOMBRE' ]}</td>
                <td>{pres[ 'DEMANDADO_IDENTIFICACION' ]}</td>
                <td>{pres[ 'EXPEDIENTE' ]}</td>
                <td>{pres[ 'RADICADO' ]}</td>
                <td>
                  <pre key={index}>{JSON.stringify(
                    pres, null, 2 
                  )}</pre>
                </td>
              </tr>
            );
          } )
        }
      </tbody>
      <tfoot>
        <td colSpan={2}>
          <button onClick={exportFile}>Export XLSX</button>
        </td>
      </tfoot>
    </table>
  );
}
