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
            <tr>
              <th>Razon Social</th>
              <th>valor Base</th>
              <th>valor IVA</th>
              <th>valor otros impuestos</th>
              <th>valor Total</th>
              <th>fecha</th>
            </tr>
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
                            <td>{ fixMoney(
                              {
                                valor: parseFloat(
                                  factura.valorTotal
                                )
                              }
                            ) }</td>
                            <td>{ OutputDateHelper(

                              factura.fecha

                            ) }</td>
                          </tr>
                        );
              }
            ) }
          </tbody>


        </table>
      );
}