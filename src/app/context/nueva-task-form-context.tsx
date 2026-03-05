'use client';

import { createContext, use, useState, ReactNode } from 'react';

interface NuevaTaskFormContextType {
  taskData: any;
  setTaskData: (data: any) => void;
}

const NuevaTaskFormContext = createContext<NuevaTaskFormContextType | undefined>(undefined);

export function NuevaTaskFormProvider({ children }: { children: ReactNode }) {
  const [taskData, setTaskData] = useState<any>(null);

  return (
    <NuevaTaskFormContext.Provider value={{ taskData, setTaskData }}>
      {children}
    </NuevaTaskFormContext.Provider>
  );
}

export function useNuevaTaskContext() {
  const context = use(NuevaTaskFormContext);
  if (context === undefined) {
    throw new Error('useNuevaTaskContext must be used inside NuevaTaskFormProvider');
  }
  return context;
}