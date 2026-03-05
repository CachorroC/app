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
  const { isNavOpen } = useNavigationContext();

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
        hrefLabel={'/carpetas'}
      />
      <NavLink
        iconLabel={'folder'}
        textLabel={'Carpetas Alternativo'}
        hrefLabel={'/carpetas-alt'}
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
              hrefLabel={'/tareas' as Route}
            />

            <NavLink
              iconLabel={'home'}
              textLabel={'Inicio'}
              hrefLabel={'/' as Route}
            />
            <NavLink
              iconLabel={'park'}
              textLabel={'christmas'}
              hrefLabel={'/ayudante/navidad'}
            />
            <NavLink
              iconLabel={'park'}
              textLabel={'christmas'}
              hrefLabel={'/ayudante/navidad/new'}
            />
            <NavLink
              iconLabel={'forest'}
              textLabel={'Christmas Router'}
              hrefLabel={'/ayudante/navidad/router'}
            />
            <NavLink
              iconLabel={'forest'}
              textLabel={'Christmas'}
              hrefLabel={'/ayudante/navidad'}
            />
            <NavLink
              iconLabel={'gavel'}
              textLabel={'ultimas actuaciones'}
              hrefLabel={'/carpetas/ultimas-actuaciones' as Route}
            />

            <NavLink
              iconLabel={'folder_open'}
              textLabel={'Carpetas'}
              hrefLabel="/carpetas"
            />
            <NavLink
              iconLabel={'person_add'}
              textLabel={'Nueva Carpeta'}
              hrefLabel={'/carpetas/nueva'}
            />

            {/* NOTE: Contabilidad route doesn't exist yet - disabled for now */}
            {/* <NavLink
              iconLabel={'add_shopping_cart'}
              textLabel={'ingresar factura'}
              hrefLabel={'/contabilidad/nueva-factura' as Route}
            /> */}

            <NavLink
              iconLabel={'task'}
              textLabel={'tareas'}
              hrefLabel={'/tareas' as Route}
            />
            <NavLink
              iconLabel={'sticky_note_2'}
              textLabel={'Notas'}
              hrefLabel={'/notas'}
            />
            <NavLink
              iconLabel={'note_add'}
              textLabel={'Nueva Nota'}
              hrefLabel={'/notas/nueva'}
            />

            <NavLink
              iconLabel={'badge'}
              textLabel={'Quienes Somos'}
              hrefLabel={'/quienes-somos'}
            />

            <NavLink
              iconLabel={''}
              textLabel={'Bancolombia'}
              hrefLabel={'/carpetas/categorias/Bancolombia'}
            />
            <NavLink
              iconLabel={''}
              textLabel={'Reintegra'}
              hrefLabel={'/carpetas/categorias/Reintegra'}
            />
          </Drawer>
        </Suspense>
      )}
    </div>
  );
};
