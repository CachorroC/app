'use client';

import { useState } from 'react';
import styles from './checkbox.module.css';

export type CheckboxProps = {
  checked?       : boolean;
  defaultChecked?: boolean;
  indeterminate? : boolean;
  disabled?      : boolean;
  label?         : string;
  ariaLabel?     : string;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onChange?      : ( checked: boolean ) => void;
};

export const Checkbox = ( {
  checked,
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
  label,
  ariaLabel,
  onChange,
}: CheckboxProps ) => {
  const [
    inner,
    setInner 
  ] = useState( defaultChecked );
  const on = checked !== undefined
    ? checked
    : inner;
  const marked = on || indeterminate;

  const toggle = () => {
    if ( disabled ) {
      return;
    }

    const next = !on;

    if ( checked === undefined ) {
      setInner( next );
    }

    onChange?.( next );
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate
        ? 'mixed'
        : on}
      aria-label={ariaLabel || label}
      disabled={disabled}
      onClick={toggle}
      className={styles.root}
    >
      <span className={`${ styles.box } ${ marked
        ? styles.marked
        : '' }`}
      >
        <span className={styles.halo} aria-hidden="true" />
        {indeterminate
          ? <span className={styles.dash} />
          : on && <span className={styles.tick} />}
      </span>
      {label && <span>{label}</span>}
    </button>
  );
};
