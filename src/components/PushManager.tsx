'use client';

import { useEffect } from 'react';

export default function PushManagerComponent() {
  useEffect(
    () => {
    // 1. Check if SW is supported
      if ( 'serviceWorker' in navigator ) {
      // 2. Define the registration logic
        const register = async () => {
          try {
            const registration
              = await navigator.serviceWorker.register( '/service-worker.js' );
          // Optional: Check for updates immediately
          // registration.update();
          } catch ( error ) {
            console.error(
              'Service Worker registration failed:', error 
            );
          }
        };

        // 3. Performance Optimization:
        // Only register after the page has fully loaded to ensure
        // the SW doesn't compete for network/CPU during initial render.
        if ( document.readyState === 'complete' ) {
          register();
        } else {
          window.addEventListener(
            'load', register 
          );

          // Cleanup listener if component unmounts before load
          return () => {
            return window.removeEventListener(
              'load', register 
            );
          };
        }
      }

      return () => {
        return;
      };
    }, [] 
  );

  return null;
}
