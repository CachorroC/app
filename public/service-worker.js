'use strict';
/// <reference lib="WebWorker" />


const CACHE_NAME = 'offline';
self.addEventListener(
  'install', (
    event
  ) => {
            self.skipWaiting();
            event.waitUntil(
              ( async () => {
                        const cache = await caches.open(
                          CACHE_NAME
                        );
                        console.log(
                          cache
                        );
                        await cache.add(
                          '/offline.html'
                        );
              } )()
            );

  }
);
self.addEventListener(
  'activate', (
    event
  ) => {
            event.waitUntil(
              ( async () => {
                        if ( 'navigationPreload' in self.registration ) {
                          console.log(
                            `navigationPreload in ${ self.registration }`
                          );
                          await self.registration.navigationPreload.enable();
                        }
              } )()
            );
            self.clients.claim();
  }
);