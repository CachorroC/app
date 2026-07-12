/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import styles from '#@/styles/PushNotifications.module.css';
import { sendNotification } from '#@/app/actions/notifications';
import { usePushNotifications } from '#@/app/Context/pushNotificationContext';
import { WebPushSubscription } from '#@/lib/pushUtils';

export function PushNotificationManager() {
  const {
    isSupported,
    isSubscribed,
    subscription,
    subscribeToPush,
    unsubscribeFromPush,
  } = usePushNotifications();
  const [
    message,
    setMessage
  ] = useState( '' );
  const [
    isVisible,
    setIsVisible
  ] = useState( false );
  const [
    isDismissed,
    setIsDismissed
  ] = useState( true );

  useEffect(
    () => {
      const dismissed
        = localStorage.getItem( 'grimorio_notifications_dismissed' ) === 'true';
      setIsDismissed( dismissed );

      if ( !dismissed && !isSubscribed && isSupported ) {
        const timer = setTimeout(
          () => {
            return setIsVisible( true );
          }, 3000 
        );

        return () => {
          return clearTimeout( timer );
        };
      }

      return undefined;
    }, [
      isSubscribed,
      isSupported
    ] 
  );

  const handleDismiss = () => {
    setIsVisible( false );
    setIsDismissed( true );
    localStorage.setItem(
      'grimorio_notifications_dismissed', 'true' 
    );
  };

  if ( !isSupported || isDismissed || ( !isVisible && !isSubscribed ) ) {
    return null;
  }

  async function sendTestNotification() {
    if ( subscription && message.trim() ) {
      const serializedSub = JSON.parse( JSON.stringify( subscription ), ) as WebPushSubscription;
      await sendNotification(
        message, serializedSub 
      );
      setMessage( '' );
    }
  }

  return (
    <div className={`${ styles.container } ${ styles.notifications }`}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleDismiss}
        aria-label="Cerrar"
      >
        ×
      </button>
      <h3 className={styles.title}>Notificaciones Push</h3>
      {isSubscribed
        ? (
            <div className={styles.flexGroup}>
              <p
                className={styles.statusText}
                style={{
                  color: 'var(--chakra-verde)',
                }}
              >
                Estado: Subscrito
              </p>
              <div className={styles.row}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Mensaje de prueba..."
                  value={message}
                  onChange={( e ) => {
                    return setMessage( e.target.value );
                  }}
                />
                <button
                  type="button"
                  onClick={sendTestNotification}
                  className={`${ styles.button } ${ styles.btnPrimary }`}
                >
                  Enviar Prueba
                </button>
              </div>
              <button
                type="button"
                onClick={unsubscribeFromPush}
                className={`${ styles.button } ${ styles.btnGhost }`}
              >
                Desactivar notificaciones
              </button>
            </div>
          )
        : (
            <div>
              <p className={styles.statusText}>
                Recibe novedades sobre tus plantas y el calendario botánico.
              </p>
              <button
                onClick={subscribeToPush}
                className={`${ styles.button } ${ styles.btnSuccess }`}
              >
                Activar notificaciones
              </button>
            </div>
          )}
    </div>
  );
}

export function InstallPrompt() {
  const [
    isIOS,
    setIsIOS
  ] = useState( false );
  const [
    isStandalone,
    setIsStandalone
  ] = useState( false );
  const [
    deferredPrompt,
    setDeferredPrompt
  ] = useState<any>( null );
  const [
    isVisible,
    setIsVisible
  ] = useState( false );
  const [
    isDismissed,
    setIsDismissed
  ] = useState( true );

  useEffect(
    () => {
      const isIOSDevice
        = /iPad|iPhone|iPod/.test( navigator.userAgent ) && !( window as any ).MSStream;
      setIsIOS( isIOSDevice );
      setIsStandalone( window.matchMedia( '(display-mode: standalone)' ).matches );

      const dismissed
        = localStorage.getItem( 'grimorio_install_dismissed' ) === 'true';
      setIsDismissed( dismissed );

      const handler = ( e: Event ) => {
        e.preventDefault();
        setDeferredPrompt( e );
      };

      window.addEventListener(
        'beforeinstallprompt', handler 
      );

      return () => {
        return window.removeEventListener(
          'beforeinstallprompt', handler 
        );
      };
    }, [] 
  );

  useEffect(
    () => {
      if ( !isStandalone && !isDismissed && ( isIOS || deferredPrompt ) ) {
        const timer = setTimeout(
          () => {
            return setIsVisible( true );
          }, 3000 
        );

        return () => {
          return clearTimeout( timer );
        };
      }

      return undefined;
    }, [
      isStandalone,
      isDismissed,
      isIOS,
      deferredPrompt
    ] 
  );

  const handleDismiss = () => {
    setIsVisible( false );
    setIsDismissed( true );
    localStorage.setItem(
      'grimorio_install_dismissed', 'true' 
    );
  };

  async function handleInstallClick() {
    if ( deferredPrompt ) {
      deferredPrompt.prompt();
      const {
        outcome 
      } = await deferredPrompt.userChoice;

      if ( outcome === 'accepted' ) {
        setIsDismissed( true );
      }

      setDeferredPrompt( null );
    }
  }

  if ( isStandalone || isDismissed || !isVisible ) {
    return null;
  }

  return (
    <div className={`${ styles.container } ${ styles.install }`}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleDismiss}
        aria-label="Cerrar"
      >
        ×
      </button>
      <h3 className={styles.title}>Instalar Grimorio</h3>
      <p className={styles.statusText}>
        Accede rápidamente a tu compendio botánico desde tu pantalla de inicio.
      </p>
      <button
        onClick={handleInstallClick}
        className={`${ styles.button } ${ styles.btnPrimary }`}
        disabled={!isIOS && !deferredPrompt}
      >
        Instalar App
      </button>
      {isIOS && (
        <p
          className={styles.statusText}
          style={{
            marginTop: '0.75rem',
            fontSize : '0.75rem',
            opacity  : 0.8,
          }}
        >
          {
            'Toca el botón de compartir ⎋ y luego "Agregar a pantalla de inicio" ➕'
          }
        </p>
      )}
    </div>
  );
}
