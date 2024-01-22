'use client';
import { intFactura  } from '#@/lib/types/contabilidad';
import { ReactNode, createContext, useState, Dispatch, SetStateAction, useContext, useEffect, } from 'react';
import { useFacturaSort } from './facturas-context-provider';


const NuevaFacturaContext = createContext<{valorState: intFactura, setValorState: Dispatch<SetStateAction<intFactura>>}| null>(
  null
);

export function NuevaFacturaProvider(
  {
    children
  }: { children: ReactNode }
) {
      const facturas = useFacturaSort();

      const [ valorState, setValorState ] = useState<intFactura>(
        {
          valorTotal: '0.00',
          valorBase : '0.00',
          hasIva    : false,
          hasOtroImp: false,
          ciudad    : '',
          dv        : 0,
          fecha     : new Date(
            '1997-01-03'
          ),
          id            : '',
          nit           : 0,
          razonSocial   : '',
          hasIcui       : false,
          hasImpoConsumo: false,
          valorIva      : '0.00',
          valorOtroImp  : '0.00',
          concepto      : '',
          direccion     : ''
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
                        {
                          ...restIdk
                        }
                      );
                    }
                  }



        }, [ facturas, valorState.id ]
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