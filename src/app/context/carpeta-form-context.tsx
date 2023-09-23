'use client';

import { IntCarpeta } from '#@/lib/types/carpetas';
import {  ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const defaultValues: IntCarpeta = {
  demanda: {
    departamento           : null,
    capitalAdeudado        : '',
    entregagarantiasAbogado: new Date(),
    etapaProcesal          : null,
    fechaPresentacion      : new Date(),
    municipio              : '',
    radicado               : '',
    vencimientoPagare      : new Date(),
    expediente             : '',
    juzgados               : [],
    obligacion             : {
      '1': 'ejemplo'
    },
  },
  category   : 'Terminados',
  categoryTag: 0,
  deudor     : {
    tel: {
      fijo   : 1111111111,
      celular: 1111111111
    },
    primerNombre   : '',
    segundoNombre  : '',
    primerApellido : '',
    segundoApellido: '',
    cedula         : 0,
    direccion      : '',
    email          : ''
  },
  numero      : 0,
  llaveProceso: '',
  tipoProceso : 'HIPOTECARIO'
};

export function CarpetaFormProvider(
  {
    children
  }: { children: ReactNode }
) {
  const methods = useForm<IntCarpeta>(
    {
      defaultValues
    }
  );


  return (
    <FormProvider { ...methods }>
      {children}
    </FormProvider>
  );
}