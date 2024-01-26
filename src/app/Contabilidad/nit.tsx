'use client';
import formStyles from '#@/components/Form/form.module.css';
import { useFacturaSort } from './facturas-context-provider';
import { useNuevaFacturaContext } from './nueva-factura-context-provider';

export default function Nit () {

      const {
        valorState, setValorState
      } = useNuevaFacturaContext();

      const facturas = useFacturaSort();



      return (
        <div className={formStyles.segmentRow}>
          <label className={formStyles.label} htmlFor={'nit'}>NIT</label>
          <input className={formStyles.textArea}
            name="nit"
            type="number"
            value={valorState.nit}
            onChange={ (
              e
            ) => {
                      const {
                        value
                      } = e.target;

                      const factura = facturas.find(
                        (
                          fact
                        ) => {
                                  return fact.nit === Number(
                                    value
                                  );
                        }
                      );

                      if ( factura ) {
                        return setValorState(
                          {
                            ...valorState,
                            nit: Number(
                              value
                            ),
                            dv: valorState.dv === 0
                              ? factura.dv
                              : valorState.dv,
                            razonSocial: valorState.razonSocial === ''
                              ? factura.razonSocial
                              : valorState.razonSocial,
                            nombreComercial: valorState.nombreComercial === ''
                              ? factura.nombreComercial
                              : valorState.nombreComercial,
                            ciudad: valorState.ciudad === ''
                              ? factura.ciudad
                              : valorState.ciudad,
                            direccion: valorState.direccion === ''
                              ? factura.direccion
                              : valorState.direccion,
                          }
                        );
                      }

                      return setValorState(
                        {
                          ...valorState,
                          nit: Number(
                            value
                          ),

                        }
                      );

            }}
          />
        </div>
      );
}