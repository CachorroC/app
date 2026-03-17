'use client';
import React, { createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext, } from 'react';
//TODO: refactorizar esto, no es necesario tener dos contextos para manejar el estado de los modales, se puede manejar con un solo contexto y un estado que indique cual modal esta abierto, o incluso con un estado que indique si el modal esta abierto y otro estado que indique el tipo de modal que esta abierto (si es necesario diferenciar entre diferentes tipos de modales)
const ModalContext = createContext<{
  isModalOpen   : boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
} | null>( null );

const ModalNoteContext = createContext<{
  isModalNoteOpen   : boolean;
  setIsModalNoteOpen: Dispatch<SetStateAction<boolean>>;
} | null>( null );

export function ModalProvider( {
  children
}: { children: React.ReactNode } ) {
  const [
    isModalOpen,
    setIsModalOpen
  ] = useState( false );

  const [
    isModalNoteOpen,
    setIsModalNoteOpen
  ] = useState( false );

  return (
    <ModalNoteContext.Provider
      value={{
        isModalNoteOpen,
        setIsModalNoteOpen,
      }}
    >
      <ModalContext.Provider
        value={{
          isModalOpen,
          setIsModalOpen,
        }}
      >
        {children}
      </ModalContext.Provider>
    </ModalNoteContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext( ModalContext );

  if ( context === null ) {
    throw new Error( 'useModalContext must be used inside a ModalProvider' );
  }

  return context;
}

export function useModalNoteContext() {
  const context = useContext( ModalNoteContext );

  if ( context === null ) {
    throw new Error( 'useModalContext must be used inside a ModalProvider' );
  }

  return context;
}
