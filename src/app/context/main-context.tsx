'use client';
import { ContactoForm, Grupo } from '#@/lib/types/contacto';
import { intNota } from '#@/lib/types/notas';
import { Nota } from '@prisma/client';
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


const NoteContext = createContext<{
  inputNota: Nota;
  setInputNota: Dispatch<SetStateAction<Nota>>;
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
  ] = useState<Nota>(
    {
      id          : 0,
      text        : 'Ingresa tu nota',
      llaveProceso: '00000000000000000000000',
      pathname    : '/',
      date        : new Date()
            .toLocaleString(),
      done: false
    }
  );

  return (

    <SearchContext.Provider
      value={{
        search,
        setSearch,
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
