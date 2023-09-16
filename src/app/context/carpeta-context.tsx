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

export const CarpetaProvider = (
  {
    children
  }: { children: ReactNode }
) => {
  const methods = useForm<IntCarpeta>(
    {
      defaultValues: defaultValues
    }
  );

  return <FormProvider {...methods}>{children}</FormProvider>;
};
