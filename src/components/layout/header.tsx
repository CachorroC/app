'use client';

import { Suspense, useState } from 'react';
import layout from '#@/styles/layout.module.css';
import type { MonCarpeta } from 'types/carpetas';
import SearchOutputList from './search/SearchProcesosOutput';
import SearchOutputListSkeleton from './search/SearchProcesosOutputSkeleton';
import navbar from 'components/layout/navbar.module.css';
import type { Route } from 'next';
import Link from 'next/link';
import { buttonDrawerMenu } from '../Buttons/buttons.module.css';
import { useRouter } from 'next/router';
import InputSearchBar from './search/InputSearchBar';

export default function Header (
  {
    carpetas
  }: {carpetas: MonCarpeta[]}
) {
  const router = useRouter();

  const [
            isNavOpen,
            setIsNavOpen
  ] = useState(
    false
  );
  let topBar;

  if ( isNavOpen ) {
    topBar = (

      <nav className={navbar.drawer}>
        <Suspense fallback={<SearchOutputListSkeleton />}>
          <SearchOutputList
            path={'/Procesos'}
            fechas={carpetas}
          />
        </Suspense>
        <Link
          className={navbar.button}
          href={'/Carpetas'}
        >
          {'Carpetas'}
        </Link>
        <Link
          className={navbar.button}
          href={'/Contacto' as Route}
        >
          {'Contacto'}
        </Link>
        <Link
          className={navbar.button}
          href={'/QuienesSomos'}
        >
          {'Quienes Somos'}
        </Link>
        <Link
          className={navbar.button}
          href={'/Procesos' as Route}
        >
          {'Procesos'}
        </Link>
        <Link
          className={navbar.button}
          href={'/Notas' as Route}
        >
          {'Notas'}
        </Link>
        <Link
          className={navbar.button}
          href={'/Procesos/Nuevo'}
        >
          {'Nueva carpeta'}
        </Link>
      </nav>
    );
  }



  return (
    <div className={ layout.header }>
      <Link
        href={'/' as Route}
        className={navbar.buttonHome}
      >
        <span className={`material-symbols-outlined ${ navbar.icon }`}>home</span>
        <p className={navbar.ButtonTextHelper}>inicio</p>
      </Link>
      <InputSearchBar />
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
        className={buttonDrawerMenu}
        onClick={ (
          e
        ) => {
          setIsNavOpen(
            !isNavOpen
          );
        }}
      >
        <span className={`material-symbols-outlined ${ navbar.icon }`}>
          {isNavOpen
            ? 'close'
            : 'menu'}
        </span>
        <p className={navbar.ButtonTextHelper}>
          {isNavOpen
            ? 'cerrar'
            : 'abrir'}
        </p>
      </button>
      {topBar}
    </div>

  );
}