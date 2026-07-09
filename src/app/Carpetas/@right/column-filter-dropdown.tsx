/* eslint-disable no-unused-vars */
'use client';

import { ChangeEvent } from 'react';
import styles from './column-filter-dropdown.module.css';

export function ColumnFilterDropdown( {
  label,
  options,
  selected,
  onChange,
}: {
  label   : string;
  options : string[];
  selected: Set<string>;
  onChange: ( values: Set<string> ) => void;
} ) {
  const sortedOptions = [
    ...new Set( options )
  ].sort();

  const handleToggle = ( option: string ) => {
    return ( event: ChangeEvent<HTMLInputElement> ) => {
      const next = new Set( selected );

      if ( event.target.checked ) {
        next.add( option );
      } else {
        next.delete( option );
      }

      return onChange( next );
    };
  };

  return (
    <details className={styles.dropdown}>
      <summary className={styles.trigger}>{label}</summary>
      <div className={styles.panel}>
        <label className={styles.allOption}>
          <input
            type="checkbox"
            checked={selected.size === 0}
            onChange={() => {
              return onChange( new Set() );
            }}
          />
          {'Todos'}
        </label>

        {sortedOptions.map( ( option ) => {
          return (
            <label
              key={option}
              className={styles.option}
            >
              <input
                type="checkbox"
                checked={selected.has( option )}
                onChange={handleToggle( option )}
              />
              {option}
            </label>
          );
        } )}
      </div>
    </details>
  );
}
