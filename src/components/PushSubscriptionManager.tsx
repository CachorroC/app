'use client';

import { useEffect, useState } from 'react';

// 1. Utility to convert VAPID key for the browser
// (Browsers require the key as a Uint8Array, not a standard Base64 string)
function urlBase64ToUint8Array(
  base64String: string
) {
  const padding = '='.repeat(
    ( 4 - base64String.length % 4 ) % 4
  );
  const base64 = ( base64String + padding )
    .replace(
      /\-/g, '+'
    )
    .replace(
      /_/g, '/'
    );

  const rawData = window.atob(
    base64
  );
  const outputArray = new Uint8Array(
    rawData.length
  );

  for ( let i = 0; i < rawData.length; ++i ) {
    outputArray[ i ] = rawData.charCodeAt(
      i
    );
  }

  return outputArray;
}

export default function PushSubscriptionManager() {
  const [
    isSupported,
    setIsSupported
  ] = useState(
    false
  );
  const [
    subscription,
    setSubscription
  ] = useState<PushSubscription | null>(
    null
  );
  const [
    loading,
    setLoading
  ] = useState(
    false
  );

  // REPLACE THIS WITH YOUR ACTUAL PUBLIC KEY
  const PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;

  useEffect(
    () => {
      if ( 'serviceWorker' in navigator && 'PushManager' in window ) {
        setIsSupported(
          true
        );
        registerAndCheckSubscription();
      }
    }, []
  );

  async function registerAndCheckSubscription() {
    try {
      // A. Register the Service Worker
      const registration = await navigator.serviceWorker.register(
        '/service-worker.js'
      );

      // B. Check if already subscribed
      const existingSubscription = await registration.pushManager.getSubscription();

      if ( existingSubscription ) {
        setSubscription(
          existingSubscription
        );
      }
    } catch ( error ) {
      console.error(
        'Error during SW registration:', error
      );
    }
  }

  async function handleSubscribe() {
    setLoading(
      true
    );

    try {
      const registration = await navigator.serviceWorker.ready;

      // 1. Subscribe to the push manager
      const sub = await registration.pushManager.subscribe(
        {
          userVisibleOnly     : true,
          applicationServerKey: urlBase64ToUint8Array(
            PUBLIC_VAPID_KEY
          ),
        }
      );

      // 2. Send the subscription object to YOUR backend
      // This is how your server knows where to send the notification
      await fetch(
        '/api/subscribe', {
          method : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            sub
          ),
        }
      );

      setSubscription(
        sub
      );
      alert(
        'Successfully subscribed to notifications!'
      );
    } catch ( error ) {
      console.error(
        'Failed to subscribe:', error
      );
      alert(
        'Failed to subscribe. Please try again.'
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  // Don't render anything if push isn't supported
  if ( !isSupported ) {
    return null;
  }

  return (
    <div className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
      <h3 className="text-lg font-bold mb-2">Notifications</h3>

      { subscription
        ? (
            <div>
              <p className="text-green-600 mb-2">✅ You are subscribed to updates.</p>
              <p className="text-xs text-gray-500 break-all">
                {/* Optional: Debugging view of the endpoint */}
                ID: {subscription.endpoint.slice(
                  -20
                )}...
              </p>
            </div>
          )
        : (
            <div>
              <p className="text-gray-600 mb-4">
                Get notified when your legal documents are ready.
              </p>
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading
                  ? 'Subscribing...'
                  : 'Enable Notifications'}
              </button>
            </div>
          )}
    </div>
  );
}