'use client';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { unstable_noStore as noStore } from 'next/cache';
import { useFacturaSort } from './facturas-context-provider';
import { fixMoney } from '#@/lib/project/helper';
import { TableRowFacturaSortingButton } from './contabilidad-buttons-sort';
import { CopyButton } from '#@/components/Buttons/copy-buttons';


export default function Page () {
      noStore();

      const facturas = useFacturaSort();
      return (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Numero de Factura</th>
              <th>Razon Social</th>
              <th>Nombre Comun</th>
              <th>Valor Base</th>
              <th>Valor IVA</th>
              <th>Valor otros impuestos</th>
              <th>Valor Total</th>
              <TableRowFacturaSortingButton sortKey={ 'fecha' }/>
              <th>NIT</th>
            </tr>
          </thead>
          <tbody>

            { facturas.map(
              (
                factura, index
              ) => {
                        return (
                          <tr key={ factura._id }>
                            <td>{index}</td>
                            <td>{factura.id}</td>
                            <td>{ factura.razonSocial }</td>
                            <td>{
                              factura.nombreComercial
                                ? factura.nombreComercial
                                : 'sin nombre comercial'
                            }</td>

                            <td>{ fixMoney(
                              {
                                valor: parseFloat(
                                  factura.valorBase
                                )
                              }
                            ) }</td>

                            <td>{ fixMoney(
                              {
                                valor: parseFloat(
                                  factura.valorIva
                                )
                              }
                            ) }</td>
                            <td>{ fixMoney(
                              {
                                valor: parseFloat(
                                  factura.valorOtroImp
                                )
                              }
                            ) }</td>
                            <td><strong>{ fixMoney(
                              {
                                valor: parseFloat(
                                  factura.valorTotal
                                )
                              }
                            ) }</strong></td>
                            <td>{ OutputDateHelper(

                              factura.fecha

                            ) }</td>
                            <td><CopyButton copyTxt={ `${ factura.nit }-${ factura.dv }` } name={ `${ factura.nit }` } /></td>
                          </tr>
                        );
              }
            ) }
          </tbody>


        </table>
      );
}