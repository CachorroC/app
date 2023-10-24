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
import typography from '#@/styles/fonts/typography.module.css';
import type { Route } from 'next';
import buttonStyles from '#@/components/Buttons/buttons.module.css';
import { usePathname } from 'next/navigation';

export function NavLink<T extends string> (
  {
    iconLabel, textLabel, hrefLabel
  }: { iconLabel: string; textLabel: string;  hrefLabel: Route<T> | URL}
) {

  const {
    setIsNavOpen
  } = useNavigationContext();

  const pathname = usePathname();

  const isActive = pathname === hrefLabel;
  return (
    <Link
      className={isActive
        ? buttonStyles.buttonActiveCategory
        : buttonStyles.buttonPassiveCategory}
      onClick={() => {
        setIsNavOpen(
          (
            n
          ) => {
            return !n;

          }
        );
      }}
      href={hrefLabel as Route}
    >
      <span className={`material-symbols-outlined ${ buttonStyles.icon }`}>{iconLabel}</span>
      <h1 className={`${ typography.labelMedium } ${ buttonStyles.text }`}>{textLabel}</h1>
    </Link>
  );
}

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

      <section style={{
        gridArea: 'span 2 / span 5'
      } } className={ layout.segmentColumn }>

        <section className={ layout.segmentRowWrap }>
          <NavLink iconLabel={ 'home' } textLabel={ 'Inicio' } hrefLabel={ '/' } />
          <NavLink iconLabel={ 'gavel'} textLabel={ 'ultimas actuaciones'} hrefLabel={ '/Carpetas/UltimasActuaciones' } />
          <NavLink iconLabel={ 'note' } textLabel={ 'Notas' } hrefLabel={ '/Notas' as Route } />
          <NavLink iconLabel={ 'folder_open' } textLabel={ 'Carpetas' } hrefLabel={ '/Carpetas' as Route }  />





          <NavLink iconLabel={ 'contact_support' } textLabel={ 'Contáctenos' } hrefLabel={ '/Contacto' } />
          <NavLink iconLabel={ 'accessibility_new' } textLabel={ 'Quienes Somos' } hrefLabel={ '/QuienesSomos' } />
          <NavLink iconLabel={ 'note_add' } textLabel={ 'Nueva Nota' } hrefLabel={ '/Notas/Nueva' as Route } />
          <NavLink iconLabel={ '' } textLabel={ 'Nueva carpeta' } hrefLabel={ '/Carpetas/Nueva' } />
        </section>
      </section>
      <div
        className={styles.sidenav}
        ref={wrapper}
      >
        {children}
      </div>
    </nav>
  );
}
