import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name                       : 'RyS Asesoria Juridica Especializada SAS',
    short_name                 : 'RyS',
    background_color           : '#202b3a',
    theme_color                : '#7aa4dd',
    prefer_related_applications: false,
    display                    : 'standalone',
    start_url                  : '/',
    //start_url                  : `https://${ process.env.BASE_URL ?? 'app.rsasesorjuridico.com' }`,
    description                : 'Somos una firma legal comprometida con brindar something',
    display_override           : [
      'standalone',
      'minimal-ui'
    ],
    shortcuts: [
      {
        name: 'Ultimas Actuaciones',
        description:
          'aquí encontrará los procesos ordenados a partir de sus últimas actuaciones, la fecha del movimiento y su relevancia',
        url  : '/Carpetas/UltimasActuaciones',
        icons: [
          {
            src    : '/icon1.png',
            sizes  : '512x512',
            purpose: 'any',
          },
        ],
      },
      {
        name : 'Notas',
        url  : '/Notas',
        icons: [
          {
            src    : '/icon.svg',
            sizes  : '150x150',
            purpose: 'any',
          },
        ],
      },
      {
        name : 'Carpetas',
        url  : '/Carpetas',
        icons: [
          {
            src    : '/icon.svg',
            sizes  : '150x150',
            purpose: 'any',
          },
        ],
      },
    ],
    serviceworker: {
      src: '/service-worker.js',
    },
    icons: [

      {
        src    : '/icon.svg',
        sizes  : '150x150',
        purpose: 'maskable',
      },
      {
        src    : '/icon.svg',
        sizes  : '150x150',
        purpose: 'monochrome',
      },
      {
        src    : '/icon.svg',
        sizes  : '150x150',
        purpose: 'any',
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
    ],
  };
}
