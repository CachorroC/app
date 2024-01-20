'use client';
import styles from '#@/styles/layout.module.css';
import { useNavigationContext } from '#@/app/context/navigation-context';
import { DrawerMenuButton, NewNoteButton } from '../Buttons/nav-buttons';
import { Drawer } from './Drawer';
import { NavLink } from './NavLink';
import { Fragment, useState } from 'react';

export const NavBar = () => {
          const {
            isNavOpen
          } = useNavigationContext();

          const [ isContabilidadOpen, setIsContabilidadOpen ] = useState(
            false
          );

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
                  <button type={ 'button' } onClick={ () => {
                            return ( setIsContabilidadOpen(
                              (
                                e
                              ) => {
                                        return !e;
                              }
                            ) );
                  }}>
                    <span className="material-symbols-outlined">
                      {isContabilidadOpen
                        ? 'chevron_right'
                        : 'chevron_left'}
                    </span>
                  </button>
                  { isContabilidadOpen && (
                    <Fragment key={ 'contabilidad' }>
                      <NavLink iconLabel={ 'account_balance' } textLabel={ 'Contabilidad' } hrefLabel={ '/Contabilidad' } />
                      <NavLink iconLabel={ 'add_shopping_cart' } textLabel={ 'ingresar factura' } hrefLabel={ '/Contabilidad/NuevaFactura' } />
                    </Fragment>
                  )}
                </Drawer>
              )}

            </div>
          );
};
