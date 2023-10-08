import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const prefix = process.env.NODE_ENV === 'production'
    ? 'app'
    : 'beta';

  const url = `https://${ prefix }.rsasesorjuridico.com`;

  return {
    short_name                 : 'RyS',
    name                       : 'R&S Asesoria Juridica Especializada S.A.S',
    orientation                : 'any',
    lang                       : 'es',
    dir                        : 'ltr',
    scope                      : '/',
    id                         : '/',
    background_color           : '#202b3a',
    theme_color                : '#7aa4dd',
    prefer_related_applications: false,
    display                    : 'standalone',
    share_target               : {
      action : '/api',
      method : 'get',
      url    : 'link',
      title  : 'name',
      text   : 'descripcion',
      enctype: 'application/x-www-form-urlencoded',
      params : [
        {
          name    : 'idk',
          value   : 'godKnows',
          required: false,
        },
      ],
    },
    start_url       : url,
    description     : 'Somos una firma legal comprometida con brindar something',
    display_override: [
      'fullscreen',
      'minimal-ui'
    ],
    shortcuts: [
      {
        name : 'Procesos',
        url  : '/Procesos',
        icons: [
          {
            src    : '/icon.svg',
            sizes  : '96x96 144x144 152x152 192x192 70x70 ',
            type   : 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
      {
        name : 'Notas',
        url  : '/Notas',
        icons: [
          {
            src    : '/icon13.png',
            sizes  : '96x96',
            type   : 'image/png',
            purpose: 'any',
          },
        ],
      },
    ],
    icons: [
      {
        src    : '/icon5.png',
        purpose: 'maskable',
        type   : 'image/png'
      },
      {
        src: '/icon13.png',

        purpose: 'any',
        type   : 'image/png'
      },
      {
        src    : '/icon.svg',
        sizes  : '558x558 270x270 144x144 192x192 128x128 72x72 48x48 32x32 16x16',
        type   : 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src    : '/icon.svg',
        sizes  : '558x558 270x270 144x144 192x192 128x128 72x72 48x48 32x32 16x16',
        type   : 'image/svg+xml',
        purpose: 'monochrome',
      },
      {
        src    : '/icons/mstile-558x270.png',
        sizes  : '558x270',
        type   : 'image/png',
        purpose: 'any',
      },
      {
        src    : '/icon1.png',
        type   : 'image/png',
        purpose: 'any',
      },
      {
       src    : '/icon2.png',
        type   : 'image/png',
        purpose: 'any',
      },
      {
        src    : '/icon3.png',
        type   : 'image/png',
        purpose: 'any',
      },
      {
        src    : '/safari-pinned-tab.svg',
        purpose: 'any',
        type: 'image/svg+xml'
      },
      {
        src    : 'icon13.png',
        type   : 'image/png',
        purpose: 'maskable',
      },
      {
        src    : '/apple-icon-precomposed.png',
        sizes  : '144x144',
        type   : 'image/png',
        purpose: 'monochrome',
      },


      {
        src    : '/icons/android-chrome-48x48.png',
        sizes  : '48x48',
        type   : 'image/png',
        purpose: 'maskable',
      },
      {
        src    : '/icons/android-chrome-72x72.png',
        sizes  : '72x72',
        type   : 'image/png',
        purpose: 'maskable',
      },
      {
        src    : '/icons/android-chrome-96x96.png',
        sizes  : '96x96',
        type   : 'image/png',
        purpose: 'maskable',
      },
      {
        src    : '/icons/android-chrome-144x144.png',
        sizes  : '144x144',
        type   : 'image/png',
        purpose: 'maskable',
      },
      {
        src    : '/icons/android-chrome-192x192.png',
        sizes  : '192x192',
        type   : 'image/png',
        purpose: 'maskable',
      },
      {
        src    : '/icons/android-chrome-256x256.png',
        sizes  : '256x256',
        type   : 'image/png',
        purpose: 'maskable',
      },
      {
        src    : '/icons/android-chrome-384x384.png',
        sizes  : '384x384',
        type   : 'image/png',
        purpose: 'maskable',
      },
      {
        src    : '/icons/android-chrome-512x512.png',
        sizes  : '512x512',
        type   : 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
