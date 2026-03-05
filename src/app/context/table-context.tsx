'use client';

import { createContext, use, useState, ReactNode } from 'react';

interface TableContextType {
  // Add table state here as needed
  [key: string]: any;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export function TableProvider({ children }: { children: ReactNode }) {
  const [tableState] = useState<TableContextType>({});

  return (
    <TableContext.Provider value={tableState}>
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  const context = use(TableContext);
  if (context === undefined) {
    throw new Error('useTable must be used inside TableProvider');
  }
  return context;
}
