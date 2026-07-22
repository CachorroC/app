'use client';

import { useActionState } from 'react';
import { TextField } from '#@/components/ds/text-field';
import { Button } from '#@/components/ds/button';
import { requestPasswordReset } from '../actions';
import { IDLE_STATE } from '../types';
import styles from './request-reset-form.module.css';

export const RequestResetForm = () => {
  const [
    state,
    formAction,
    isPending
  ] = useActionState(
    requestPasswordReset, IDLE_STATE
  );

  if ( state.status === 'success' ) {
    return (
      <div className={styles.confirm}>
        Si el correo existe, enviamos un enlace para restablecer la contraseña.
      </div>
    );
  }

  return (
    <form action={formAction} style={{
      display      : 'flex',
      flexDirection: 'column',
      gap          : 'var(--spacing-6)'
    }}
    >
      <div>
        <h1 className={styles.heading}>Restablecer contraseña</h1>
        <div className={styles.subheading}>Ingrese su correo y le enviaremos un enlace para restablecerla.</div>
      </div>

      <TextField
        name="email"
        label="Correo electrónico"
        type="email"
        leadingIcon={<span className="material-symbols-rounded" aria-hidden="true">mail</span>}
        disabled={isPending}
        required
      />

      <Button
        type="submit"
        fullWidth
        size="large"
        disabled={isPending}
        className={styles.submit}
      >
        {isPending
          ? 'Enviando…'
          : 'Enviar enlace'}
      </Button>

      <div className={styles.back}>
        <a href="/auth">Volver al inicio de sesión</a>
      </div>
    </form>
  );
};
