'use client';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { unstable_noStore as noStore } from 'next/cache';
import { useFacturaSort } from './facturas-context-provider';
import { fixMoney } from '#@/lib/project/helper';


export default function Page () {
      noStore();

      const facturas = useFacturaSort();
      return (
        <table>
          <thead>
            <th>Razon Social</th>
            <th>total</th>
            <th>fecha</th>
          </thead>
          <tbody>

            { facturas.map(
              (
                factura
              ) => {
                        return (
                          <tr key={ factura._id }>
                            <td>{ factura.razonSocial }</td>
                            <td>{ fixMoney(
                              {
                                valor: factura.valorIva
                              }
                            ) }</td>
                            <td>{ OutputDateHelper(
                              factura.fecha
                            ) }</td>
                            <td>{ fixMoney(
                              {
                                valor: factura.valorIva
                              }
                            ) }</td>
                            <td>{ fixMoney(
                              {
                                valor: factura.valorOtroImp
                              }
                            ) }</td>
                          </tr>
                        );
              }
            ) }
          </tbody>


        </table>
      );
}