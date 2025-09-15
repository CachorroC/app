'use client';
import { NewNota } from '#@/lib/types/notas';
import { usePathname } from 'next/navigation';
import { ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext, } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const NuevaNotaContext = createContext<{
  notaFormState: NewNota;
  setNotaFormState: Dispatch<SetStateAction<NewNota>>;
} | null>( null );

export function NuevaNotaFormProvider( {
  children 
}: { children: ReactNode } ) {
  const pathname = usePathname();

  const newDater = new Date();

  const newNota: NewNota = {
    text   : '',
    content: [
      ''
    ],
    pathname     : pathname,
    carpetaNumero: null,
    dueDate      : new Date(
      newDater.getFullYear(),
      newDater.getMonth(),
      newDater.getDate(),
    ),
    id: 'NC-0',
  };

  const [
    notaFormState,
    setNotaFormState
  ] = useState<NewNota>( newNota );

  const nuevaNotaMethods = useForm<NewNota>( {
    defaultValues   : notaFormState,
    shouldFocusError: true,
    criteriaMode    : 'all',
  } );

  return (
    <NuevaNotaContext.Provider
      value={{
        notaFormState,
        setNotaFormState,
      }}
    >
      <FormProvider {...nuevaNotaMethods}>{children}</FormProvider>
    </NuevaNotaContext.Provider>
  );
}

export function useNuevaNotaContext() {
  const context = useContext( NuevaNotaContext );

  if ( !context ) {
    throw new Error( 'Nueva Nota context must be used within a nueva nota provider', );
  }

  return context;
}
