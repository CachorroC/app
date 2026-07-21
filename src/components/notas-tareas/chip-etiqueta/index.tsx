import { CSSProperties } from 'react';
import styles from './chip-etiqueta.module.css';

export type ChipEtiquetaProps = {
  texto       : string;
  color?      : string;
  maxChars?   : number;
  style?      : CSSProperties;
  onRemove?   : () => void;
  removeLabel?: string;
};

export const ChipEtiqueta = ( {
  texto, color = '#6a4fa8', maxChars = 18, style, onRemove, removeLabel
}: ChipEtiquetaProps ) => {
  return (
    <span
      title={texto}
      className={styles.chip}
      style={{
        maxWidth  : `calc(${ maxChars + 2 }ch + 26px)`,
        background: `color-mix(in srgb, ${ color } 12%, var(--color-surface))`,
        border    : `1px solid color-mix(in srgb, ${ color } 42%, transparent)`,
        ...style,
      }}
    >
      <span className={styles.punto} style={{
        background: color
      }} aria-hidden="true"
      />
      <span className={styles.texto}>{texto}</span>
      {onRemove && (
        <button
          type="button"
          className={styles.quitar}
          aria-label={removeLabel ?? `Quitar ${ texto }`}
          onClick={onRemove}
        >
          <span className="material-symbols-rounded" aria-hidden="true">close</span>
        </button>
      )}
    </span>
  );
};
