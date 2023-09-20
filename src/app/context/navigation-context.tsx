'use client';

import { Dispatch,
         ReactNode,
         SetStateAction,
         createContext,
         useContext,
         useState, } from 'react';

export const NavigationContext = createContext<{
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
} | null>(
            null 
);

export function NavigationProvider(
            {
                            children 
            }: { children: ReactNode } 
) {
  const [
          isNavOpen,
          setIsNavOpen
  ] = useState(
              false 
  );

  return (
    <NavigationContext.Provider
      value={{
                      isNavOpen,
                      setIsNavOpen,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  const context = useContext(
              NavigationContext 
  );

  if ( context === null ) {
    throw new Error(
                'el contexto de navegacion debe ser utilizado dentro de un contextProvider ',
    );
  }

  return context;
}
