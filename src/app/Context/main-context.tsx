'use client';
import { ContactoForm, Grupo } from '#@/lib/types/contacto';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const SnackbarContext = createContext<{
  isSnackbarOpen: boolean;
  setIsSnackbarOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

const ContactoContext = createContext<{
  contactoForm: ContactoForm;
  setContactoForm: Dispatch<SetStateAction<ContactoForm>>;
} | null>(null);

export function MainProvider({ children }: { children: ReactNode }) {
  const [contactoForm, setContactoForm] = useState({
    nombre: ' ',
    grupo: 'otros' as Grupo,
    newsLetter: false,
    email: 'correo electronico',
    telefono: 1,
    comentario: 'Este es el espacio para registrar información adicional',
    fecha: null as Date | null,
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  // Use useEffect to set the date strictly on the client side
  useEffect(() => {
    setContactoForm((prev) => {
      return {
        ...prev,
        fecha: new Date(), // This runs only in the browser, solving the mismatch
      };
    });
  }, []);

  return (
    <SnackbarContext.Provider
      value={{
        isSnackbarOpen,
        setIsSnackbarOpen,
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
    </SnackbarContext.Provider>
  );
}

export function useSnackbarContext() {
  const context = useContext(SnackbarContext);

  if (context === null) {
    throw new Error(
      'el snackbar context debe ser utilizado dentro de un snackbar context provider ',
    );
  }

  return context;
}

export function useContactContext() {
  const context = useContext(ContactoContext);

  if (context === null) {
    throw new Error(
      'el contexto para contacto se debe utilizar dentro de un proveedor de contacto',
    );
  }

  return context;
}
