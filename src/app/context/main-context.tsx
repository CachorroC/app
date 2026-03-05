'use client';

import { createContext, use, useState, ReactNode } from 'react';

interface SnackbarContextType {
  message: string | null;
  setMessage: (message: string | null) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <SnackbarContext.Provider value={{ message, setMessage }}>
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbarContext() {
  const context = use(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbarContext must be used inside SnackbarProvider');
  }
  return context;
}