'use client';

import React, { useState, useEffect } from 'react';
import { unsubscribeUser, sendNotification } from './actions';
import styles from '#@/styles/PushNotifications.module.css';

// Type definition for legacy iOS check
interface CustomWindow extends Window {
  MSStream?: unknown;
}

function urlBase64ToUint8Array( base64String: string ): Uint8Array {
  const padding = '='.repeat( ( 4 - ( base64String.length % 4 ) ) % 4 );
  const base64 = ( base64String + padding ).replace(
    /-/g, '+'
  )
    .replace(
      /_/g, '/'
    );
  const rawData = window.atob( base64 );
  const outputArray = new Uint8Array( rawData.length );

  for ( let i = 0; i < rawData.length; ++i ) {
    outputArray[ i ] = rawData.charCodeAt( i );
  }

  return outputArray;
}


export function PushNotificationManager() {
  const [
    isSupported,
    setIsSupported
  ] = useState( false );
  const [
    subscription,
    setSubscription
  ] = useState<PushSubscription | null>( null );
  const [
    message,
    setMessage
  ] = useState( '' );

  useEffect(
    () => {
      if ( 'serviceWorker' in navigator && 'PushManager' in window ) {
        setIsSupported( true );
        registerServiceWorker();
      }
    }, []
  );

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register(
        '/service-worker.js', {
          scope         : '/',
          updateViaCache: 'none',
        }
      );
      const sub = await registration.pushManager.getSubscription();
      setSubscription( sub );
    } catch ( error ) {
      console.error(
        'Service Worker registration error:', error
      );
    }
  }

  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if ( !publicKey ) {
        throw new Error( 'VAPID public key missing' );
      }

      const sub = await registration.pushManager.subscribe( {
        userVisibleOnly     : true,
        applicationServerKey: urlBase64ToUint8Array( publicKey ).buffer as ArrayBuffer,
      } );

      const subscriptionData = {
        endpoint      : sub.endpoint,
        expirationTime: sub.expirationTime,
        keys          : {
          p256dh: btoa( String.fromCharCode( ...new Uint8Array( sub.getKey( 'p256dh' )! ) ) ),
          auth  : btoa( String.fromCharCode( ...new Uint8Array( sub.getKey( 'auth' )! ) ) ),
        },
      };

      const response = await fetch(
        '/api/subscribe', {
          method : 'POST',
          body   : JSON.stringify( subscriptionData ),
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );

      if ( response.ok ) {
        setSubscription( sub );
      }
    } catch ( error ) {
      console.error(
        'Subscription failed:', error
      );
    }
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription( null );
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if ( subscription && message.trim() ) {
      await sendNotification( message );
      setMessage( '' );
    }
  }

  if ( !isSupported ) {
    return <p className={styles.statusText}>Push notifications not supported.</p>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Push Notifications</h3>
      {subscription
        ? (
            <div className={styles.flexGroup}>
              <p className={styles.statusText} style={{
                color: '#16a34a'
              }}
              >Status: Subscribed</p>
              <button onClick={unsubscribeFromPush} className={`${ styles.button } styles.btnGhost`}>
                Unsubscribe
              </button>
              <div className={styles.row}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Message..."
                  value={message}
                  onChange={( e ) => {
                    return setMessage( e.target.value );
                  }}
                />
                <button onClick={sendTestNotification} className={`${ styles.button } ${ styles.btnPrimary }`}>
                  Send Test
                </button>
              </div>
            </div>
          )
        : (
            <div>
              <p className={styles.statusText}>Not currently subscribed.</p>
              <button onClick={subscribeToPush} className={`${ styles.button } ${ styles.btnSuccess }`}>
                Enable Notifications
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

  useEffect(
    () => {
      const win = window as CustomWindow;
      const isIOSDevice = /iPad|iPhone|iPod/.test( navigator.userAgent ) && !win.MSStream;
      setIsIOS( isIOSDevice );
      setIsStandalone( window.matchMedia( '(display-mode: standalone)' ).matches );
    }, []
  );

  if ( isStandalone ) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Install App</h3>
      <button className={`${ styles.button } ${ styles.btnPrimary }`}>Add to Home Screen</button>
      {isIOS && (
        <p className={styles.statusText} style={{
          marginTop: '0.5rem'
        }}
        >
          Tap share icon ⎋ then Add to Home Screen ➕
        </p>
      )}
    </div>
  );
}