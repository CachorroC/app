'use client';
import styles from '#@/styles/layout.module.css';
import { useNavigationContext } from '#@/app/context/navigation-context';
import { DrawerMenuButton } from '../Buttons/nav-buttons';
import { Drawer } from './Drawer';
import { NavLink } from './NavLink';

export const NavBar = () => {
          const {
            isNavOpen 
          } = useNavigationContext();

          return (
            <div className={styles.header}>
              <NavLink
                key={'home'}
                iconLabel={'home'}
                textLabel={'Inicio'}
                hrefLabel="/"
              />
              <NavLink
                iconLabel={'gavel'}
                textLabel={'Reciente'}
                key={'actuaciones'}
                hrefLabel={'/Carpetas/UltimasActuaciones'}
              />
              <NavLink
                iconLabel={'note_add'}
                textLabel={'agregar nota'}
                hrefLabel={'/(.)Notas/Nueva'}
              />

              {isNavOpen && (
                <Drawer>
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
                </Drawer>
              )}

              <DrawerMenuButton />
            </div>
          );
};
