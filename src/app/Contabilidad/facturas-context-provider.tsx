'use client';
import { monFactura } from '#@/lib/types/contabilidad';
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react';
import { IntAction, facturasReducer } from '../Hooks/useFacturasReducer';

const FacturasSortContext = createContext<monFactura[] | null>(
  null
);

const FacturasSortDispatchContext = createContext<Dispatch<IntAction> | null>(
  null,
);


export function FacturasProvider (

  {
    children,
    initialFacturas,
  }: {
    children: ReactNode;
    initialFacturas: monFactura[];
  }
) {

      const [ facturasReduced, dispatchFacturas ] = useReducer(
        facturasReducer,
        initialFacturas,
      );

      return (
        <FacturasSortContext.Provider value={ facturasReduced }>
          <FacturasSortDispatchContext.Provider value={ dispatchFacturas }>
            { children }
          </FacturasSortDispatchContext.Provider>
        </FacturasSortContext.Provider>
      );
}


export function useFacturaSort () {
      const context = useContext(
        FacturasSortContext
      );

      if ( context === null ) {
        throw new Error(
          'useFacturaSort  must be used inside a facturasort provider r',
        );
      }

      return context;
}

export function useFacturaSortDispatch () {
      const context = useContext(
        FacturasSortDispatchContext
      );

      if ( context === null ) {
        throw new Error(
          'useSortDispatchFacturas must be used inside a FacturasProvider',
        );
      }

      return context;
}
