'use client';
import { Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState, } from 'react';

const CategoryContext = createContext<{
  currentCategory   : string;
  setCurrentCategory: Dispatch<SetStateAction<string>>;
} | null>( null );

export function CategoryContextProvider( {
  children 
}: { children: ReactNode } ) {
  const [
    currentCategory,
    setCurrentCategory
  ] = useState( 'todos' );

  return (
    <CategoryContext.Provider
      value={{
        currentCategory,
        setCurrentCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext( CategoryContext );

  if ( context === null ) {
    throw new Error( 'el contexto para la categoria solo debe ser aplicado dentro de un hijo del contexto', );
  }

  return context;
}
