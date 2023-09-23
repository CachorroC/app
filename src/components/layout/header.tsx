'use client';

import { Suspense, useState } from 'react';
import layout from '#@/styles/layout.module.css';
import type { MonCarpeta } from 'types/carpetas';
import SearchOutputList from './search/SearchProcesosOutput';
import SearchOutputListSkeleton from './search/SearchProcesosOutputSkeleton';
import navbar from 'components/layout/navbar.module.css';
import type { Route } from 'next';
import Link from 'next/link';
import button from '../Buttons/buttons.module.css';
import { useRouter } from 'next/navigation';
import InputSearchBar from './search/InputSearchBar';
import { Loader } from '../Loader';

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
      <nav className={ navbar.drawer }>
        <div className={navbar.sidenav}>
          <Suspense fallback={<SearchOutputListSkeleton />}>
            <SearchOutputList
              path={'/Procesos'}
              fechas={carpetas}
            />
          </Suspense>
        </div>

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
      {topBar}
    </div>

  );
}