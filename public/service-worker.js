/* eslint-disable no-unused-vars */
/**
 * @type {ServiceWorkerGlobalScope}
 */
const sw = self;

const CACHE_NAME = 'offline-v1';
const OFFLINE_URL = 'offline.html';

sw.addEventListener(
  'install', ( event ) => {
    event.waitUntil( ( async () => {
      const cache = await caches.open( CACHE_NAME );
      // 'reload' asegura que no traiga una versión vieja del cache del navegador
      await cache.add( new Request(
        OFFLINE_URL, {
          cache: 'reload'
        }
      ) );
    } )() );
    sw.skipWaiting();
  }
);

sw.addEventListener(
  'activate', ( event ) => {
    event.waitUntil( ( async () => {
    // Habilitar navegación precargada si el navegador lo soporta
      if ( 'navigationPreload' in sw.registration ) {
        await sw.registration.navigationPreload.enable();
      }
    } )() );
    // Corregido: 'clients' en minúscula
    sw.clients.claim();
  }
);

sw.addEventListener(
  'fetch', ( event ) => {
    if ( event.request.mode === 'navigate' ) {
      event.respondWith( ( async () => {
        try {
          const preloadResponse = await event.preloadResponse;

          if ( preloadResponse ) {
            return preloadResponse;
          }

          return await fetch( event.request );
        } catch ( error ) {
          console.log(
            'Fetch failed; returning offline page.', error
          );
          const cache = await caches.open( CACHE_NAME );
          const cachedResponse = await cache.match( OFFLINE_URL );

          return cachedResponse || new Response( 'Offline content unavailable' );
        }
      } )() );
    }
  }
);

sw.addEventListener(
  'push', ( event ) => {
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

      event.waitUntil( sw.registration.showNotification(
        data.title || 'Nuevo Mensaje', options
      ) );
    }
  }
);

sw.addEventListener(
  'notificationclick', ( event ) => {
    event.notification.close();
    event.waitUntil( sw.clients.openWindow( '/' ) );
  }
);