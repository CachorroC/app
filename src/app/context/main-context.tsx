'use client';
import { ContactoForm, Grupo } from '#@/lib/types/contacto';
import { Nota } from '@prisma/client';
import { usePathname } from 'next/navigation';
import { Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState, } from 'react';

const NoteContext = createContext<{
  inputNota: Nota;
  setInputNota: Dispatch<SetStateAction<Nota>>;
} | null>(
  null 
);

const SnackbarContext = createContext<{
  isSnackbarOpen: boolean;
  setIsSnackbarOpen: Dispatch<SetStateAction<boolean>>;
} | null>(
  null 
);

const ContactoContext = createContext<{
  contactoForm: ContactoForm;
  setContactoForm: Dispatch<SetStateAction<ContactoForm>>;
} | null>(
  null 
);

export function MainProvider(
  {
    children 
  }: { children: ReactNode } 
) {
      const [
        contactoForm,
        setContactoForm 
      ] = useState(
        {
          nombre    : ' ',
          grupo     : 'otros' as Grupo,
          newsLetter: false,
          email     : 'correo electronico',
          telefono  : 1,
          comentario: 'Este es el espacio para registrar información adicional',
          fecha     : new Date(),
        } 
      );

      const [
        isSnackbarOpen,
        setIsSnackbarOpen 
      ] = useState(
        false 
      );

      const pathname = usePathname();

      const [
        inputNota,
        setInputNota 
      ] = useState<Nota>(
        {
          id           : 0,
          title        : 'Nota',
          content      : '',
          pathname     : pathname,
          date         : new Date(),
          carpetaNumero: null,
          createdAt    : new Date(),
          updatedAt    : new Date(),
        } 
      );

      return (
        <SnackbarContext.Provider
          value={{
            isSnackbarOpen,
            setIsSnackbarOpen,
          }}
        >
          <NoteContext.Provider
            value={{
              inputNota,
              setInputNota,
            }}
          >
            <ContactoContext.Provider
              value={{
                contactoForm,
                setContactoForm,
              }}
            >
              {children}
            </ContactoContext.Provider>
          </NoteContext.Provider>
        </SnackbarContext.Provider>
      );
}

export function useSnackbarContext() {
      const context = useContext(
        SnackbarContext 
      );

      if ( context === null ) {
        throw new Error(
          'el snackbar context debe ser utilizado dentro de un snackbar context provider ',
        );
      }

      return context;
}

export function useContactContext() {
      const context = useContext(
        ContactoContext 
      );

      if ( context === null ) {
        throw new Error(
          'el contexto para contacto se debe utilizar dentro de un proveedor de contacto',
        );
      }

      return context;
}

export function useNotaContext() {
      const context = useContext(
        NoteContext 
      );

      if ( context === null ) {
        throw new Error(
          'el estado de la nota solo puede ser leido e invocado dentro del contexto de nota.',
        );
      }

      return context;
}
