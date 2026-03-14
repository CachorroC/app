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
        navigator.serviceWorker
          .register(
            '/service-worker.js', {
              scope         : '/',
              updateViaCache: 'none',
            }
          )
          .then( async ( registration ) => {
            console.log(
              'Scope: ', registration.scope
            );

            // Optional but recommended: Check initial subscription state on load
            const subscription = await registration.pushManager.getSubscription();

            if ( subscription ) {
              setIsSubscribed( true );
            }
          } );
      }
    }, []
  );

  const subscribeUser = async () => {
    if ( 'serviceWorker' in navigator ) {
      try {
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
      } catch ( error ) {
        console.error(
          'Failed to subscribe user: ', error
        );
      }
    }
  };

  const unSubscribeUser = async () => {
    if ( 'serviceWorker' in navigator ) {
      try {
        const register = await navigator.serviceWorker.ready;
        const subscription = await register.pushManager.getSubscription();

        if ( subscription ) {
          // Send the subscription to your server to delete it from the DB
          const response = await fetch(
            '/api/unsubscribe', {
              method : 'POST',
              body   : JSON.stringify( subscription ),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if ( response.ok ) {
            // If the server successfully deletes it, unsubscribe locally
            const successful = await subscription.unsubscribe();

            if ( successful ) {
              setIsSubscribed( false );
            }
          } else {
            console.error( 'Failed to remove subscription from server.' );
          }
        }
      } catch ( error ) {
        console.error(
          'Error unsubscribing', error
        );
      }
    }
  };

  return (
    // Updated to toggle functions based on current subscription state
    <button onClick={isSubscribed
      ? unSubscribeUser
      : subscribeUser}
    >
      {isSubscribed
        ? 'Notifications Enabled (Click to Disable)'
        : 'Enable Notifications'}
    </button>
  );
}