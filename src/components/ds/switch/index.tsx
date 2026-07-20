'use client';

import { useState } from 'react';
import styles from './switch.module.css';

export type SwitchProps = {
  checked?       : boolean;
  defaultChecked?: boolean;
  disabled?      : boolean;
  ariaLabel?     : string;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onChange?      : ( checked: boolean ) => void;
};

export const Switch = ( {
  checked,
  defaultChecked = false,
  disabled = false,
  ariaLabel,
  onChange,
}: SwitchProps ) => {
  const [
    inner,
    setInner 
  ] = useState( defaultChecked );
  const on = checked !== undefined
    ? checked
    : inner;

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
      role="switch"
      aria-checked={on}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={toggle}
      className={`${ styles.track } ${ on
        ? styles.on
        : '' }`}
    >
      <span className={`${ styles.thumb } ${ on
        ? styles.on
        : '' }`} aria-hidden="true"
      />
    </button>
  );
};
