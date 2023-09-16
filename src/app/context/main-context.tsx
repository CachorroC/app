'use client';
import { ContactoForm, Grupo } from '#@/lib/types/contacto';
import { intNota } from '#@/lib/types/notas';
import { usePathname } from 'next/navigation';
import { Dispatch,
         ReactNode,
         SetStateAction,
         createContext,
         useContext,
         useState, } from 'react';

const SearchContext = createContext<{
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
} | null>(
  null
);

const NavigationContext = createContext<{
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
} | null>(
  null
);

const NoteContext = createContext<{
  inputNota: intNota;
  setInputNota: Dispatch<SetStateAction<intNota>>;
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

export function SearchProvider(
  {
    children,
  }: {
  children: ReactNode;
}
) {
  const [
    search,
    setSearch
  ] = useState(
    ''
  );

  const [
    isNavOpen,
    setIsNavOpen
  ] = useState(
    false
  );

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
      comentario:
      'Este es el espacio para registrar información adicional',
      fecha: new Date(),
    }
  );

  const [
    inputNota,
    setInputNota
  ] = useState<intNota>(
    {
      nota        : 'Ingresa tu nota',
      llaveProceso: '00000000000000000000000',
      pathname    : '/',
      fecha       : new Date()
            .toISOString(),
      tareas: [
        {
          dueDate: new Date()
                .toISOString(),
          tarea : '',
          isDone: false,
        },
      ],
    }
  );

  return (

    <SearchContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
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
    </SearchContext.Provider>

  );
}

export function useSearch() {
  const context = useContext(
    SearchContext
  );

  if ( context === null ) {
    throw new Error(
      'useSearch must be used inside a SearchProvider'
    );
  }

  return context;
}

export function useCategory() {
  const context = useContext(
    CategoryContext
  );

  if ( context === null ) {
    throw new Error(
      'el contexto para la categoria solo debe ser aplicado dentro de un hijo del contexto'
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
      'el contexto de navegacion debe ser utilizado dentro de un contextProvider '
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
      'el contexto para contacto se debe utilizar dentro de un proveedor de contacto'
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
      'el estado de la nota solo puede ser leido e invocado dentro del contexto de nota.'
    );
  }

  return context;
}
