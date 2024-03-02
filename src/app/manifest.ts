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
        display                    : 'standalone',
        start_url                  : url,
        description                : 'Somos una firma legal comprometida con brindar something',
        display_override           : [
          'standalone',
          'minimal-ui',
          'browser' 
        ],
        shortcuts: [
          {
            name: 'Ultimas Actuaciones',
            description:
          'aquí encontrará los procesos ordenados a partir de sus últimas actuaciones, la fecha del movimiento y su relevancia',
            url  : '/Carpetas/UltimasActuaciones',
            icons: [ {
              src    : '/icon1.png',
              sizes  : '512x512',
              purpose: 'any',
            }, ],
          },
          {
            name : 'Notas',
            url  : '/Notas',
            icons: [ {
              src    : '/icon.svg',
              sizes  : '512x512',
              purpose: 'any',
            }, ],
          },
          {
            name : 'Carpetas',
            url  : '/Carpetas',
            icons: [ {
              src    : '/icon7.png',
              sizes  : '194x194',
              purpose: 'any'
            } ]
          }
        ],
        serviceworker: {
          src  : '/service-worker.js',
          scope: '/'

        },
        icons: [
          {
            src    : '/icon.svg',
            sizes  : '512x512',
            purpose: 'maskable',
          },
          {
            src    : '/icon.svg',
            sizes  : '512x512',
            purpose: 'monochrome',
          },
          {
            src    : '/icon2.png',
            sizes  : '192x192',
            type   : 'image/png',
            purpose: 'maskable',
          },
          {
            src    : '/icon1.png',
            sizes  : '512x512',
            type   : 'image/png',
            purpose: 'maskable',
          },
          {
            src    : '/icon2.png',
            sizes  : '192x192',
            type   : 'image/png',
            purpose: 'any',
          },
          {
            src    : '/icon1.png',
            sizes  : '512x512',
            type   : 'image/png',
            purpose: 'any',
          },
          {
            src    : '/icon3.png',
            sizes  : '128x128',
            type   : 'image/png',
            purpose: 'monochrome',
          },
          {
            src    : '/icon4.png',
            sizes  : '144x144',
            type   : 'image/png',
            purpose: 'monochrome',
          },
          {
            src    : '/icon5.png',
            sizes  : '270x270',
            type   : 'image/png',
            purpose: 'monochrome',
          },
          {
            src    : '/icon6.png',
            sizes  : '558x270',
            type   : 'image/png',
            purpose: 'monochrome',
          },
          {
            src    : '/icon7.png',
            sizes  : '558x558',
            type   : 'image/png',
            purpose: 'monochrome',
          },
        ],
      };
}
