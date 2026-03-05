'use client';

import { createContext, use, useState, ReactNode } from 'react';

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface ModalNoteContextType {
  isNoteOpen: boolean;
  setIsNoteOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);
const ModalNoteContext = createContext<ModalNoteContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalNoteProvider({ children }: { children: ReactNode }) {
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  return (
    <ModalNoteContext.Provider value={{ isNoteOpen, setIsNoteOpen }}>
      {children}
    </ModalNoteContext.Provider>
  );
}

export function useModalContext() {
  const context = use(ModalContext);
  if (context === undefined) {
    throw new Error('useModalContext must be used inside ModalProvider');
  }
  return context;
}

export function useModalNoteContext() {
  const context = use(ModalNoteContext);
  if (context === undefined) {
    throw new Error('useModalNoteContext must be used inside ModalNoteProvider');
  }
  return context;
}