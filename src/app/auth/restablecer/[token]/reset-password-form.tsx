'use client';

import { useActionState, useState } from 'react';
import { Button } from '#@/components/ds/button';
import { resetPassword } from '../../actions';
import { IDLE_STATE } from '../../types';
import { PasswordField } from '../../components/password-field';
import { StrengthMeter } from '../../components/strength-meter';
import { FormErrorBanner } from '../../components/form-error-banner';
import { SuccessState } from '../../components/success-state';
import styles from '../request-reset-form.module.css';

export const ResetPasswordForm = ( {
  token 
}: { token: string } ) => {
  const [
    state,
    formAction,
    isPending
  ] = useActionState(
    resetPassword.bind(
      null, token
    ), IDLE_STATE
  );
  const [
    password,
    setPassword
  ] = useState( '' );

  if ( state.status === 'success' ) {
    return (
      <SuccessState
        icon="lock_reset"
        title="Contraseña actualizada"
        body="Ya puede iniciar sesión con su nueva contraseña."
        cta="Ir a iniciar sesión"
        onCta={() => {
          window.location.href = '/auth';
        }}
      />
    );
  }

  if ( state.formError ) {
    return (
      <div style={{
        display      : 'flex',
        flexDirection: 'column',
        gap          : 'var(--spacing-4)'
      }}
      >
        <FormErrorBanner message={state.formError} />
        <div className={styles.back}><a href="/auth/restablecer">Solicitar un nuevo enlace</a></div>
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
        <h1 className={styles.heading}>Elija una nueva contraseña</h1>
        <div className={styles.subheading}>Debe tener al menos 8 caracteres, mayúsculas y números.</div>
      </div>

      <div style={{
        display      : 'flex',
        flexDirection: 'column',
        gap          : 'var(--spacing-4)'
      }}
      >
        <PasswordField
          name="password"
          label="Nueva contraseña"
          value={password}
          onChange={setPassword}
          error={Boolean( state.fieldErrors?.password )}
          supportingText={state.fieldErrors?.password}
          disabled={isPending}
        />
        <StrengthMeter password={password} />
        <PasswordField
          name="password2"
          label="Confirmar contraseña"
          error={Boolean( state.fieldErrors?.password2 )}
          supportingText={state.fieldErrors?.password2}
          disabled={isPending}
        />
      </div>

      <Button
        type="submit"
        fullWidth
        size="large"
        disabled={isPending}
        className={styles.submit}
      >
        {isPending
          ? 'Guardando…'
          : 'Guardar contraseña'}
      </Button>
    </form>
  );
};
