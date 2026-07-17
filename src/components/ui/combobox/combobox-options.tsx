'use client';

import { CSSProperties, ReactNode } from 'react';
import type { ComboboxOption, ComboboxOptionProps } from '#@/app/Hooks/useCombobox';
import styles from './combobox.module.css';

interface ComboboxOptionsProps<TOption extends ComboboxOption> {
  isOpen          : boolean;
  options         : TOption[];
  highlightedIndex: number;
  panelStyle      : CSSProperties;
  // eslint-disable-next-line no-unused-vars -- type-only signature, not a real binding
  getOptionProps  : ( index: number ) => ComboboxOptionProps;
  // eslint-disable-next-line no-unused-vars -- type-only signature, not a real binding
  renderOption?   : ( option: TOption ) => ReactNode;
}

/**
 * Floating options panel for `useCombobox` — a custom, page-flow-positioned
 * replacement for native `<datalist>` that stays clear of the mobile keyboard.
 */
export function ComboboxOptions<TOption extends ComboboxOption>( {
  isOpen, options, highlightedIndex, panelStyle, getOptionProps, renderOption,
}: ComboboxOptionsProps<TOption> ) {
  if ( !isOpen ) {
    return null;
  }

  return (
    <ul
      className={styles.panel}
      style={panelStyle}
      role="listbox"
    >
      {options.length === 0
        ? (
            <li className={styles.empty}>Sin resultados</li>
          )
        : options.map( (
            option, index 
          ) => {
            return (
              <li
                key={option.id}
                role="option"
                className={`${ styles.option } ${ index === highlightedIndex
                  ? styles.optionHighlighted
                  : '' }`}
                {...getOptionProps( index )}
              >
                {renderOption
                  ? renderOption( option )
                  : option.label}
              </li>
            );
          } )}
    </ul>
  );
}
