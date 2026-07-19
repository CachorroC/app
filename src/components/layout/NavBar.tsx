'use client';
import Image from 'next/image';
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

  return (
    <div className={styles.header}>
      <Image
        src="/icon.png"
        alt="R&S Asesoría Jurídica"
        width={36}
        height={36}
        className={styles.navBrand}
        priority
      />

      <NavLink
        iconLabel={'home'}
        textLabel={'Inicio'}
        hrefLabel={'/' as Route}
      />
      <NavLink
        iconLabel={'folder'}
        textLabel={'Carpetas'}
        hrefLabel={'/Carpetas'}
      />
      <NavLink
        iconLabel={'sticky_note_2'}
        textLabel={'Notas'}
        hrefLabel={'/Notas'}
      />
      <NavLink
        iconLabel={'description'}
        textLabel={'Memoriales'}
        hrefLabel={'/memoriales' as Route}
      />
      <NavLink
        iconLabel={'calculate'}
        textLabel={'Amortizac.'}
        hrefLabel={'/amortizacion' as Route}
      />

      <div className={styles.navSpacer} />

      <DrawerMenuButton />

      {isNavOpen && (
        <Suspense fallback={<Loader />}>
          <Drawer>
            <DrawerMenuButton />
            <NewNoteButton />
            <NavLink
              iconLabel={'gavel'}
              textLabel={'Últ. actuaciones'}
              hrefLabel={'/Carpetas/UltimasActuaciones' as Route}
            />
            <NavLink
              iconLabel={'person_add'}
              textLabel={'Nueva Carpeta'}
              hrefLabel={'/Carpetas/Nueva'}
            />
            <NavLink
              iconLabel={'note_add'}
              textLabel={'Nueva Nota'}
              hrefLabel={'/Notas/Nueva'}
            />
            <NavLink
              iconLabel={'payments'}
              textLabel={'Costos'}
              hrefLabel={'/Costos'}
            />
            <NavLink
              iconLabel={'contact_support'}
              textLabel={'Contacto'}
              hrefLabel={'/Contacto'}
            />
            <NavLink
              iconLabel={'badge'}
              textLabel={'Quiénes Somos'}
              hrefLabel={'/QuienesSomos'}
            />
          </Drawer>
        </Suspense>
      )}
    </div>
  );
};
