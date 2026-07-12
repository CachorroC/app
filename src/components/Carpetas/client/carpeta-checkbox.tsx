/* eslint-disable no-unused-vars */
'use client';

import { useEffect, useRef } from 'react';
import styles from './carpeta-checkbox.module.css';

export function CarpetaCheckbox( {
  checked,
  indeterminate,
  onChange,
  ariaLabel,
}: {
  checked       : boolean;
  indeterminate?: boolean;
  onChange      : ( checked: boolean ) => void;
  ariaLabel     : string;
} ) {
  const inputRef = useRef<HTMLInputElement>( null );

  useEffect(
    () => {
      if ( inputRef.current ) {
        inputRef.current.indeterminate = Boolean( indeterminate );
      }
    }, [
      indeterminate
    ] 
  );

  return (
    <input
      ref={inputRef}
      type="checkbox"
      className={styles.checkbox}
      checked={checked}
      aria-label={ariaLabel}
      onChange={( event ) => {
        return onChange( event.target.checked );
      }}
      onClick={( event ) => {
        event.stopPropagation();
      }}
    />
  );
}
