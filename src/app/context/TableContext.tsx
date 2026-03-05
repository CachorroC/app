'use client';

import { createContext, use, useState, ReactNode } from 'react';

interface TableContextType {
  // Add table state here as needed
  [key: string]: any;
}

const TableCtx = createContext<TableContextType | undefined>(undefined);

export function TableProvider({ children }: { children: ReactNode }) {
  const [tableState] = useState<TableContextType>({});

  return (
    <TableCtx.Provider value={tableState}>
      {children}
    </TableCtx.Provider>
  );
}

export function useTable() {
  const context = use(TableCtx);
  if (context === undefined) {
    throw new Error('useTable must be used inside TableProvider');
  }
  return context;
}