import './manifest';
import '#@/styles/globals.css';
import 'material-symbols';
import layout from '#@/styles/layout.module.css';
import Script from 'next/script';
import { ReactNode } from 'react';
import { MainProvider } from './Context/main-context';
import { SearchProvider } from './Context/search-context';
import { ModalProvider } from './Context/modal-context';
import type { Metadata, Viewport } from 'next';
import { NavBar } from '#@/components/layout/NavBar';
import { NavigationContextProvider } from './Context/navigation-context';
import { CategoryContextProvider } from './Context/category-context';
import { playDisp, ptserif, josefina, radio, raleway } from '#@/styles/fonts';

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
    statusBarStyle: 'black-translucent',
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
  props: {
  children: ReactNode;
  modal: ReactNode;
} 
) {
  const prefix = process.env.NODE_ENV === 'production'
    ? 'app'
    : 'beta';
  return (
    <html lang="es-CO">
      <body
        className={`${ playDisp.variable } ${ josefina.variable } ${ raleway.variable } ${ radio.variable } ${ ptserif.variable } [ color-scheme: light dark ]`}
      >
        <CategoryContextProvider>
          <NavigationContextProvider>
            <SearchProvider>
              <ModalProvider>
                <MainProvider>
                  <div className={layout.container}>
                    <NavBar />
                    {props.children}
                    {props.modal}
                  </div>
                </MainProvider>
              </ModalProvider>
            </SearchProvider>
          </NavigationContextProvider>
        </CategoryContextProvider>
        <Script
          src={`https://${ prefix }.rsasesorjuridico.com/installService-worker.js`}
        />
      </body>
    </html>
  );
}
