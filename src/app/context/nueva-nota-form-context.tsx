'use client';
import { intNota } from '#@/lib/types/notas';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export function NuevaNotaFormProvider(
  {
    children 
  }: { children: ReactNode } 
) {
      const newNota: intNota = {
        text         : 'Nueva Nota',
        pathname     : '/',
        date         : new Date(),
        carpetaNumero: 0,
      };

      const nuevaNotaMethods = useForm<intNota>(
        {
          defaultValues   : newNota,
          shouldFocusError: true,
          criteriaMode    : 'all',
        } 
      );

      return <FormProvider {...nuevaNotaMethods}>{children}</FormProvider>;
}
