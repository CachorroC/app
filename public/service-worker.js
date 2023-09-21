if ( !self.define ) {
  let e,
    i = {};

  const r = (
    r, s
  ) => {
    return (
      ( r = new URL(
        r + '.js', s
      ).href ),
      i[ r ]
        || new Promise(
          (
            i
          ) => {
            if ( 'document' in self ) {
              const e = document.createElement(
                'script'
              );
              ( e.src = r ), ( e.onload = i ), document.head.appendChild(
                e
              );
            } else {
              ( e = r ), importScripts(
                r
              ), i();
            }
          }
        )
          .then(
            () => {
              let e = i[ r ];

              if ( !e ) {
                throw new Error(
                  `Module ${ r } didn’t register its module`
                );
              }

              return e;
            }
          )
    );
  };

  self.define = (
    s, n
  ) => {
    const o
      = e
      || ( 'document' in self
        ? document.currentScript.src
        : '' )
      || location.href;

    if ( i[ o ] ) {
      return;
    }
    let f = {};

    const a = (
        e
      ) => {
        return r(
          e, o
        );
      },
      d = {
        module: {
          uri: o,
        },
        exports: f,
        require: a,
      };
    i[ o ] = Promise.all(
      s.map(
        (
          e
        ) => {
          return d[ e ] || a(
            e
          );
        }
      )
    )
      .then(
        (
          e
        ) => {
          return n(
            ...e
          ), f;
        }
      );
  };
}
define(
  [
            './workbox-2fa7b06d'
  ], function (
    e
  ) {
    'use strict';
    self.addEventListener(
      'message', (
        e
      ) => {
        e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting();
      }
    ),
    e.precacheAndRoute(
      [
                {
                  url     : 'favicon_package_v0.16/safari-pinned-tab.svg',
                  revision: '0cbefe8d99c947427f9b1f52deae2e14',
                },
                {
                  url     : 'favicon.svg',
                  revision: '647c258f4c70523d7acc7f48b7f02f3d',
                },
                {
                  url     : 'icons/logo.svg',
                  revision: '3d2e3d6d1d261400f6ad07e321890401',
                },
                {
                  url     : 'icons/safari-pinned-tab.svg',
                  revision: '0cbefe8d99c947427f9b1f52deae2e14',
                },
                {
                  url     : 'logo.svg',
                  revision: '3d2e3d6d1d261400f6ad07e321890401',
                },
                {
                  url     : 'next.svg',
                  revision: '8e061864f388b47f33a1c3780831193e',
                },
                {
                  url     : 'p.js',
                  revision: 'f3783aca39dbe929ebd9c3988fe4d104',
                },
                {
                  url     : 'safari-pinned-tab.svg',
                  revision: '295206722ab51aa994eaa33c48b0a1a8',
                },
                {
                  url     : 'thirteen.svg',
                  revision: '53f96b8290673ef9d2895908e69b2f92',
                },
                {
                  url     : 'vercel.svg',
                  revision: '61c6b19abff40ea7acd577be818f3976',
                },
      ],
      {
        ignoreURLParametersMatching: [
                  /^utm_/,
                  /^fbclid$/
        ],
      }
    );
  }
);
//# sourceMappingURL=service-worker.js.map
