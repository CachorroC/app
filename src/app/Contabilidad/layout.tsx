import { ReactNode } from 'react';
import { FacturasProvider } from './facturas-context-provider';
import { facturasCollection } from '#@/lib/connection/collections';
import layout from '#@/styles/layout.module.css';
import { NuevaFacturaProvider } from './nueva-factura-context-provider';
import { NuevaFacturaOutput } from './nueva-factura-output';
import { ParseTextarea } from './parse-text';
import { ButtonScan, CopyButtonContabilidad } from './button-scanner';
import typography from '#@/styles/fonts/typography.module.css';

export default async function Layout (
  {
    children, derecho
  }: { children: ReactNode; derecho: ReactNode }
) {

      const collection = await facturasCollection();

      const facturas = await collection.find()
            .toArray();
      return (
        <FacturasProvider initialFacturas={
          [ ...facturas ].map(
            (
              factura
            ) => {
                      return {
                        ...factura,
                        _id: factura._id.toString()
                      };
            }
          )
        }>
          <NuevaFacturaProvider>
            <div className={ layout.top }>
              <h1 className={typography.titleLarge}>Contabilidad</h1>
              <ButtonScan />
              <CopyButtonContabilidad />
              <NuevaFacturaOutput />
            </div>
            <div className={ layout.left }>

              { children }

            </div>
            <div className={ layout.right }>

              { derecho}
              <ParseTextarea />
            </div>
          </NuevaFacturaProvider>
        </FacturasProvider>
      );
}