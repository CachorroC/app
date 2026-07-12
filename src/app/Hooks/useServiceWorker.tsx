import { useEffect, useRef } from 'react';

export function useServiceWorker() {
  const handlerRef = useRef<( ( e: MessageEvent ) => void ) | null>( null );

  useEffect(
    () => {
      const sw = navigator.serviceWorker;

      if ( !sw ) {
        return;
      }

      const onLoad = () => {
        sw.register( './serviceworker.js' )
          .then( () => {
            return sw.ready;
          } )
          .then( () => {
            handlerRef.current = ( {
              data 
            }: MessageEvent ) => {
              if ( data?.state !== undefined ) {
              // handle incoming service worker message
              }
            };

            sw.addEventListener(
              'message', handlerRef.current 
            );
          } );
      };

      window.addEventListener(
        'load', onLoad 
      );

      return () => {
        window.removeEventListener(
          'load', onLoad 
        );

        if ( handlerRef.current ) {
          sw.removeEventListener(
            'message', handlerRef.current 
          );
          handlerRef.current = null;
        }
      };
    }, [] 
  );
}
