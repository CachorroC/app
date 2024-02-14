'use client';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState, } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const CarpetaFormContext = createContext<{
  carpetaFormState: IntCarpeta;
  setCarpetaFormState: Dispatch<SetStateAction<IntCarpeta>>;
} | null>(
  null 
);

export function CarpetaFormProvider(
  {
    children,
    carpeta,
  }: {
    children: ReactNode;
    carpeta: IntCarpeta;
  } 
) {
      const [ carpetaFormState, setCarpetaFormState ] = useState(
        carpeta 
      );

      const methods = useForm<IntCarpeta>(
        {
          defaultValues   : carpeta,
          shouldFocusError: true,
          criteriaMode    : 'firstError',
        } 
      );

      return (
        <CarpetaFormContext.Provider
          value={{
            carpetaFormState,
            setCarpetaFormState,
          }}
        >
          <FormProvider {...methods}>{children}</FormProvider>
        </CarpetaFormContext.Provider>
      );
}

export function useCarpetaFormContext() {
      const context = useContext(
        CarpetaFormContext 
      );

      if ( context === null ) {
        throw new Error(
          'useCarpetaFormContext must be used insed a carpeta form context provider',
        );
      }

      return context;
}
