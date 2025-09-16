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
      <DrawerMenuButton />
      <NewNoteButton />
      <NavLink
        key={'home'}
        iconLabel={'home'}
        textLabel={'Inicio'}
        hrefLabel={'/' as Route}
      />
      <NavLink
        iconLabel={'folder'}
        textLabel={'Carpetas'}
        key={'actuaciones'}
        hrefLabel={'/Carpetas'}
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
              iconLabel={'task'}
              textLabel={'Tareas'}
              hrefLabel={'/Tareas'as Route}
            />

            <NavLink
              iconLabel={'home'}
              textLabel={'Inicio'}
              hrefLabel={'/' as Route}
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
            <NavLink
              iconLabel={''}
              textLabel={'Reintegra'}
              hrefLabel={'/Carpetas/Categorias/Reintegra'}
            />
          </Drawer>
        </Suspense>
      )}
    </div>
  );
};
