'use client';
import { IntCarpeta, intDemanda } from '#@/lib/types/carpetas';
import { Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState, } from 'react';
import { useFormState } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { updateDemandaAction } from '../actions';

const CarpetaFormContext = createContext<{
  carpetaFormState: IntCarpeta;
  setCarpetaFormState: Dispatch<SetStateAction<IntCarpeta>>;
} | null>(
  null
);

const DemandaFormContext = createContext<{
  demandaFormState: { demanda: intDemanda; success: boolean };
  demandaFormAction:(
    /* eslint-disable-next-line no-unused-vars */
    payload: FormData,
  ) => void;
    } | null>( null
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
  const {
    demanda
  } = carpeta;

  const [
    carpetaFormState,
    setCarpetaFormState
  ] = useState(
    carpeta
  );

  const [
    demandaFormState,
    demandaFormAction
  ] = useFormState(
    updateDemandaAction,
    {
      demanda: demanda,
      success: false,
    },
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
      <DemandaFormContext.Provider
        value={{
          demandaFormState,
          demandaFormAction,
        }}
      >
        <FormProvider {...methods}>{children}</FormProvider>
      </DemandaFormContext.Provider>
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

export function useDemandaFormContext() {
  const context = useContext(
    DemandaFormContext
  );

  if ( context === null ) {
    throw new Error(
      'useDemandaFormContext must be used insed a demanda form context provider',
    );
  }

  return context;
}
