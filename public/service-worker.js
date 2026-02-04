/* eslint-disable no-unused-vars */
// @ts-check

/**
 * Forzamos a TypeScript a tratar 'self' como un ServiceWorkerGlobalScope
 * sin usar la palabra reservada 'declare'.
 * @type {ServiceWorkerGlobalScope & typeof globalThis}
 */
const sw = /** @type {?} */ ( self );

const CACHE_NAME = 'offline-v1';
const OFFLINE_URL = '/offline.html';

//

sw.addEventListener(
  'install', (
    event
  ) => {
    event.waitUntil(
      ( async () => {
        const cache = await caches.open(
          CACHE_NAME
        );
        await cache.add(
          new Request(
            OFFLINE_URL, {
              cache: 'reload'
            }
          )
        );
      } )()
    );
    sw.skipWaiting();
  }
);

sw.addEventListener(
  'activate', (
    event
  ) => {
    event.waitUntil(
      ( async () => {
        if ( 'navigationPreload' in sw.registration ) {

          await sw.registration.navigationPreload.enable();
        }
      } )()
    );
    // 'clients' ahora será reconocido correctamente
    sw.clients.claim();
  }
);

sw.addEventListener(
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

            return await fetch(
              event.request
            );
          } catch ( error ) {
            const cache = await caches.open(
              CACHE_NAME
            );
            const cachedResponse = await cache.match(
              OFFLINE_URL
            );

            return cachedResponse || new Response(
              'Offline', {
                headers: {
                  'Content-Type': 'text/html'
                }
              }
            );
          }
        } )()
      );
    }
  }
);

sw.addEventListener(
  'push', (
    event
  ) => {
    if ( event.data ) {
      let data;

      try {
        data = event.data.json();
      } catch ( e ) {
        data = {
          title: 'Notificación',
          body : event.data.text()
        };
      }

      const options = {
        body   : data.body,
        icon   : '/icon.png',
        badge  : '/badge.png',
        vibrate: [
          100,
          50,
          100
        ],
        data: {
          dateOfArrival: Date.now(),
          primaryKey   : '2',
        },
      };

      event.waitUntil(
        sw.registration.showNotification(
          data.title || 'Mensaje', options
        )
      );
    }
  }
);

sw.addEventListener(
  'notificationclick', (
    event
  ) => {
    event.notification.close();
    event.waitUntil(
      sw.clients.openWindow(
        '/'
      )
    );
  }
);