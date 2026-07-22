'use client';

import { useState } from 'react';
import { TextField } from '#@/components/ds/text-field';
import { Checkbox } from '#@/components/ds/checkbox';
import { Button } from '#@/components/ds/button';
import { AuthActionState } from '../types';
import { SegmentedToggle, AuthMode } from './segmented-toggle';
import { FormErrorBanner } from './form-error-banner';
import { PasswordField } from './password-field';
import { RoleChipRow, RolSeleccionable } from './role-chip-row';
import { StrengthMeter } from './strength-meter';
import styles from './auth-form.module.css';

type AuthFormProps = {
  mode        : AuthMode;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onModeChange: ( mode: AuthMode ) => void;
  state       : AuthActionState;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  formAction  : ( formData: FormData ) => void;
  isPending   : boolean;
};

export const AuthForm = ( {
  mode, onModeChange, state, formAction, isPending
}: AuthFormProps ) => {
  const isLogin = mode === 'login';
  const isRegister = mode === 'register';

  const [
    password,
    setPassword
  ] = useState( '' );
  const [
    rol,
    setRol
  ] = useState<RolSeleccionable>( 'ABOGADO' );
  const [
    remember,
    setRemember
  ] = useState( true );
  const [
    terms,
    setTerms
  ] = useState( false );
  const [
    attempted,
    setAttempted
  ] = useState( false );

  const showTermsError = isRegister && attempted && !terms && !isPending;

  return (
    <form
      action={( formData ) => {
        setAttempted( true );
        formAction( formData );
      }}
      style={{
        display      : 'flex',
        flexDirection: 'column',
        gap          : 'var(--spacing-6)',
      }}
    >
      <div>
        <h1 className={styles.heading}>{isLogin
          ? 'Bienvenido de nuevo'
          : 'Cree su cuenta'}
        </h1>
        <div className={styles.subheading}>
          {isLogin
            ? 'Ingrese para gestionar sus carpetas y actuaciones.'
            : 'Regístrese para acceder a la plataforma de la firma.'}
        </div>
      </div>

      <SegmentedToggle mode={mode} disabled={isPending} onChange={onModeChange} />

      {isLogin && state.formError && <FormErrorBanner message={state.formError} />}

      <div className={styles.fields}>
        {isRegister && (
          <TextField
            name="nombre"
            label="Nombre completo"
            error={Boolean( state.fieldErrors?.nombre )}
            supportingText={state.fieldErrors?.nombre}
            leadingIcon={<span className="material-symbols-rounded" aria-hidden="true">person</span>}
            disabled={isPending}
            required
          />
        )}

        <TextField
          name="email"
          label="Correo electrónico"
          type="email"
          error={Boolean( state.fieldErrors?.email )}
          supportingText={state.fieldErrors?.email}
          leadingIcon={<span className="material-symbols-rounded" aria-hidden="true">mail</span>}
          disabled={isPending}
          required
        />

        {isRegister && (
          <div className={styles.registerExtras}>
            <RoleChipRow value={rol} onChange={setRol} disabled={isPending} />

            {rol === 'ABOGADO' && (
              <TextField
                name="tarjetaProfesional"
                label="Tarjeta profesional"
                error={Boolean( state.fieldErrors?.tarjetaProfesional )}
                supportingText={state.fieldErrors?.tarjetaProfesional || 'Número de tarjeta profesional de abogado.'}
                leadingIcon={<span className="material-symbols-rounded" aria-hidden="true">badge</span>}
                disabled={isPending}
                required
              />
            )}
          </div>
        )}

        <PasswordField
          name="password"
          label="Contraseña"
          value={password}
          onChange={setPassword}
          error={Boolean( state.fieldErrors?.password )}
          supportingText={state.fieldErrors?.password}
          disabled={isPending}
        />

        {isRegister && (
          <div className={styles.registerExtras}>
            <StrengthMeter password={password} />

            <PasswordField
              name="password2"
              label="Confirmar contraseña"
              error={Boolean( state.fieldErrors?.password2 )}
              supportingText={state.fieldErrors?.password2}
              disabled={isPending}
            />
          </div>
        )}

        {isLogin && (
          <div className={styles.loginRow}>
            <Checkbox
              checked={remember}
              onChange={setRemember}
              label="Recordarme"
              disabled={isPending}
            />
            <input type="hidden" name="remember" value={remember
              ? 'on'
              : ''}
            />
            <a href="/auth/restablecer">¿Olvidó su contraseña?</a>
          </div>
        )}

        {isRegister && (
          <div>
            <Checkbox
              checked={terms}
              onChange={setTerms}
              label="Acepto la política de tratamiento de datos"
              disabled={isPending}
            />
            <input type="hidden" name="terms" value={terms
              ? 'on'
              : ''}
            />
            {showTermsError && <div className={styles.termsError}>Debe aceptar la política de tratamiento de datos.</div>}
          </div>
        )}
      </div>

      <Button
        type="submit"
        fullWidth
        size="large"
        disabled={isPending}
        className={styles.submit}
        icon={isPending
          ? <span className={styles.spinner} />
          : undefined}
        trailingIcon={!isPending
          ? (
              <span className="material-symbols-rounded" aria-hidden="true">
                {isLogin
                  ? 'login'
                  : 'person_add'}
              </span>
            )
          : undefined}
      >
        {isPending
          ? ( isLogin
              ? 'Verificando…'
              : 'Creando cuenta…' )
          : ( isLogin
              ? 'Iniciar sesión'
              : 'Crear cuenta' )}
      </Button>

      <div className={styles.switchPrompt}>
        {isLogin
          ? '¿Aún no tiene cuenta? '
          : '¿Ya tiene una cuenta? '}
        <a
          href="#"
          onClick={( e ) => {
            e.preventDefault();

            if ( !isPending ) {
              onModeChange( isLogin
                ? 'register'
                : 'login' );
            }
          }}
        >
          {isLogin
            ? 'Crear cuenta'
            : 'Iniciar sesión'}
        </a>
      </div>
    </form>
  );
};
