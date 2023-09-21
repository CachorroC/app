'use client';

import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [
            isOnline,
            setIsOnline
  ] = useState(
    true 
  );
  useEffect(
    () => {
      function handleOnline() {
        if ( 'serviceWorker' in navigator ) {
          console.log(
            'CLIENT: service worker registration in progress.' 
          );
          navigator.serviceWorker.register(
            '/service-worker.js' 
          )
            .then(
              function () {
                console.log(
                  'CLIENT: service worker registration complete.' 
                );
              },
              function () {
                console.log(
                  'CLIENT: service worker registration failure.' 
                );
              },
            );
        } else {
          console.log(
            'CLIENT: service worker is not supported.' 
          );
        }
        setIsOnline(
          true 
        );
      }

      function handleOffline() {
        setIsOnline(
          false 
        );
      }
      window.addEventListener(
        'online', handleOnline 
      );
      window.navigator;
      window.addEventListener(
        'offline', handleOffline 
      );

      return () => {
        window.removeEventListener(
          'online', handleOnline 
        );
        window.removeEventListener(
          'offline', handleOffline 
        );
      };
    }, [
              setIsOnline
    ] 
  );

  return isOnline;
}
