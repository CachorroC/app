import '../styles/css/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Head from 'next/head';

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
