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
        url  : '/Carpetas/UltimasActuaciones',
        icons: [
          {
            src    : '/icon.svg',
            sizes  : '96x96 144x144 152x152 192x192 70x70',
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
            sizes  : '512x512',
            type   : 'image/png',
            purpose: 'any',
          },
        ],
      },
    ],
    icons: [
      {
        src    : '/icon.svg',
        sizes  : '72x72 128x128 144x144 192x192 512x512',
        type   : 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src    : '/icon.svg',
        sizes  : '72x72 128x128 144x144 192x192 512x512',
        type   : 'image/svg+xml',
        purpose: 'any',
      },
      {
        src    : '/icon13.png',
        sizes  : '512x512',
        type   : 'image/png',
        purpose: 'maskable',
      },
      {
        src    : '/icon10.png',
        sizes  : '192x192',
        type   : 'image/png',
        purpose: 'maskable',
      },
      {
        src    : '/icon3.png',
        sizes  : '144x144',
        type   : 'image/png',
        purpose: 'monochrome',
      },
      {
        src    : '/icon2.png',
        sizes  : '270x270',
        type   : 'image/png',
        purpose: 'monochrome',
      },
      {
        src    : '/icon1.png',
        sizes  : '128x128',
        type   : 'image/png',
        purpose: 'monochrome',
      },
    ],
  };
}
