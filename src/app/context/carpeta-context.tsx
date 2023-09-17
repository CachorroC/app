'use client';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { Dispatch,
         ReactNode,
         SetStateAction,
         createContext,
         createRef,
         useContext,
         useState, } from 'react';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';

const CarpetaContext = createContext<{
  inputCarpeta: IntCarpeta;
  setInputCarpeta: Dispatch<SetStateAction<IntCarpeta>>;
} | null>(
  null
);

export const CarpetaProvider = (
  {
    children
  }: { children: ReactNode }
) => {
  const defaultValues: IntCarpeta = {
    category    : 'Terminados',
    categoryTag : 0,
    numero      : 0,
    llaveProceso: '',
    tipoProceso : 'SINGULAR',
    deudor      : {
      primerNombre   : '',
      segundoNombre  : '',
      primerApellido : '',
      segundoApellido: '',
      cedula         : 0,
      direccion      : '',
      email          : '',
      tel            : {
        fijo   : 0,
        celular: 0
      }
    },
    demanda: {
      departamento           : null,
      capitalAdeudado        : 1000000000,
      entregagarantiasAbogado: new Date(),
      etapaProcesal          : '',
      fechaPresentacion      : new Date,
      municipio              : '',
      radicado               : '',
      vencimientoPagare      : new Date(),
      expediente             : '',
      juzgados               : [],
      obligacion             : {
        '1': '00000',
        '2': '00000'
      }
    },
  };

  const methods = useForm<IntCarpeta>(
    {
      defaultValues   : defaultValues,
      shouldFocusError: true
    }
  );

  const [
    inputCarpeta,
    setInputCarpeta
  ] = useState(
    defaultValues
  );

  return ( <FormProvider {...methods}><CarpetaContext.Provider value={{
    inputCarpeta,
    setInputCarpeta
  }}>{children}</CarpetaContext.Provider></FormProvider> );
};

export function useCarpetaContext () {
  const context = useContext(
    CarpetaContext
  );

  if ( context === null ) {
    throw new Error(
      'el contexto de la inputCarpeta debe ser utilizado dentro del provider CarpetaContext'
    );

  }

  return context;
}