'use client';

import { ReactNode, Suspense, useState } from 'react';
import layout from '#@/styles/layout.module.css';
import navbar from 'components/layout/navbar.module.css';
import type { Route } from 'next';
import Link from 'next/link';
import button from '../Buttons/buttons.module.css';
import { useRouter } from 'next/navigation';
import InputSearchBar from './search/InputSearchBar';
import { Loader } from '../Loader';
import typography from '#@/styles/fonts/typography.module.scss';

export default function Header (
  {
    children
  }: {children: ReactNode}
) {
  const router = useRouter();

  const [
    isNavOpen,
    setIsNavOpen
  ] = useState(
    false
  );

  return (
    <div className={ layout.header }>
      <Link
        href={'/' as Route}
        className={navbar.buttonHome}
      >
        <span className={`material-symbols-outlined ${ navbar.icon }`}>home</span>
        <p className={navbar.ButtonTextHelper}>inicio</p>
      </Link>
      <Suspense fallback={<Loader />}>
        <InputSearchBar />
      </Suspense>
      <button
        type="button"
        className={navbar.buttonForward}
        onClick={() => {
          router.forward();
        }}
      >
        <span className={`material-symbols-outlined ${ navbar.icon }`}>
        chevron_right
        </span>
        <p className={navbar.ButtonTextHelper}>entrar</p>
      </button>
      <button
        type="button"
        className={navbar.buttonBackwards}
        onClick={ () => {
          router.back();
        }}
      >
        <span className={`material-symbols-outlined ${ navbar.icon }`}>
        chevron_left
        </span>
        <p className={navbar.ButtonTextHelper}>atras</p>
      </button>
      <button
        type="button"
        className={button.buttonDrawerMenu}
        onClick={ () => {
          setIsNavOpen(
            !isNavOpen
          );
        }}
      >
        <span className={`material-symbols-outlined ${ button.icon }`}>
          {isNavOpen
            ? 'close'
            : 'menu'}
        </span>
      </button>
      { isNavOpen && (

        <nav className={ navbar.drawer }>

          <Link
            className={ layout.link }
            href={ '/Procesos' as Route }
          >
            <span className="material-symbols-outlined">gavel</span>
            <h1 className={ typography.labelMedium }>{ 'Procesos' }</h1>
          </Link>
          <Link
            className={ layout.link }
            href={ '/Notas' as Route }
          >
            <span className="material-symbols-outlined">note</span>
            <h1 className={ typography.labelMedium }>{ 'Notas' }</h1>
          </Link>
          <Link
            className={ layout.link }
            href={ '/Carpetas' as Route}
          >
            <span className="material-symbols-outlined">folder_open</span>
            <h1 className={ typography.labelMedium }>{ 'Carpetas' }</h1>
          </Link>
          <Link
            className={ layout.link }
            href={ '/Tareas' }
          >
            <span className="material-symbols-outlined">api</span>
            <h1 className={ typography.labelMedium }>{ 'Tareas' }</h1>
          </Link>
          <Link
            className={ layout.link }
            href={ '/Notas/Nueva' }
          >
            <span className="material-symbols-outlined">note_add</span>
            <h1 className={ typography.labelMedium }>{ 'Nueva Nota' }</h1>
          </Link>
          <Link
            className={ layout.link }
            href={ '/Costos' }
          >
            <span className="material-symbols-outlined">folder_open</span>
            <h1 className={ typography.labelMedium }>{ 'Costos' }</h1>
          </Link>
          <Link
            className={ layout.link }
            href={ '/Contacto' as Route }
          >
            <span className="material-symbols-outlined">folder_open</span>
            <h1 className={ typography.labelMedium }>{ 'Contacto' }</h1>
          </Link>
          <Link
            className={ layout.link }
            href={ '/QuienesSomos' }
          >
            <span className="material-symbols-outlined">folder_open</span>
            <h1 className={ typography.labelMedium }>{ 'Quienes Somos' }</h1>
          </Link>

          <div className={navbar.sidenav}>
            {children}
          </div>

        </nav>
      )}
    </div>

  );
}