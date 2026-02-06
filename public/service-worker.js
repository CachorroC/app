
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
            console.log(
              error
            );
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
        console.log(
          `data: ${ data }`
        );
        console.error(
          `data: ${ data }`
        );
      } catch ( e ) {
        console.log(
          e
        );
        data = {
          title: 'Notificación',
          body : event.data.text()
        };
      }

      const options = {
        title  : data.title,
        body   : data.body,
        icon   : data.icon || '/icons/notification_icon.png',
        badge  : '/icons/android-chrome-36x36.png',
        data   : data.data,
        actions: data.actions || [
          {
            action: 'openCarpeta',
            title : 'Ver Carpeta'
          },
          {
            action: 'openActuaciones',
            title : 'Ver Actuaciones'
          }
        ]
      };


      event.waitUntil(
        sw.registration.showNotification(
          data.title || 'Mensaje', options
        )
      );
    }
  }
);

/* sw.addEventListener(
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
); */
sw.addEventListener(
  'notificationclick', (
    event
  ) => {
    console.log(
      'Notification clicked.'
    );

    // 1. Close the notification
    event.notification.close();

    const {
      action, notification
    } = event;
    const data = notification.data || {};

    // 2. Determine the URL to open based on the action
    let urlToOpen;

    if ( action === 'openCarpeta' ) {
      // Action: openCarpeta -> https://app.rsasesorjuridico.com/Carpeta/${numero}
      urlToOpen = `https://app.rsasesorjuridico.com/Carpeta/${ data.numero }`;

    } else if ( action === 'openActuaciones' ) {
      // Action: openActuaciones -> https://app.rsasesorjuridico.com/Carpeta/${numero}/ultimasActuaciones/${idProceso}
      urlToOpen = `https://app.rsasesorjuridico.com/Carpeta/${ data.numero }/ultimasActuaciones/${ data.idProceso }`;

    } else {
      // Default Action (Body click) -> data.url
      urlToOpen = data.url || '/';
    }

    console.log(
      `Opening URL: ${ urlToOpen }`
    );

    // 3. Handle the opening/focusing of the window
    if ( urlToOpen ) {
      event.waitUntil(
        sw.clients.matchAll(
          {
            type               : 'window',
            includeUncontrolled: true
          }
        )
          .then(
            (
              clientList
            ) => {
            // A. Check if a tab with this URL is already open and focus it
              for ( const client of clientList ) {
                const clientUrl = new URL(
                  client.url, self.location.origin
                ).href;
                const targetUrl = new URL(
                  urlToOpen, self.location.origin
                ).href;

                // Compare strict equality or just path depending on preference
                if ( clientUrl === targetUrl && 'focus' in client ) {
                  return client.focus();
                }
              }

              // B. If not open, open a new window
              if ( sw.clients.openWindow ) {
                return sw.clients.openWindow(
                  urlToOpen
                );
              }

              // FIX: Add this return to satisfy TypeScript
              return null;
            }
          )
      );
    }
  }
);