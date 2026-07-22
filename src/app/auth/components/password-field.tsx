'use client';

import { useState } from 'react';
import { TextField } from '#@/components/ds/text-field';
import { IconButton } from '#@/components/ds/icon-button';
import styles from './password-field.module.css';

type PasswordFieldProps = {
  name           : string;
  label          : string;
  value?         : string;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onChange?      : ( value: string ) => void;
  error?         : boolean;
  supportingText?: string;
  disabled?      : boolean;
};

export const PasswordField = ( {
  name, label, value, onChange, error, supportingText, disabled
}: PasswordFieldProps ) => {
  const [
    visible,
    setVisible
  ] = useState( false );

  return (
    <div className={styles.wrap}>
      <TextField
        name={name}
        label={label}
        value={value}
        onChange={( e ) => {
          onChange?.( e.target.value );
        }}
        error={error}
        supportingText={supportingText}
        leadingIcon={<span className="material-symbols-rounded" aria-hidden="true">lock</span>}
        type={visible
          ? 'text'
          : 'password'}
        disabled={disabled}
        required
      />
      <IconButton
        variant="standard"
        size="medium"
        className={styles.eye}
        tabIndex={-1}
        ariaLabel="Mostrar u ocultar contraseña"
        onClick={() => {
          setVisible( ( v ) => {
            return !v;
          } );
        }}
      >
        <span className="material-symbols-rounded" aria-hidden="true">{visible
          ? 'visibility_off'
          : 'visibility'}
        </span>
      </IconButton>
    </div>
  );
};
