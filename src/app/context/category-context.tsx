'use client';

import { createContext, use, useState, ReactNode } from 'react';

interface CategoryContextType {
  currentCategory: string | null;
  setCurrentCategory: (category: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  return (
    <CategoryContext.Provider value={{ currentCategory, setCurrentCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = use(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used inside CategoryProvider');
  }
  return context;
}
