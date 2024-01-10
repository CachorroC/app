'use client';
import styles from '#@/styles/layout.module.css';
import { useNavigationContext } from '#@/app/context/navigation-context';
import { DrawerMenuButton, NewNoteButton } from '../Buttons/nav-buttons';
import { Drawer } from './Drawer';
import { NavLink } from './NavLink';

export const NavBar = () => {
          const {
            isNavOpen
          } = useNavigationContext();

          return (
            <div className={styles.header}>
              <DrawerMenuButton />
              <NewNoteButton />
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
                hrefLabel={'/Carpetas?type=sort&dir=asc&sortingKey=fecha'}
              />


              {isNavOpen && (
                <Drawer>
                  <NavLink
                    iconLabel={'folder_open'}
                    key={'carpetas'}
                    textLabel={'Carpetas'}
                    hrefLabel="/Carpetas?type=sort&dir=asc&sortingKey=numero"
                  />
                  <NavLink
                    key={'note'}
                    iconLabel={'note'}
                    textLabel={'Notas'}
                    hrefLabel="/Notas"
                  />
                </Drawer>
              )}

            </div>
          );
};
