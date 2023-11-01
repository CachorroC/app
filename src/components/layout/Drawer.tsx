'use client';
import { MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef, } from 'react';
import { useNavigationContext } from '#@/app/context/main-context';
import layout from '#@/styles/layout.module.css';
import { NavLink } from './NavLink';
import styles from './navbar.module.css';


export const Drawer = (
  {
    children
  }: { children: ReactNode }
) => {
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
          <NavLink iconLabel={ 'home' } textLabel={ 'Inicio' } hrefLabel='/' />
          <NavLink iconLabel={ 'gavel'} textLabel={ 'ultimas actuaciones'} hrefLabel= '/Carpetas/UltimasActuaciones'  />
          <NavLink iconLabel={ 'note' } textLabel={ 'Notas' } hrefLabel='/Notas'  />
          <NavLink iconLabel={ 'folder_open' } textLabel={ 'Carpetas' } hrefLabel= '/Carpetas'   />
          <NavLink iconLabel={ 'accessibility_new' } textLabel={ 'Quienes Somos' } hrefLabel= '/QuienesSomos'  />
          <NavLink iconLabel={ 'folder_add' } textLabel={ 'Nueva carpeta' } hrefLabel= '/Carpetas/Nueva'  />
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
};
