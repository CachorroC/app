'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '../actions';
import { IDLE_STATE } from '../types';
import { BrandPanel } from './brand-panel';
import { MobileLogo } from './mobile-logo';
import { AuthForm } from './auth-form';
import { SuccessState } from './success-state';
import { AuthMode } from './segmented-toggle';
import styles from '../auth.module.css';

export const AuthShell = ( {
  initialMode 
}: { initialMode: AuthMode } ) => {
  const router = useRouter();
  const [
    mode,
    setMode
  ] = useState<AuthMode>( initialMode );
  const [
    registeredEmail,
    setRegisteredEmail
  ] = useState( '' );

  const [
    loginState,
    loginAction,
    loginPending
  ] = useActionState(
    signIn, IDLE_STATE
  );
  const [
    registerState,
    dispatchRegister,
    registerPending
  ] = useActionState(
    signUp, IDLE_STATE
  );

  const registerAction = ( formData: FormData ) => {
    setRegisteredEmail( String( formData.get( 'email' ) || '' ) );
    dispatchRegister( formData );
  };

  const isLoginMode = mode === 'login';
  const state = isLoginMode
    ? loginState
    : registerState;
  const formAction = isLoginMode
    ? loginAction
    : registerAction;
  const isPending = isLoginMode
    ? loginPending
    : registerPending;
  const isSuccess = state.status === 'success';

  useEffect(
    () => {
      if ( isLoginMode && loginState.status === 'success' ) {
        const t = setTimeout(
          () => {
            router.push( '/dashboard/Carpetas' );
          }, 900
        );

        return () => {
          return clearTimeout( t );
        };
      }

      return undefined;
    }, [
      isLoginMode,
      loginState.status,
      router
    ]
  );

  const resetToLogin = () => {
    setMode( 'login' );
  };

  return (
    <>
      <div className={styles.brandPanel}>
        <BrandPanel />
      </div>
      <div className={styles.formPanel}>
        <div className={styles.formInner}>
          <MobileLogo />

          {isSuccess
            ? (
                <SuccessState
                  icon={isLoginMode
                    ? 'waving_hand'
                    : 'mark_email_read'}
                  title={isLoginMode
                    ? '¡Ingreso exitoso!'
                    : 'Cuenta creada'}
                  body={isLoginMode
                    ? 'Redirigiéndolo al panel de carpetas de la firma…'
                    : `Enviamos un enlace de verificación a ${ registeredEmail || 'su correo' }. Confírmelo para activar su cuenta.`}
                  cta="Volver al inicio de sesión"
                  onCta={resetToLogin}
                />
              )
            : (
                <AuthForm
                  mode={mode}
                  onModeChange={setMode}
                  state={state}
                  formAction={formAction}
                  isPending={isPending}
                />
              )}
        </div>
      </div>
    </>
  );
};
