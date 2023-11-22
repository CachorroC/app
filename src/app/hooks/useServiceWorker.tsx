import { useEffect, useState } from 'react';

export function useServiceWorker() {
      const [
        counter,
        setCounter
      ] = useState(
        0
      );

      const sw = navigator.serviceWorker;

      useEffect(
        () => {
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
                                                                increment();
                                                              }

                                                              decrement();
                                                    }
                                                  );
                                        }
                                      );
                      }
                    );
                  }

                  return () => {
                            sw.removeEventListener(
                              'message', (
                                e
                              ) => {
                                        console.log(
                                          `useServiceWorker sw removeEventListener ${ e }`
                                        );
                              }
                            );
                  };
        }, [
          counter,
          setCounter,
          sw
        ]
      );
}
