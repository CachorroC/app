import '#@/styles/globals.css';
import './manifest';
import type { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import layout from '#@/styles/layout.module.css';
import { MainProvider } from './context/main-context';
import { josefina, radio, playDisp, raleway, ptserif } from '#@/styles/fonts';
import 'material-symbols';
import { SearchProvider } from './context/search-context';
import { ModalProvider } from './context/modal-context';
import getCarpetas from '#@/lib/project/getCarpetas';

import { CarpetasSortProvider } from './context/carpetas-sort-context';
import { NotasSortProvider } from './context/notas-sort-context';
import getNotas from '#@/lib/project/getNotas';
import Header from 'components/layout/header';
import SearchOutputList from 'components/layout/search/SearchProcesosOutput';
import SearchOutputListSkeleton from 'components/layout/search/SearchProcesosOutputSkeleton';
import Script from 'next/script';
import { Loader } from '#@/components/Loader';

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
    modal,
  }: {
  children: ReactNode;
  modal: ReactNode;
}
) {
  const carpetas = await getCarpetas();

  const notas = await getNotas();

  return (
    <html lang="es">
      <body
        className={`${ playDisp.variable } ${ radio.variable } ${ raleway.variable } ${ ptserif.variable } ${ josefina.variable }  [ color-scheme: light dark ]`}
      >
        <CarpetasSortProvider initialCarpetas={carpetas}>
          <NotasSortProvider notas={notas}>
            <SearchProvider>
              <ModalProvider>
                <MainProvider>
                  <div className={layout.container}>
                    <Suspense fallback={<Loader />}>
                      <Header>
                        <Suspense fallback={<SearchOutputListSkeleton />}>
                          <SearchOutputList />
                        </Suspense>
                      </Header>
                    </Suspense>
                    {modal}
                    {children}
                  </div>
                </MainProvider>
              </ModalProvider>
            </SearchProvider>
          </NotasSortProvider>
        </CarpetasSortProvider>
        <Script
          src={`https://${ prefix }.rsasesorjuridico.com/service-worker.js`}
        />
      </body>
    </html>
  );
}
