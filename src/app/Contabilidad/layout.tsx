import { ReactNode } from 'react';
import { FacturasProvider } from './facturas-context-provider';
import layout from '#@/styles/layout.module.css';
import { NuevaFacturaProvider } from './nueva-factura-context-provider';
import { ButtonScan, CopyButtonContabilidad } from './button-scanner';
import typography from '#@/styles/fonts/typography.module.css';
import { facturasCollection } from '#@/lib/connection/collections';
import { prisma } from '#@/lib/connection/prisma';

export default async function Layout(
  {
    children,
    derecho,
  }: {
    children: ReactNode;
    derecho: ReactNode;
  } 
) {
      const collection = await facturasCollection();

      const arr1 = await collection.find()
            .toArray();

      const arr2 = await prisma.factura.findMany();

      const facturas = arr1.map(
        (
          item 
        ) => {
                  const matchedObject = arr2.find(
                    (
                      obj 
                    ) => {
                              return obj.id === item.id;
                    } 
                  );
                  return {
                    ...item,
                    ...matchedObject,
                  };
        } 
      );
      return (
        <FacturasProvider
          initialFacturas={[ ...facturas ].map(
            (
              factura 
            ) => {
                      return {
                        ...factura,
                        _id               : factura.id,
                        valorTotal        : factura.valorTotal.toString(),
                        valorBase         : factura.valorBase.toString(),
                        valorIva          : factura.valorIva?.toString() ?? '0',
                        valorOtroImp      : factura.valorOtroImp?.toString() ?? '0',
                        facturaElectronica: factura.facturaElectronica ?? '',
                        carpetaNumero     : factura.carpetaNumero ?? 0,
                        CUFE              : factura.CUFE ?? '',
                        QRCode            : factura.QRCode ?? '',
                        nombreComercial   : factura.nombreComercial ?? '',
                      };
            } 
          )}
        >
          <NuevaFacturaProvider>
            <div className={layout.top}>
              <h1 className={typography.titleLarge}>Contabilidad</h1>
              <CopyButtonContabilidad />
            </div>
            <div className={layout.left}>{children}</div>
            <ButtonScan />
            <div className={layout.right}>{derecho}</div>
          </NuevaFacturaProvider>
        </FacturasProvider>
      );
}
