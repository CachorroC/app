'use client';

import { ChangeEvent, InputHTMLAttributes, ReactNode, useId, useState } from 'react';
import styles from './text-field.module.css';

type TextFieldVariant = 'outlined' | 'filled';

export type TextFieldProps = {
  label?         : string;
  value?         : string;
  defaultValue?  : string;
  variant?       : TextFieldVariant;
  supportingText?: string;
  error?         : boolean;
  leadingIcon?   : ReactNode;
  trailingIcon?  : ReactNode;
  fullWidth?     : boolean;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onChange?      : ( e: ChangeEvent<HTMLInputElement> ) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const TextField = ( {
  label,
  value,
  defaultValue,
  placeholder = '',
  variant = 'outlined',
  type = 'text',
  supportingText,
  error = false,
  disabled = false,
  required = false,
  leadingIcon,
  trailingIcon,
  fullWidth = true,
  onChange,
  ...rest
}: TextFieldProps ) => {
  const id = useId();
  const [
    focus,
    setFocus 
  ] = useState( false );
  const [
    inner,
    setInner 
  ] = useState( defaultValue || '' );
  const val = value !== undefined
    ? value
    : inner;
  const filled = String( val ?? '' ).length > 0;
  const floated = focus || filled || Boolean( placeholder );
  const isFilled = variant === 'filled';

  return (
    <label
      htmlFor={id}
      className={`${ styles.wrap } ${ fullWidth
        ? ''
        : styles.notFullWidth }`}
    >
      <div
        className={[
          styles.field,
          isFilled && styles.filled,
          error && styles.error,
          disabled && styles.disabled,
        ].filter( Boolean )
          .join( ' ' )}
      >
        {leadingIcon && <span className={styles.icon} aria-hidden="true">{leadingIcon}</span>}
        {label && (
          <span
            className={[
              styles.label,
              leadingIcon && styles.withLeadingIcon,
              floated && styles.floated,
            ].filter( Boolean )
              .join( ' ' )}
          >
            {label}{required
              ? ' *'
              : ''}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={val}
          placeholder={floated
            ? placeholder
            : ''}
          disabled={disabled}
          required={required}
          onFocus={() => {
            setFocus( true );
          }}
          onBlur={() => {
            setFocus( false );
          }}
          onChange={( e ) => {
            setInner( e.target.value );
            onChange?.( e );
          }}
          className={`${ styles.input } ${ isFilled && floated
            ? styles.inputPushed
            : '' }`}
          {...rest}
        />
        {trailingIcon && <span className={styles.icon} aria-hidden="true">{trailingIcon}</span>}
      </div>
      {supportingText && (
        <div className={`${ styles.supportingText } ${ error
          ? styles.error
          : '' }`}
        >
          {supportingText}
        </div>
      )}
    </label>
  );
};
