'use client';
import { MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef, } from 'react';
import styles from '../navbar.module.css';
import { useNavigationContext } from '#@/app/context/main-context';
import Link from 'next/link';
import layout from '#@/styles/layout.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import type { Route } from 'next';

export default function Drawer(
  {
    children 
  }: { children: ReactNode } 
) {
  const {
    isNavOpen, setIsNavOpen 
  } = useNavigationContext();

  const wrapper = useRef(
    null 
  );

  const overlay = useRef(
    null 
  );

  const onDismiss = useCallback(
    () => {
      setIsNavOpen(
        (
          n 
        ) => {
          return !n;
        } 
      );
    }, [
      setIsNavOpen
    ] 
  );

  const onClick: MouseEventHandler = useCallback(
    (
      e 
    ) => {
      if ( e.target === overlay.current || e.target === wrapper.current ) {
        if ( onDismiss ) {
          onDismiss();
        }
      }
    },
    [
      onDismiss,
      overlay,
      wrapper
    ],
  );

  const onKeyDown = useCallback(
    (
      e: KeyboardEvent 
    ) => {
      if ( e.key === 'Escape' ) {
        onDismiss();
      }
    },
    [
      onDismiss
    ],
  );

  useEffect(
    () => {
      document.addEventListener(
        'keydown', onKeyDown 
      );

      return () => {
        return document.removeEventListener(
          'keydown', onKeyDown 
        );
      };
    }, [
      onKeyDown
    ] 
  );

  if ( !isNavOpen ) {
    return null;
  }

  return (
    <nav
      className={styles.drawer}
      onClick={onClick}
      ref={overlay}
    >
      <Link
        className={layout.link}
        onClick={() => {
          setIsNavOpen(
            (
              n 
            ) => {
              return !n;
            } 
          );
        }}
        href={'/Procesos' as Route}
      >
        <span className="material-symbols-outlined">gavel</span>
        <h1 className={typography.labelMedium}>{'Procesos'}</h1>
      </Link>
      <Link
        className={layout.link}
        onClick={() => {
          setIsNavOpen(
            (
              n 
            ) => {
              return !n;
            } 
          );
        }}
        href={'/Notas' as Route}
      >
        <span className="material-symbols-outlined">note</span>
        <h1 className={typography.labelMedium}>{'Notas'}</h1>
      </Link>
      <Link
        className={layout.link}
        onClick={() => {
          setIsNavOpen(
            (
              n 
            ) => {
              return !n;
            } 
          );
        }}
        href={'/Carpetas' as Route}
      >
        <span className="material-symbols-outlined">folder_open</span>
        <h1 className={typography.labelMedium}>{'Carpetas'}</h1>
      </Link>
      <Link
        className={layout.link}
        onClick={() => {
          setIsNavOpen(
            (
              n 
            ) => {
              return !n;
            } 
          );
        }}
        href={'/Notas/Tareas'}
      >
        <span className="material-symbols-outlined">api</span>
        <h1 className={typography.labelMedium}>{'Tareas'}</h1>
      </Link>
      <Link
        className={layout.link}
        onClick={() => {
          setIsNavOpen(
            (
              n 
            ) => {
              return !n;
            } 
          );
        }}
        href={'/Notas/Nueva' as Route}
      >
        <span className="material-symbols-outlined">note_add</span>
        <h1 className={typography.labelMedium}>{'Nueva Nota'}</h1>
      </Link>
      <Link
        className={layout.link}
        onClick={() => {
          setIsNavOpen(
            (
              n 
            ) => {
              return !n;
            } 
          );
        }}
        href={'/Costos'}
      >
        <span className="material-symbols-outlined">folder_open</span>
        <h1 className={typography.labelMedium}>{'Costos'}</h1>
      </Link>
      <Link
        className={layout.link}
        onClick={() => {
          setIsNavOpen(
            (
              n 
            ) => {
              return !n;
            } 
          );
        }}
        href={'/Contacto' as Route}
      >
        <span className="material-symbols-outlined">folder_open</span>
        <h1 className={typography.labelMedium}>{'Contacto'}</h1>
      </Link>
      <Link
        className={layout.link}
        onClick={() => {
          setIsNavOpen(
            (
              n 
            ) => {
              return !n;
            } 
          );
        }}
        href={'/QuienesSomos'}
      >
        <span className="material-symbols-outlined">folder_open</span>
        <h1 className={typography.labelMedium}>{'Quienes Somos'}</h1>
      </Link>
      <div
        className={styles.sidenav}
        ref={wrapper}
      >
        {children}
      </div>
    </nav>
  );
}
