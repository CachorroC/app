/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { sendNotification } from './actions/notifications';
import { usePushNotifications } from './Context/pushNotificationContext';


function PushNotificationManager () {
  const {
    isSupported,
    subscription,
    subscribeToPush,
    unsubscribeFromPush
  } = usePushNotifications();


  const [
    message,
    setMessage
  ] = useState( '' );






  async function sendTestNotification() {
    if ( subscription ) {
      const serializedSub = subscription.toJSON() as any;
      await sendNotification(
        message, serializedSub
      );
      setMessage( '' );
    }
  }

  if ( !isSupported ) {
    return <p>Push notifications are not supported in this browser.</p>;
  }

  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription
        ? (
            <>
              <p>You are subscribed to push notifications.</p>
              <button onClick={unsubscribeFromPush}>Unsubscribe</button>
              <input
                type="text"
                placeholder="Enter notification message"
                value={message}
                onChange={( e ) => {
                  return setMessage( e.target.value );
                }}
              />
              <button onClick={sendTestNotification}>Send Test</button>
            </>
          )
        : (
            <>
              <p>You are not subscribed to push notifications.</p>
              <button onClick={subscribeToPush}>Subscribe</button>
            </>
          )}
    </div>
  );
}

function InstallPrompt() {
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
      setIsIOS( /iPad|iPhone|iPod/.test( navigator.userAgent, ) && !( window as any ).MSStream, );

      setIsStandalone( window.matchMedia( '(display-mode: standalone)' ).matches );
    }, []
  );

  if ( isStandalone ) {
    return null; // Don't show install button if already installed
  }

  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span
            role="img"
            aria-label="share icon"
          >
            {' '}
            ⎋{' '}
          </span>
          {'and then "Add to Home Screen"'}
          <span
            role="img"
            aria-label="plus icon"
          >
            {' '}
            ➕{' '}
          </span>
          .
        </p>
      )}
    </div>
  );
}

export default function PageClient() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
