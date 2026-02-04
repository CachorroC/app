'use client';

import { useEffect, useState } from 'react';

const PUBLIC_VAPID_KEY = 'YOUR_PUBLIC_VAPID_KEY_HERE';

function urlBase64ToUint8Array( base64String: string ) {
  const padding = '='.repeat( ( 4 - ( base64String.length % 4 ) ) % 4 );
  const base64 = ( base64String + padding )
    .replace(
      /\\-/g, '+'
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

export default function NotificationButton() {
  const [
    isSubscribed,
    setIsSubscribed
  ] = useState( false );

  useEffect(
    () => {
      if ( 'serviceWorker' in navigator ) {
        navigator.serviceWorker.register( '/service-worker.js' )
          .then( ( registration ) => {
            console.log(
              'Scope: ', registration.scope
            );
          } );
      }
    }, []
  );

  const subscribeUser = async () => {
    if ( 'serviceWorker' in navigator ) {
      const register = await navigator.serviceWorker.ready;

      const subscription = await register.pushManager.subscribe( {
        userVisibleOnly     : true,
        applicationServerKey: urlBase64ToUint8Array( PUBLIC_VAPID_KEY ),
      } );

      // Send subscription to your server to save it in your DB
      await fetch(
        '/api/subscribe', {
          method : 'POST',
          body   : JSON.stringify( subscription ),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setIsSubscribed( true );
    }
  };

  return (
    <button onClick={subscribeUser}>
      {isSubscribed
        ? 'Notifications Enabled!'
        : 'Enable Notifications'}
    </button>
  );
}