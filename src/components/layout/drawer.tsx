'use client';
import { ReactNode, Suspense, useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import navbar from 'components/layout/navbar.module.css';
import { useNavigationContext } from '#@/app/context/navigation-context';

export default function Drawer(
            {
                            children 
            }: { children: ReactNode } 
) {
  const {
                  isNavOpen 
  } = useNavigationContext();

  if ( !isNavOpen ) {
    return null;
  }

  return (
    <nav className={navbar.drawer}>
      <div className={navbar.sidenav}>{children}</div>
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
