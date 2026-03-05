'use client';

import { IntCarpeta } from '#@/lib/types/carpetas';
import { NuevaCarpeta } from '#@/lib/types/raw-carpeta';
import { InputDateHelper } from '#@/lib/project/date-helper';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const defaultNewCarpeta = (numero: number): NuevaCarpeta => ({
  numero,
  category: 'SinEspecificar',
  deudor: {
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    cedula: 0,
    email: 'correo@ejemplo.com',
    direccion: '',
    tel: {
      celular: 0,
      fijo: 0,
    },
  },
  demanda: {
    capitalAdeudado: 1000000,
    entregaGarantiasAbogado: InputDateHelper(new Date()),
    tipoProceso: 'SINGULAR',
    fechaPresentacion: [InputDateHelper(new Date())],
    vencimientoPagare: [InputDateHelper(new Date())],
    obligacion: ['sus obligaciones'],
  },
});

type CarpetaFormContextType = {
  formState: IntCarpeta | NuevaCarpeta | null;
  setFormState: Dispatch<SetStateAction<IntCarpeta | NuevaCarpeta | null>>;
  isNewCarpeta: boolean;
};

const CarpetaFormContext = createContext<CarpetaFormContextType | null>(null);

interface CarpetaFormProviderProps {
  children: ReactNode;
  carpeta?: IntCarpeta;
  nextCarpetaNumber?: number;
}

export function CarpetaFormProvider({
  children,
  carpeta,
  nextCarpetaNumber = 1,
}: CarpetaFormProviderProps) {
  const isNewCarpeta = !carpeta;

  const initialFormState = carpeta || defaultNewCarpeta(nextCarpetaNumber);
  const [formState, setFormState] = useState<IntCarpeta | NuevaCarpeta | null>(
    initialFormState,
  );

  const methods = useForm<IntCarpeta | NuevaCarpeta>({
    defaultValues: initialFormState,
    shouldFocusError: true,
    criteriaMode: isNewCarpeta ? 'all' : 'firstError',
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  return (
    <CarpetaFormContext.Provider
      value={{
        formState,
        setFormState,
        isNewCarpeta,
      }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </CarpetaFormContext.Provider>
  );
}

export function useCarpetaFormContext() {
  const context = useContext(CarpetaFormContext);

  if (context === null) {
    throw new Error(
      'useCarpetaFormContext must be used inside a CarpetaFormProvider',
    );
  }

  return context;
}

// Legacy aliases for backward compatibility
export { useCarpetaFormContext as useCarpetaForm };
