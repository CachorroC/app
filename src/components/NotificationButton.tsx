'use client';

import { useEffect, useState } from 'react';
import { subscribeUser, unsubscribeUser } from './actions/notifications'; // Adjust import path as needed
import { unSubscribeUser } from '#@/app/actions/notifications';

// 1. Interface to satisfy the Node.js web-push library types on the server
interface WebPushSubscription {
  endpoint       : string;
  expirationTime?: number | null;
  keys: {
    p256dh: string;
    auth  : string;
  };
}

// 2. Helper to get or create an anonymous device ID
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

function urlBase64ToUint8Array( base64String: string ) {
  const padding = '='.repeat( ( 4 - ( base64String.length % 4 ) ) % 4 );
  const base64 = ( base64String + padding )
    .replace(
      /\-/g, '+'
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
  const [
    deviceId,
    setDeviceId
  ] = useState( '' );

  useEffect(
    () => {
      if ( 'serviceWorker' in navigator ) {
      // Initialize the device ID as soon as the component mounts
        setDeviceId( getOrCreateDeviceId() );

        navigator.serviceWorker
          .register(
            '/service-worker.js', {
              scope         : '/',
              updateViaCache: 'none',
            }
          )
          .then( async ( registration ) => {
          // Check initial subscription state on load
            const subscription = await registration.pushManager.getSubscription();

            if ( subscription ) {
              setIsSubscribed( true );
            }
          } );
      }
    }, []
  );

  const handleSubscribe = async () => {
    if ( !deviceId ) {
      return;
    } // Safeguard

    if ( 'serviceWorker' in navigator ) {
      try {
        const register = await navigator.serviceWorker.ready;
        const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

        if ( !publicKey ) {
          throw new Error( 'VAPID public key missing from env' );
        }

        const subscription = await register.pushManager.subscribe( {
          userVisibleOnly     : true,
          applicationServerKey: urlBase64ToUint8Array( publicKey ),
        } );

        // 3. Cast the object to remove hidden browser methods before sending
        const serializedSub = JSON.parse( JSON.stringify( subscription ) ) as WebPushSubscription;

        // 4. Call Server Action instead of fetch POST
        const response = await subscribeUser(
          serializedSub, deviceId
        );

        if ( response && response.success ) {
          setIsSubscribed( true );
        } else {
          console.error( 'Server action failed to save subscription' );
        }
      } catch ( error ) {
        console.error(
          'Failed to subscribe user: ', error
        );
      }
    }
  };

  const handleUnsubscribe = async () => {
    if ( !deviceId ) {
      return;
    }

    if ( 'serviceWorker' in navigator ) {
      try {
        const register = await navigator.serviceWorker.ready;
        const subscription = await register.pushManager.getSubscription();

        if ( subscription ) {
          // 1. Tell the server to delete the record using the deviceId
          const response = await unSubscribeUser( deviceId );

          if ( response && response.success ) {
            // 2. If server deletion is successful, unsubscribe locally
            const successful = await subscription.unsubscribe();

            if ( successful ) {
              setIsSubscribed( false );
            }
          } else {
            console.error( 'Failed to remove subscription from server database.' );
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
    <button
      onClick={isSubscribed
        ? handleUnsubscribe
        : handleSubscribe}
      disabled={!deviceId} // Prevent clicks before ID is generated
    >
      {isSubscribed
        ? 'Notifications Enabled (Click to Disable)'
        : 'Enable Notifications'}
    </button>
  );
}