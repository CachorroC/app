if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a),
            (e.onload = s),
            document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e)
          throw new Error(
            `Module ${a} didn’t register its module`
          );
        return e;
      })
  );
  self.define = (n, r) => {
    const t =
      e ||
      ('document' in self
        ? document.currentScript.src
        : '') ||
      location.href;
    if (s[t]) return;
    let i = {};
    const c = (e) => a(e, t),
      o = { module: { uri: t }, exports: i, require: c };
    s[t] = Promise.all(n.map((e) => o[e] || c(e))).then(
      (e) => (r(...e), i)
    );
  };
}
define(['./workbox-588899ac'], function (e) {
  'use strict';
  importScripts('fallback-hZOM0bWFZaTmyWDPRh_qU.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/chunks/392-f0173f0d51253e58.js',
          revision: 'f0173f0d51253e58',
        },
        {
          url: '/_next/static/chunks/framework-2c79e2a64abdb08b.js',
          revision: '2c79e2a64abdb08b',
        },
        {
          url: '/_next/static/chunks/main-129e5da6b2161174.js',
          revision: '129e5da6b2161174',
        },
        {
          url: '/_next/static/chunks/pages/_app-343387d80bbc475b.js',
          revision: '343387d80bbc475b',
        },
        {
          url: '/_next/static/chunks/pages/_error-8353112a01355ec2.js',
          revision: '8353112a01355ec2',
        },
        {
          url: '/_next/static/chunks/pages/_offline-a7a264d924b39147.js',
          revision: 'a7a264d924b39147',
        },
        {
          url: '/_next/static/chunks/pages/blog-3aa9f58feb047c50.js',
          revision: '3aa9f58feb047c50',
        },
        {
          url: '/_next/static/chunks/pages/index-317500354a222ac1.js',
          revision: '317500354a222ac1',
        },
        {
          url: '/_next/static/chunks/pages/post/%5Bid%5D-9d2b177c809a11a5.js',
          revision: '9d2b177c809a11a5',
        },
        {
          url: '/_next/static/chunks/pages/post/%5Bid%5D/%5Bcomment%5D-0b9cd7894e37a99d.js',
          revision: '0b9cd7894e37a99d',
        },
        {
          url: '/_next/static/chunks/pages/posts/%5Bslug%5D-c06a33971b4950e8.js',
          revision: 'c06a33971b4950e8',
        },
        {
          url: '/_next/static/chunks/pages/showLinks-85a526d8f1d5735b.js',
          revision: '85a526d8f1d5735b',
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        {
          url: '/_next/static/chunks/webpack-87b3a303122f2f0d.js',
          revision: '87b3a303122f2f0d',
        },
        {
          url: '/_next/static/css/48287db405ffe9ce.css',
          revision: '48287db405ffe9ce',
        },
        {
          url: '/_next/static/css/c69640b26c212f2b.css',
          revision: 'c69640b26c212f2b',
        },
        {
          url: '/_next/static/hZOM0bWFZaTmyWDPRh_qU/_buildManifest.js',
          revision: '2bec9dad8032dc2fa011873041dd37ce',
        },
        {
          url: '/_next/static/hZOM0bWFZaTmyWDPRh_qU/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_offline',
          revision: 'hZOM0bWFZaTmyWDPRh_qU',
        },
        {
          url: '/assets/blog/authors/jj.jpeg',
          revision: '4b79ba5db00e9dfb8b7b80141e70a556',
        },
        {
          url: '/assets/blog/authors/joe.jpeg',
          revision: 'dbe29ba98b113ae8b22f1a5629d1eddc',
        },
        {
          url: '/assets/blog/authors/tim.jpeg',
          revision: 'a7da13d481bb08604b8ff4217d426a78',
        },
        {
          url: '/assets/blog/dynamic-routing/cover.jpg',
          revision: '50bc698719258529c800491531a3fe21',
        },
        {
          url: '/assets/blog/hello-world/cover.jpg',
          revision: 'faa59500b8a23c3dade89705c3d663a8',
        },
        {
          url: '/assets/blog/preview/cover.jpg',
          revision: 'ea4aba2e4b93a3bb05f45b5a99cf6cc6',
        },
        {
          url: '/favicon.ico',
          revision: 'b7e5d143f696329db9b04f047c8ba284',
        },
        {
          url: '/manifest.json',
          revision: '3c8171848b2975a39048136ac087b5fe',
        },
        {
          url: '/next.svg',
          revision: '8e061864f388b47f33a1c3780831193e',
        },
        {
          url: '/thirteen.svg',
          revision: '53f96b8290673ef9d2895908e69b2f92',
        },
        {
          url: '/vercel.svg',
          revision: '61c6b19abff40ea7acd577be818f3976',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: n,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return (
          !s.startsWith('/api/auth/') &&
          !!s.startsWith('/api/')
        );
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 3600,
          }),
          {
            handlerDidError: async ({ request: e }) =>
              self.fallback(e),
          },
        ],
      }),
      'GET'
    );
});
