'use client';

import { ReactNode, createContext } from 'react';
import { useFormState } from 'react-dom';
import { addToCart } from './actions';

const IngresoInputContext = createContext( null );


export function IngresoInputContextProvider ( { children }: { children: ReactNode } )
{
  const [ ingresoInput, ingresoInputAction ] = useFormState( addToCart, {
    success: false,
    message: 'sin enviar'
  } );
  return (
    <IngresoInputContext.Provider value={ { ingresoInput, ingresoInputAction } }>
      { children }
    </IngresoInputContext.Provider>
  )
}