'use client';

import { InputDateHelper } from '#@/lib/project/date-helper';
import { NuevaCarpeta } from '#@/lib/types/carpetas';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export function CarpetaFormProvider(
  {
    children 
  }: { children: ReactNode } 
) {
  const daterFixer = InputDateHelper(
    new Date() 
  );

  const defaultValues: NuevaCarpeta = {
    numero  : 0,
    category: 'sin Especificar',
    deudor  : {
      primerNombre   : '',
      segundoNombre  : '',
      primerApellido : '',
      segundoApellido: '',
      cedula         : 0,
      email          : 'correo@ejemplo.com',
      direccion      : '',
      tel            : {
        celular: 0,
        fijo   : 0,
      },
    },
    demanda: {
      capitalAdeudado        : 1000000,
      entregaGarantiasAbogado: daterFixer,
      tipoProceso            : 'SINGULAR',
      fechaPresentacion      : daterFixer,
      vencimientoPagare      : [
        daterFixer
      ],
      obligacion: {
        A: 'primer obligacion',
        B: 'segunda obligacion',
      },
    },
  };

  const methods = useForm<NuevaCarpeta>(
    {
      defaultValues,
      resetOptions: {
        keepDefaultValues: true,
      },
      shouldFocusError: true,
      criteriaMode    : 'all',
    } 
  );

  return <FormProvider {...methods}>{children}</FormProvider>;
}
