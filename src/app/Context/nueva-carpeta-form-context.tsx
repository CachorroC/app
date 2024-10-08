'use client';

import { InputDateHelper } from '#@/lib/project/date-helper';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { NuevaCarpeta } from '#@/lib/types/raw-carpeta';
import { useCarpetaSort } from './carpetas-sort-context';

export function NuevaCarpetaFormProvider( {
  children,
}: {
  children: ReactNode;
} ) {
  const {
    completeCarpetas 
  } = useCarpetaSort();

  const carpsLen = 1 + completeCarpetas.length;

  const daterFixer = InputDateHelper( new Date() );

  const methods = useForm<NuevaCarpeta>( {
    defaultValues: {
      numero  : carpsLen,
      category: 'SinEspecificar',
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
        fechaPresentacion      : [
          daterFixer
        ],
        vencimientoPagare: [
          daterFixer
        ],
        obligacion: [
          'sus obligaciones'
        ],
      },
    },
    resetOptions: {
      keepDefaultValues: true,
    },
    shouldFocusError: true,
    criteriaMode    : 'all',
  } );

  return <FormProvider {...methods}>{children}</FormProvider>;
}
