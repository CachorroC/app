'use client';
import React, { createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext, } from 'react';

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
