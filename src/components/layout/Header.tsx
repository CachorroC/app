'use client';
import { ReactNode } from 'react';
import { DrawerMenuButton } from '#@/components/Buttons/nav-buttons';
import { InputSearchBar } from './InputSearchBar';
import { Drawer } from './Drawer';
import { NavLink } from './NavLink';
import { useNavigationContext } from '#@/app/context/navigation-context';

export const Header = (
  {
    children 
  }: { children: ReactNode } 
) => {
          const {
            isNavOpen 
          } = useNavigationContext();

          return (
            <>
              <NavLink
                key={'home'}
                iconLabel={'home'}
                textLabel={'Inicio'}
                hrefLabel="/"
              />
              <NavLink
                iconLabel={'folder_open'}
                key={'carpetas'}
                textLabel={'Carpetas'}
                hrefLabel="/Carpetas"
              />
              <NavLink
                key={'note'}
                iconLabel={'note'}
                textLabel={'Notas'}
                hrefLabel="/Notas"
              />
              <NavLink
                iconLabel={'gavel'}
                textLabel={'Reciente'}
                key={'actuaciones'}
                hrefLabel={'/Carpetas/UltimasActuaciones'}
              />

              {isNavOpen && (
                <Drawer>
                  <InputSearchBar />
                  {children}
                </Drawer>
              )}

              <DrawerMenuButton />
            </>
          );
};
