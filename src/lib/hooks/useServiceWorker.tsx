import { useEffect, useState } from 'react';

export function useServiceWorker() {
  const [
    counter,
    setCounter
  ] = useState(
    0 
  );

  const decrement = () => {
    setCounter(
      counter - 1 
    );
  };

  const increment = () => {
    setCounter(
      counter + 1 
    );
  };

  const sw = navigator.serviceWorker;

  useEffect(
    () => {
      if ( sw ) {
        window.addEventListener(
          'load', () => {
            sw.register(
              './serviceworker.js' 
            )
                  .then(
                    () => {
                      return sw.ready;
                    } 
                  )
                  .then(
                    () => {
                      sw.addEventListener(
                        'message', (
                          {
                            data 
                          } 
                        ) => {
                          if ( data?.state !== undefined ) {
                            setCounter(
                              data.state 
                            );
                          }
                        } 
                      );
                    } 
                  );
          } 
        );
      }
    }, [
      setCounter,
      sw
    ] 
  );
}
