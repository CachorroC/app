import { ReactNode } from 'react';
import styles from '#@/styles/layout.module.css';

/**
 * Off-canvas panel for the `@right` slot. Pure CSS (checkbox + sibling
 * selectors in layout.module.scss) — no client component needed. Pair
 * with `FilterDrawerButton` using the same `id` to open/close it.
 */
export const FilterDrawer = ( {
  id,
  children,
}: {
  id      : string;
  children: ReactNode;
} ) => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className={styles.drawerToggle}
      />
      <label
        htmlFor={id}
        className={styles.scrim}
        aria-hidden="true"
      />
      <div className={styles.right}>{children}</div>
    </>
  );
};

export const FilterDrawerButton = ( {
  id,
  label = 'Abrir filtros',
}: {
  id    : string;
  label?: string;
} ) => {
  return (
    <label
      htmlFor={id}
      className={styles.drawerButton}
      aria-label={label}
    >
      <span
        className="material-symbols-rounded"
        aria-hidden="true"
      >
        tune
      </span>
    </label>
  );
};
