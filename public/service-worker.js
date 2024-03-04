'use strict';
/// <reference lib="WebWorker" />

const CACHE_NAME = 'offline';

const OFFLINE_URL = '/offline';
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
                        await cache.addAll(
                          [
                            '/general.xlsx',
                            'offline.html',
                            new Request(
                              OFFLINE_URL
                            ),
                          ]
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
self.addEventListener(
  'fetch', (
    event
  ) => {
            if ( event.request.mode === 'navigate' ) {
              event.respondWith(
                ( async () => {
                          try {
                            const preloadResponse = await event.preloadResponse;

                            if ( preloadResponse ) {
                              return preloadResponse;
                            }

                            const networkResponse = await fetch(
                              event.request
                            );
                            return networkResponse;
                          } catch ( error ) {
                            console.log(
                              'Fetch failed; returning offline page instead.', error
                            );

                            const cache = await caches.open(
                              CACHE_NAME
                            );

                            const cachedResponse = await cache.match(
                              OFFLINE_URL
                            );
                            return cachedResponse;
                          }
                } )()
              );
            }
  }
);
//# sourceMappingURL=service-worker.js.map