'use client';

import React, { useState, useEffect } from 'react';
import styles from '#@/styles/PushNotifications.module.css';
import { sendNotification, subscribeUser, unSubscribeUser } from './actions/notifications';

// 1. ADD THIS INTERFACE: It mimics the backend web-push type perfectly
interface WebPushSubscription {
  endpoint       : string;
  expirationTime?: number | null;
  keys: {
    p256dh: string;
    auth  : string;
  };
}
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

// NEW: Helper to get or create an anonymous ID for this specific device
const getOrCreateDeviceId = () => {
  if ( typeof window === 'undefined' ) {
    return '';
  }

  let deviceId = localStorage.getItem( 'anonymous_device_id' );

  if ( !deviceId ) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(
      'anonymous_device_id', deviceId
    );
  }

  return deviceId;
};

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
  const [
    deviceId,
    setDeviceId
  ] = useState( '' );

  useEffect(
    () => {
      if ( 'serviceWorker' in navigator && 'PushManager' in window ) {
        setIsSupported( true );
        setDeviceId( getOrCreateDeviceId() ); // Grab the device ID on mount
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

      // Instead of manually extracting keys, JSON.parse(JSON.stringify())
      // automatically grabs the endpoint, keys, and expirationTime securely.
      const subscriptionData = JSON.parse( JSON.stringify( sub ) );

      // 🚨 REPLACED FETCH WITH SERVER ACTION 🚨
      const response = await subscribeUser(
        subscriptionData, deviceId
      );

      if ( response.success ) {
        setSubscription( sub );
      } else {
        throw new Error( 'Server action failed to save subscription' );
      }
    } catch ( error ) {
      console.error(
        'Subscription failed:', error
      );
    }
  }

  async function unsubscribeFromPush() {
    if ( subscription ) {
      await subscription.unsubscribe();
      setSubscription( null );
      // Pass the deviceId so the DB knows exactly which record to delete
      await unSubscribeUser( deviceId );
    }
  }

  async function sendTestNotification() {
    if ( subscription && message.trim() ) {
      const serializedSub = JSON.parse( JSON.stringify( subscription ) ) as WebPushSubscription;
      // Pass the deviceId so the server knows who to send it to!
      await sendNotification(
        message, serializedSub
      );
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
              <p
                className={styles.statusText}
                style={{
                  color: '#16a34a',
                }}
              >
                Status: Subscribed
              </p>
              <button
                onClick={unsubscribeFromPush}
                className={`${ styles.button } styles.btnGhost`}
              >
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
                <button
                  onClick={sendTestNotification}
                  className={`${ styles.button } ${ styles.btnPrimary }`}
                >
                  Send Test
                </button>
              </div>
            </div>
          )
        : (
            <div>
              <p className={styles.statusText}>Not currently subscribed.</p>
              <button
                onClick={subscribeToPush}
                className={`${ styles.button } ${ styles.btnSuccess }`}
              >
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
      const isIOSDevice
        = /iPad|iPhone|iPod/.test( navigator.userAgent ) && !win.MSStream;
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
      <button className={`${ styles.button } ${ styles.btnPrimary }`}>
        Add to Home Screen
      </button>
      {isIOS && (
        <p
          className={styles.statusText}
          style={{
            marginTop: '0.5rem',
          }}
        >
          Tap share icon ⎋ then Add to Home Screen ➕
        </p>
      )}
    </div>
  );
}
