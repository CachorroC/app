'use client';

import { NuevaCarpeta } from '#@/lib/types/carpetas';
import {  Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const CarpetaFormContext = createContext<{
  nuevaCarpeta: NuevaCarpeta;
  setNuevaCarpeta: Dispatch<SetStateAction<NuevaCarpeta>>;
} | null>(
  null
);

export function CarpetaFormProvider(
  {
    children
  }: { children: ReactNode }
) {

  const defaultValues: NuevaCarpeta = {
    category: 'Terminados',
    numero  : 0,

    primerNombre  : '',
    segundoNombre : '',
    primerApellido: '',
    cedula        : 0,
    direccion     : '',
    email         : 'correo@ejemplo.com',
    tel           : {
      celular: 0,
      fijo   : 0
    },
    capitalAdeudado        : 1000000,
    entregaGarantiasAbogado: new Date(),
    tipoProceso            : 'HIPOTECARIO',
    vencimientoPagare      : [
      new Date()
    ],
    obligacion: {
      A: 'primer obligacion',
      B: 'segunda obligacion'
    }

  };

  const [
    nuevaCarpeta,
    setNuevaCarpeta
  ] = useState(
    defaultValues
  );

  const methods = useForm<NuevaCarpeta>(
    {
      defaultValues,
      values      : nuevaCarpeta,
      resetOptions: {
        keepDefaultValues: true,
        keepErrors       : false
      },
      shouldFocusError: true,
      criteriaMode    : 'all'
    }
  );


  return (
    <CarpetaFormContext.Provider value={{
      nuevaCarpeta,
      setNuevaCarpeta
    }}>
      <FormProvider { ...methods }>
        {children}
      </FormProvider>
    </CarpetaFormContext.Provider>
  );
}



export function useCarpetaFormContext () {
  const context = useContext(
    CarpetaFormContext
  );

  if ( context === null ) {
    throw new Error(
      'carpeta form context must be used within a carpeta form provider '
    );

  }

  return context;
}