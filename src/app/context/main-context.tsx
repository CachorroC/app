'use client';
import { ContactoForm, Grupo } from '#@/lib/types/contacto';
import { Nota } from '@prisma/client';
import { usePathname } from 'next/navigation';
import { Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
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

const CategoryContext = createContext<{
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
} | null>(
  null
);

const ContactoContext = createContext<{
  contactoForm: ContactoForm;
  setContactoForm: Dispatch<SetStateAction<ContactoForm>>;
} | null>(
  null
);

const NavigationContext = createContext<{
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
} | null>(
  null
);

export function MainProvider(
  {
    children
  }: { children: ReactNode }
) {
      const pathname = usePathname();

      const [
        category,
        setCategory
      ] = useState(
        'todos'
      );

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
          updatedAt    : new Date()
        }
      );

      const [
        isNavOpen,
        setIsNavOpen
      ] = useState(
        false
      );



      useEffect(
        () => {

                  const [
                    ,
                    firstRoute,
                    secondRoute
                  ] = pathname.split(
                    '/'
                  );

                  console.log(
                    `primera ruta: ${ firstRoute }`
                  );
                  console.log(
                    `segunda ruta: ${ secondRoute }`

                  );

                  if ( firstRoute === 'Carpetas' ) {
                    if ( !secondRoute || secondRoute === 'UltimasActuaciones' ) {
                      setCategory(
                        'todos'
                      );
                    } else {
                      setCategory(
                        secondRoute
                      );
                    }

                  }
        }, [
          pathname
        ]
      );

      return (
        <SnackbarContext.Provider value={{
          isSnackbarOpen,
          setIsSnackbarOpen
        }}>
          <NavigationContext.Provider
            value={{
              isNavOpen,
              setIsNavOpen,
            }}
          >
            <NoteContext.Provider
              value={{
                inputNota,
                setInputNota,
              }}
            >
              <CategoryContext.Provider
                value={{
                  category,
                  setCategory,
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
              </CategoryContext.Provider>
            </NoteContext.Provider>
          </NavigationContext.Provider>
        </SnackbarContext.Provider>
      );
}

export function useCategory() {
      const context = useContext(
        CategoryContext
      );

      if ( context === null ) {
        throw new Error(
          'el contexto para la categoria solo debe ser aplicado dentro de un hijo del contexto',
        );
      }

      return context;
}

export function useSnackbarContext () {
      const context = useContext(
        SnackbarContext
      );

      if ( context === null ) {
        throw new Error(
          'el snackbar context debe ser utilizado dentro de un snackbar context provider '
        );

      }

      return context;
}

export function useNavigationContext() {
      const context = useContext(
        NavigationContext
      );

      if ( context === null ) {
        throw new Error(
          'Navigation Context has to be used within a Navigationprovider',
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
