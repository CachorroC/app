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
  stateCarpeta: IntCarpeta;
  setStateCarpeta: Dispatch<SetStateAction<IntCarpeta>>;
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
      const [ stateCarpeta, setStateCarpeta ] = useState(
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
            stateCarpeta,
            setStateCarpeta,
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
          'ecarpeta form context must be used insed a carpeta form cintext providee ',
        );
      }

      return context;
}
