import './manifest';
import '#@/styles/globals.css';
import 'material-symbols';
import layout from '#@/styles/layout.module.css';
import Script from 'next/script';
import { ReactNode, Suspense } from 'react';
import { MainProvider } from './context/main-context';
import { josefina, radio, playDisp, raleway, ptserif } from '#@/styles/fonts';
import { SearchProvider } from './context/search-context';
import { ModalProvider } from './context/modal-context';
import { Loader } from '#@/components/Loader';
import type { Metadata, Viewport } from 'next';
import { NavBar } from '#@/components/layout/NavBar';

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

  creator        : 'Cachorro Cami',
  publisher      : 'CachorroC',
  alternates     : {},
  formatDetection: {
    email    : false,
    address  : false,
    telephone: false,
  },
  appleWebApp: {

    capable       : true,
    title         : 'R y S',
    statusBarStyle: 'black',
    startupImage  : [
      'src/app/logo.svg',
      {
        url  : '/logo.svg',
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

export const viewport: Viewport = {
  width       : 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme : 'light dark',
  themeColor  : [
    {
      media: '(prefers-color-scheme: light)',
      color: '#5C6BC0',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#1A237E',
    },
  ],
};

export default function RootLayout(
  {
    children,
  }: {
    children: ReactNode;
  }
) {
      return (
        <html lang="es">
          <body
            className={`${ playDisp.variable } ${ radio.variable } ${ raleway.variable } ${ ptserif.variable } ${ josefina.variable }  [ color-scheme: light dark ]`}
          >

            <SearchProvider>
              <ModalProvider>
                <MainProvider>
                  <div className={layout.container}>
                    <Suspense fallback={<Loader />}>
                      <NavBar />
                    </Suspense>
                    {children}
                  </div>
                </MainProvider>
              </ModalProvider>
            </SearchProvider>

            <Script
              src={`https://${ prefix }.rsasesorjuridico.com/installService-worker.js`}
            />

          </body>
        </html>
      );
}
