import '#@/styles/globals.css';
import './manifest';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ReactNode } from 'react';
import layout from '#@/styles/layout.module.css';
import { MainProvider } from './context/main-context';
import { inter, josefina, poiret, raleway, roboto } from '#@/styles/fonts';
import 'material-symbols';
import { SearchProvider } from './context/search-context';
import { ModalProvider } from './context/modal-context';
import { CarpetaFormProvider } from './context/carpeta-form-context';
import getCarpetas from '#@/lib/project/getCarpetas';

import { CarpetasSortProvider } from './context/carpetas-sort-context';

const prefix = process.env.NODE_ENV === 'production'
  ? 'app'
  : 'beta';

const hostname = `https://${ prefix }.rsasesorjuridico.com`;

export const metadata: Metadata = {
  metadataBase: new URL(
    hostname
  ),
  title          : 'R&S Asesoría Jurídica',
  description    : 'Generated by create next app',
  generator      : 'R&S Asesoría Jurídica',
  applicationName: 'R&S Asesoría Jurídica',
  referrer       : 'origin-when-cross-origin',
  colorScheme    : 'light dark',
  keywords       : [
    'Next.js',
    'React',
    'JavaScript'
  ],
  authors: [
    {
      name: 'Camilo Suarez',
    },
    {
      name: 'Cachorro Cami',
      url : hostname,
    },
  ],
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#bb152c',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#ab2a64',
    },
  ],
  creator        : 'Cachorro Cami',
  publisher      : 'CachorroC',
  alternates     : {},
  formatDetection: {
    email    : false,
    address  : false,
    telephone: false,
  },
  openGraph: {
    title      : 'R&S Asesoría Jurídica',
    description: 'The React Framework for the Web',
    url        : hostname,
    siteName   : 'Next.js',
    images     : [
      {
        url   : '/splash_screens/12.9__iPad_Pro_portrait.png',
        width : 800,
        height: 600,
      },
      {
        url   : '/splash_screens/8.3__iPad_Mini_landscape.png',
        width : 1800,
        height: 1600,
        alt   : 'My custom alt',
      },
    ],
    locale: 'es-CO',
    type  : 'website',
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
      new URL(
        '/favicon.svg', `${ hostname }`
      ),
    ],
    shortcut: '/icons/safari-pinned-tab.svg',
    apple   : '/icons/safari-pinned-tab.svg',
    other   : {
      rel: 'apple-touch-icon-precomposed',
      url: '/icons/apple-touch-icon-precomposed.png',
    },
  },
  appleWebApp: {
    title         : 'Apple Web App',
    statusBarStyle: 'black-translucent',
    startupImage  : [
      '/icons/mstile-310x310.png',
      {
        url  : '/icons/android-chrome-512x512.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
  appLinks: {
    web: {
      url            : '/',
      should_fallback: true,
    },
  },
};

export default async function RootLayout(
  {
    children,
    header,
    modal,
    right,
  }: {
  children: ReactNode;
  header: ReactNode;
  modal: ReactNode;
  right: ReactNode;
}
) {
  const carpetas = await getCarpetas();

  return (
    <html lang="es">
      <body
        className={`${ poiret.variable } ${ raleway.variable } ${ inter.variable } ${ roboto.variable } ${ josefina.variable } [ color-scheme: light dark ]`}
      >
        <CarpetasSortProvider carpetas={ carpetas }>
          <CarpetaFormProvider>
            <SearchProvider>
              <ModalProvider>
                <MainProvider>
                  <div className={ layout.container }>

                    { header }
                    {modal}
                    {children}
                    <div className={layout.right}>{right}</div>
                  </div>

                  <Script src={'service-worker.js'} />
                </MainProvider>
              </ModalProvider>
            </SearchProvider>
          </CarpetaFormProvider>
        </CarpetasSortProvider>
      </body>
    </html>
  );
}
