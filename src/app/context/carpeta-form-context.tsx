'use client';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export function CarpetaFormProvider(
  {
    children,
    carpeta
  }: {
    children: ReactNode;
    carpeta: IntCarpeta
  }
) {

      const methods = useForm<IntCarpeta>(
        {
          defaultValues   : carpeta,
          shouldFocusError: true,
          criteriaMode    : 'firstError',

        }
      );

      return <FormProvider {...methods}>{children}</FormProvider>;
}
