'use client';
import { intNota } from '#@/lib/types/notas';
import { useParams, usePathname } from 'next/navigation';
import {  ReactNode, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export function NuevaNotaFormProvider (
  {
    children
  }: { children: ReactNode }
) {
  const params = useParams();

  const {
    numero
  } = params;

  const pathname = usePathname();

  const nuevaNotaMethods = useForm<intNota>(
    {
      defaultValues: async () => {
        const response = await fetch(
          '/api/Notas/Nueva'
        );
        return await response.json();
      },
      resetOptions: {
        keepDefaultValues: true,
      },
      shouldFocusError: true,
      criteriaMode    : 'all',
    }
  );

  const {
    setValue,
  } = nuevaNotaMethods;


  useEffect(
    () => {
      setValue(
        'pathname', pathname
      );

      if ( numero ) {
        setValue(
          'carpetaNumero', Number(
            numero
          )
        );
      }


    }, [
      numero,
      pathname,
      setValue
    ]
  );

  return (
    <FormProvider {...nuevaNotaMethods}>
      { children }
    </FormProvider>
  );

}
