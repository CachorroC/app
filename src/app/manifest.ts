import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
      const prefix = process.env.NODE_ENV === 'production'
        ? 'app'
        : 'beta';

      const url = `https://${ prefix }.rsasesorjuridico.com`;

      return {
        short_name                 : 'Tulis',
        name                       : 'R & S Asesoria Juridica Especializada S.A.S',
        orientation                : 'any',
        lang                       : 'es-CO',
        dir                        : 'ltr',
        scope                      : '/',
        id                         : '/',
        background_color           : '#202b3a',
        theme_color                : '#7aa4dd',
        prefer_related_applications: false,
        display                    : 'fullscreen',
        start_url                  : url,
        description                : 'Somos una firma legal comprometida con brindar something',
        display_override           : [
          'fullscreen',
          'standalone',
          'window-controls-overlay',

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
        serviceworker: {
          scope           : '/',
          src             : '/service-worker.js',
          update_via_cache: 'all'

        },
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



        ],
      };
}
