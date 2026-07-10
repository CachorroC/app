import { CategoryColor } from './carpeta-meta';
import styles from './category-chip.module.css';

export function CategoryChip( {
  label,
  color,
  outline,
}: {
  label   : string;
  color   : CategoryColor;
  outline?: boolean;
} ) {
  return (
    <span
      className={outline
        ? styles.outline
        : styles.chip}
      data-color={color}
    >
      {label}
    </span>
  );
}
