'use client';

import { createContext, use, useState, ReactNode } from 'react';

interface NavigationContextType {
  currentPath: string | null;
  setCurrentPath: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  return (
    <NavigationContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  const context = use(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigationContext must be used inside NavigationProvider');
  }
  return context;
}