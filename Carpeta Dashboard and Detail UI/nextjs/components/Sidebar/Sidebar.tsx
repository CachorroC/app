'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { Icon } from '@/components/ui';
import { CATEGORY_META } from '@/lib/format';
import { Category, type Carpeta } from '@/lib/types';

interface SidebarProps {
  carpetas: Carpeta[];
  activeCategory?: Category | 'todos';
  onSelectCategory?: (c: Category | 'todos') => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const NAV = [
  { icon: 'folder_open', label: 'Carpetas', href: '/carpetas', active: true, badge: null as number | null },
  { icon: 'event', label: 'Agenda', href: '#', active: false, badge: 4 },
  { icon: 'receipt_long', label: 'Facturas', href: '#', active: false, badge: null },
  { icon: 'account_balance', label: 'Juzgados', href: '#', active: false, badge: null },
  { icon: 'groups', label: 'Deudores', href: '#', active: false, badge: null },
];

export default function Sidebar({ carpetas, activeCategory = 'todos', onSelectCategory, theme, onToggleTheme }: SidebarProps) {
  const counts = useMemo(() => {
    const c: Partial<Record<Category, number>> = {};
    carpetas.forEach((k) => { c[k.category] = (c[k.category] ?? 0) + 1; });
    return c;
  }, [carpetas]);

  const categories = (Object.keys(CATEGORY_META) as Category[]).filter((k) => counts[k]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.logo}><Icon name="balance" fill size={22} /></span>
        <span className={styles.brandText}>
          <strong>Asesor Jurídico</strong>
          <small>GESTIÓN DE CARPETAS</small>
        </span>
      </div>

      <nav className={styles.nav}>
        {NAV.map((n) => (
          <Link key={n.label} href={n.href} className={`${styles.navItem} ${n.active ? styles.navActive : ''}`}>
            <Icon name={n.icon} fill={n.active} size={21} />
            <span className={styles.navLabel}>{n.label}</span>
            {n.badge != null && <span className={styles.navBadge}>{n.badge}</span>}
          </Link>
        ))}
      </nav>

      <div className={styles.sectionLabel}>Categorías</div>
      <nav className={styles.catNav}>
        <button
          className={`${styles.catItem} ${activeCategory === 'todos' ? styles.catActive : ''}`}
          onClick={() => onSelectCategory?.('todos')}
        >
          <span className={styles.catDot} style={{ background: 'var(--outline)' }} />
          <span className={styles.catLabel}>Todos</span>
          <span className={styles.catCount}>{carpetas.length}</span>
        </button>
        {categories.map((k) => (
          <button
            key={k}
            className={`${styles.catItem} ${activeCategory === k ? styles.catActive : ''}`}
            onClick={() => onSelectCategory?.(k)}
          >
            <span className={styles.catDot} style={{ background: CATEGORY_META[k].colorVar }} />
            <span className={styles.catLabel}>{CATEGORY_META[k].label}</span>
            <span className={styles.catCount}>{counts[k]}</span>
          </button>
        ))}
      </nav>

      <div className={styles.user}>
        <span className={styles.avatar}>VA</span>
        <span className={styles.userText}>
          <strong>Valentina Arango</strong>
          <small>Abogada titular</small>
        </span>
        <button className={styles.themeBtn} onClick={onToggleTheme} title="Cambiar tema" aria-label="Cambiar tema">
          <Icon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} size={20} />
        </button>
      </div>
    </aside>
  );
}
