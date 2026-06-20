/* eslint-disable no-unused-vars */
'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Carpeta, Category } from '#@/lib/types/dashboard_types';
import { CATEGORY_META } from '#@/lib/format';
import styles from '#@/styles/Sidebar.module.css';
import { Icon } from '../ui';
import { Route } from 'next';

interface SidebarProps {
  carpetas         : Carpeta[];
  activeCategory?  : Category | 'todos';
  onSelectCategory?: ( c: Category | 'todos' ) => void;
  theme            : 'light' | 'dark';
  onToggleTheme    : () => void;
  /** Mobile drawer state (ignored on desktop where the rail is static). */
  open?            : boolean;
  onClose?         : () => void;
}

const NAV = [
  {
    icon  : 'folder_open',
    label : 'Carpetas',
    href  : '/Carpetas_alt',
    active: true,
    badge : null as number | null,
  },
  {
    icon  : 'event',
    label : 'Agenda',
    href  : '#',
    active: false,
    badge : 4,
  },
  {
    icon  : 'receipt_long',
    label : 'Facturas',
    href  : '#',
    active: false,
    badge : null,
  },
  {
    icon  : 'account_balance',
    label : 'Juzgados',
    href  : '#',
    active: false,
    badge : null,
  },
  {
    icon  : 'groups',
    label : 'Deudores',
    href  : '#',
    active: false,
    badge : null,
  },
];

export default function Sidebar( {
  carpetas,
  activeCategory = 'todos',
  onSelectCategory,
  theme,
  onToggleTheme,
  open = false,
  onClose,
}: SidebarProps ) {
  const counts = useMemo(
    () => {
      const c: Partial<Record<Category, number>> = {};
      carpetas.forEach( ( k ) => {
        c[ k.category ] = ( c[ k.category ] ?? 0 ) + 1;
      } );

      return c;
    }, [
      carpetas
    ]
  );

  const categories = ( Object.keys( CATEGORY_META ) as Category[] ).filter( ( k ) => {
    return counts[ k ];
  } );

  function selectCategory( c: Category | 'todos' ) {
    onSelectCategory?.( c );
    onClose?.();
  }

  return (
    <>
      {/* Scrim — only visible/interactive on mobile when the drawer is open */}
      <div
        className={`${ styles.scrim } ${ open
          ? styles.scrimOpen
          : '' }`}
        onClick={onClose}
        aria-hidden
      />
      <aside className={`${ styles.sidebar } ${ open
        ? styles.sidebarOpen
        : '' }`}
      >
        <div className={styles.brand}>
          <span className={styles.logo}>
            <Icon
              name="balance"
              fill
              size={22}
            />
          </span>
          <span className={styles.brandText}>
            <strong>Asesor Jurídico</strong>
            <small>GESTIÓN DE CARPETAS</small>
          </span>
        </div>

        <nav className={styles.nav}>
          {NAV.map( ( n ) => {
            return (
              <Link
                key={n.label}
                href={n.href as Route}
                className={`${ styles.navItem } ${
                  n.active
                    ? styles.navActive
                    : ''
                }`}
              >
                <Icon
                  name={n.icon}
                  fill={n.active}
                  size={21}
                />
                <span className={styles.navLabel}>{n.label}</span>
                {n.badge != null && (
                  <span className={styles.navBadge}>{n.badge}</span>
                )}
              </Link>
            );
          } )}
        </nav>

        <div className={styles.sectionLabel}>Categorías</div>
        <nav className={styles.catNav}>
          <button
            className={`${ styles.catItem } ${
              activeCategory === 'todos'
                ? styles.catActive
                : ''
            }`}
            onClick={() => {
              return selectCategory( 'todos' );
            }}
          >
            <span
              className={styles.catDot}
              style={{
                background: 'var(--outline)',
              }}
            />
            <span className={styles.catLabel}>Todos</span>
            <span className={styles.catCount}>{carpetas.length}</span>
          </button>
          {categories.map( ( k ) => {
            return (
              <button
                key={k}
                className={`${ styles.catItem } ${
                  activeCategory === k
                    ? styles.catActive
                    : ''
                }`}
                onClick={() => {
                  return selectCategory( k );
                }}
              >
                <span
                  className={styles.catDot}
                  style={{
                    background: CATEGORY_META[ k ].colorVar,
                  }}
                />
                <span className={styles.catLabel}>
                  {CATEGORY_META[ k ].label}
                </span>
                <span className={styles.catCount}>{counts[ k ]}</span>
              </button>
            );
          } )}
        </nav>

        <div className={styles.user}>
          <span className={styles.avatar}>VA</span>
          <span className={styles.userText}>
            <strong>Valentina Arango</strong>
            <small>Abogada titular</small>
          </span>
          <button
            className={styles.themeBtn}
            onClick={onToggleTheme}
            title="Cambiar tema"
            aria-label="Cambiar tema"
          >
            <Icon
              name={theme === 'dark'
                ? 'light_mode'
                : 'dark_mode'}
              size={20}
            />
          </button>
        </div>
      </aside>
    </>
  );
}
