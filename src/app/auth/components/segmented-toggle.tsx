'use client';

import styles from './segmented-toggle.module.css';

export type AuthMode = 'login' | 'register';

type SegmentedToggleProps = {
  mode    : AuthMode;
  disabled: boolean;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onChange: ( mode: AuthMode ) => void;
};

export const SegmentedToggle = ( {
  mode, disabled, onChange
}: SegmentedToggleProps ) => {
  return (
    <div className={styles.track} role="tablist" aria-label="Modo de autenticación">
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'login'}
        disabled={disabled}
        onClick={() => {
          onChange( 'login' );
        }}
        className={`${ styles.tab } ${ mode === 'login'
          ? styles.tabActive
          : '' }`}
      >
        Iniciar sesión
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'register'}
        disabled={disabled}
        onClick={() => {
          onChange( 'register' );
        }}
        className={`${ styles.tab } ${ mode === 'register'
          ? styles.tabActive
          : '' }`}
      >
        Crear cuenta
      </button>
    </div>
  );
};
