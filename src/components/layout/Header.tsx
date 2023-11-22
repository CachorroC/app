'use client';
import { ReactNode } from 'react';
import { useMediaQuery } from '#@/app/hooks/useMediaQuery';
import { useNavigationContext } from '#@/app/context/main-context';
import layout from '#@/styles/layout.module.css';
import ModalDialog from '#@/app/hooks/modal-state';
import { DrawerMenuButton, } from '#@/components/Buttons/nav-buttons';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';
import { InputSearchBar } from './InputSearchBar';
import { Drawer } from './Drawer';
import { NavLink } from './NavLink';

export const Header = (
  {
    children
  } :{children: ReactNode}
) => {

          const {
            isNavOpen
          } = useNavigationContext();

          const isMobile = useMediaQuery(
            '(max-width: 600px)'
          );

          const isTablet = useMediaQuery(
            '(min-width: 600px)and (max-width: 840px)'
          );

          const isDesktop = useMediaQuery(
            '(min-width: 840px)'
          );


          return (
            <div className={layout.header}>
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
                hrefLabel="/Carpetas/UltimasActuaciones"
              />
              {isDesktop && (
                <ModalDialog>
                  <NuevaNota />
                </ModalDialog>
              )}
              {isNavOpen && (
                <Drawer>
                  <InputSearchBar />
                  {children}
                </Drawer>
              )}
              {isTablet && (
                <>
                  <DrawerMenuButton />
                  <ModalDialog>
                    <NuevaNota />
                  </ModalDialog>
                </>
              )}
              {isMobile && <DrawerMenuButton />}
            </div>
          );
};
