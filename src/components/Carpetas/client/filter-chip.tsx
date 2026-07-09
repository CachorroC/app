'use client';

import { CategoryColor } from './carpeta-meta';
import styles from './filter-chip.module.css';

export function FilterChip( {
  label,
  selected,
  color = 'neutral',
  onClick,
}: {
  label   : string;
  selected: boolean;
  color?  : CategoryColor;
  onClick : () => void;
} ) {
  return (
    <button
      type="button"
      className={styles.chip}
      data-selected={selected}
      data-color={color}
      aria-pressed={selected}
      onClick={onClick}
    >
      {selected && (
        <span
          className="material-symbols-rounded"
          aria-hidden="true"
        >
          check
        </span>
      )}
      {label}
    </button>
  );
}
