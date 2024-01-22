'use client';

import { useNuevaFacturaContext } from './nueva-factura-context-provider';
import typography from '#@/styles/fonts/typography.module.css';
import formStyles from '#@/components/Form/form.module.css';
import { parseFacturaElectronica } from './helper/factura-electronica-parser';


export const ParseTextarea = () => {


          const {
            valorState, setValorState
          } = useNuevaFacturaContext();

          return (

            <fieldset className={formStyles.segmentColumn}>
              <legend className={ typography.headlineMedium }>factura electronica</legend>
              <div className={ formStyles.segmentRow}>

                <label htmlFor={'facturaElectronica'} className={formStyles.label}>Factura Electronica</label>
                <textarea rows={20} cols={20} name='facturaElectronica' className={formStyles.textArea} placeholder='pegue en este espacio el texto que aparece con el codigo qr de la factura electronica' value={ valorState.facturaElectronica } onChange={
                  (
                    e
                  ) => {
                            const {
                              value
                            } = e.target;

                            const parsedValues = parseFacturaElectronica(
                              value
                            );
                            return setValorState(
                              {
                                ...valorState,
                                ...parsedValues
                              }
                            );
                  }
                }
                />
              </div>
            </fieldset>
          );
};
