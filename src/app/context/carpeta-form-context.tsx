'use client';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useCarpetaSort } from './carpetas-sort-context';

export function CarpetaFormProvider(
  {
    children,
    numero,
  }: {
  children: ReactNode;
  numero: string;
}
) {
  const carpetasReduced = useCarpetaSort();

  const carpeta = carpetasReduced.find(
    (
      carpeta
    ) => {
      return carpeta.numero === Number(
        numero
      );
    }
  );

  const methods = useForm<MonCarpeta>(
    {
      defaultValues: carpeta,
      resetOptions : {
      },
      shouldFocusError: true,
      criteriaMode    : 'all',

    }
  );

  return <FormProvider {...methods}>{children}</FormProvider>;
}
