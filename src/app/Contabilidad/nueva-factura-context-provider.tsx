'use client';
import { intFactura  } from '#@/lib/types/contabilidad';
import { ReactNode, createContext, useState, Dispatch, SetStateAction, useContext, } from 'react';



const NuevaFacturaContext = createContext<{valorState: intFactura, setValorState: Dispatch<SetStateAction<intFactura>>}| null>(
  null
);

export function NuevaFacturaProvider(
  {
    children
  }: { children: ReactNode }
) {
      const [ valorState, setValorState ] = useState<intFactura>(
        {
          valorTotal        : 0,
          valorBase         : 0,
          hasIva            : false,
          hasOtroImp        : false,
          hasImpoConsumo    : 0,
          ciudad            : '',
          CUFE              : '',
          dv                : 0,
          fecha             : new Date(),
          id                : '',
          nit               : 0,
          QRCode            : '',
          razonSocial       : '',
          valorIva          : 0,
          valorOtroImp      : 0,
          concepto          : '',
          facturaElectronica: []

        }
      );

      return (
        <NuevaFacturaContext.Provider value={{
          valorState,
          setValorState
        }}>
          {children}
        </NuevaFacturaContext.Provider>
      );
}



export function useNuevaFacturaContext () {
      const context = useContext(
        NuevaFacturaContext
      );

      if ( !context ) {
        throw new Error(
          'Nueva intFactura context must be used within a nueva factura provider'
        );

      }

      return context;
}