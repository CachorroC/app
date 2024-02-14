'use client';
import { intFactura } from '#@/lib/types/contabilidad';
import { ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect, } from 'react';
import { useFacturaSort } from './facturas-context-provider';

const NuevaFacturaContext = createContext<{
  valorState: intFactura;
  setValorState: Dispatch<SetStateAction<intFactura>>;
} | null>(
  null 
);

export function NuevaFacturaProvider(
  {
    children 
  }: { children: ReactNode } 
) {
      const newDater = new Date();

      const facturas = useFacturaSort();

      const [ valorState, setValorState ] = useState<intFactura>(
        {
          valorTotal        : '0.00',
          valorBase         : '0.00',
          valorOtroImp      : '0.00',
          valorIva          : '0.00',
          hasIva            : false,
          hasOtroImp        : false,
          hasIcui           : false,
          hasImpoConsumo    : false,
          facturaElectronica: '',
          secondaryFactura  : {},
          carpetaNumero     : 0,
          nombreComercial   : '',
          ciudad            : '',
          dv                : 0,
          id                : '',
          nit               : 0,
          razonSocial       : '',
          concepto          : '',
          direccion         : '',
          fecha             : new Date(
            newDater.getFullYear(),
            newDater.getMonth(),
            newDater.getDate(),
          ),
        } 
      );

      useEffect(
        () => {
                  if ( valorState.id !== '' ) {
                    const idk = [ ...facturas ].find(
                      (
                        factura 
                      ) => {
                                return factura.id === valorState.id;
                      } 
                    );

                    if ( idk ) {
                      const {
                        _id, facturaElectronica, ...restIdk 
                      } = idk;
                      console.log(
                        _id 
                      );
                      console.log(
                        facturaElectronica 
                      );

                      setValorState(
                        (
                          e 
                        ) => {
                                  return {
                                    ...e,
                                    ...restIdk,
                                  };
                        } 
                      );
                    }
                  }
        }, [ facturas, valorState.id ] 
      );
      return (
        <NuevaFacturaContext.Provider
          value={{
            valorState,
            setValorState,
          }}
        >
          {children}
        </NuevaFacturaContext.Provider>
      );
}

export function useNuevaFacturaContext() {
      const context = useContext(
        NuevaFacturaContext 
      );

      if ( !context ) {
        throw new Error(
          'Nueva intFactura context must be used within a nueva factura provider',
        );
      }

      return context;
}
