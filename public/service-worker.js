const CACHE_NAME = 'offline';

const OFFLINE_URL = '/offline';

// Use the install event to pre-cache all initial resources.
self.addEventListener(
  'install', (
    event 
  ) => {
            event.waitUntil(
              ( async () => {
                        const cache = await caches.open(
                          CACHE_NAME 
                        );
                        cache.addAll(
                          [
                            '/Contacto',
                            '/api',
                            '/offline.html',
                            '/despachos.json',
                            new Request(
                              OFFLINE_URL, {
                                cache: 'reload',
                              } 
                            ),
                          ] 
                        );
              } )(),
            );
            self.skipWaiting();
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
              } )(),
            );
            self.clients.claim();
  } 
);
self.addEventListener(
  'fetch', (
    event 
  ) => {
            event.respondWith(
              ( async () => {
                        const cache = await caches.open(
                          CACHE_NAME 
                        );

                        // Get the resource from the cache.
                        const cachedResponse = await cache.match(
                          event.request 
                        );

                        if ( cachedResponse ) {
                          console.log(
                            `cachedResponse ${ cachedResponse }` 
                          );
                          return cachedResponse;
                        }

                        try {
                        // If the resource was not in the cache, try the network.
                          const fetchResponse = await fetch(
                            event.request 
                          );

                          // Save the resource in the cache and return it.
                          cache.put(
                            event.request, fetchResponse.clone() 
                          );
                          return fetchResponse;
                        } catch ( e ) {
                        // The network failed.
                          console.log(
                            `service worker error: network failed ${ e }` 
                          );
                          return Response.error();
                        }
              } )(),
            );
  } 
);

self.addEventListener(
  'push', function (
    event 
  ) {
            if ( !( self.Notification && self.Notification.permission === 'granted' ) ) {
              return;
            }

            const data = event.data?.json() ?? {};

            const title = data.title || 'Algo ha ocurrido';

            const message = data.message || 'Aca hay algo que deberías revisar';

            const icon = 'images/new-notification.png';

            const notification = new self.Notification(
              title, {
                body: message,
                tag : 'simple-push-demo-notification',
                icon,
              } 
            );

            notification.addEventListener(
              'click', () => {
                        console.log(
                          'notification event listener' 
                        );
              } 
            );
  } 
);
