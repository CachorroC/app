'use client';
import styles from '#@/styles/layout.module.css';
import { useNavigationContext } from '#@/app/Context/navigation-context';
import { DrawerMenuButton, NewNoteButton } from '../Buttons/nav-buttons';
import { Drawer } from './Drawer';
import { NavLink } from './NavLink';
import { Route } from 'next';
import { Loader } from '../Loader/main-loader';
import { Suspense } from 'react';

export const NavBar = () => {
          const {
            isNavOpen
          } = useNavigationContext();

          const newYear = new Date()
                .getFullYear();

          const newMonth = new Date()
                .getMonth();

          const newDate = new Date()
                .getDate();

          return (
            <div className={styles.header}>
              <NewNoteButton />
              <DrawerMenuButton />
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

              {isNavOpen && (
                <Suspense fallback={<Loader />}>
                  <Drawer>
                    <DrawerMenuButton />
                    <NavLink
                      iconLabel={'payments'}
                      textLabel={'costos'}
                      hrefLabel={'/Costos'}
                    />
                    <NavLink
                      iconLabel={'contact_support'}
                      textLabel={'contacto'}
                      hrefLabel={'/Contacto'}
                    />
                    <NavLink
                      iconLabel={'account_balance'}
                      textLabel={'Contabilidad'}
                      hrefLabel={'/Contabilidad'}
                    />
                    <NavLink
                      iconLabel={'home'}
                      textLabel={'Inicio'}
                      hrefLabel="/"
                    />
                    <NavLink
                      iconLabel={'park'}
                      textLabel={'christmas'}
                      hrefLabel={'/Ayudante/Navidad'}
                    />
                    <NavLink
                      iconLabel={'forest'}
                      textLabel={'Christmas Router'}
                      hrefLabel={'/Ayudante/Navidad/Router'}
                    />
                    <NavLink
                      iconLabel={'gavel'}
                      textLabel={'ultimas actuaciones'}
                      hrefLabel={'/Carpetas/UltimasActuaciones' as Route}
                    />

                    <NavLink
                      iconLabel={'folder_open'}
                      textLabel={'Carpetas'}
                      hrefLabel="/Carpetas"
                    />
                    <NavLink
                      iconLabel={'person_add'}
                      textLabel={'Nueva Carpeta'}
                      hrefLabel={'/Carpetas/Nueva'}
                    />

                    <NavLink
                      iconLabel={'add_shopping_cart'}
                      textLabel={'ingresar factura'}
                      hrefLabel={'/Contabilidad/NuevaFactura' as Route}
                    />


                    <NavLink
                      iconLabel={'sticky_note_2'}
                      textLabel={'Notas'}
                      hrefLabel={'/Notas'}
                    />
                    <NavLink
                      iconLabel={'add_comment'}
                      textLabel={'Nueva Nota'}
                      hrefLabel={'/(.)Notas/Nueva'}
                    />
                    <NavLink
                      iconLabel={'badge'}
                      textLabel={'Quienes Somos'}
                      hrefLabel={'/QuienesSomos'}
                    />

                    <NavLink
                      iconLabel={'calendar_month'}
                      textLabel={'Calendario'}
                      hrefLabel={`/Calendario/Fecha/${ newYear }/${ newMonth }/${ newDate }`}
                    />
                    <NavLink
                      iconLabel={''}
                      textLabel={'Bancolombia'}
                      hrefLabel={'/Carpetas/Categorias/Bancolombia'}
                    />
                  </Drawer>
                </Suspense>
              )}
            </div>
          );
};
