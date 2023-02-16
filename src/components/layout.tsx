import { ButtonUnstyled } from '@mui/base';
import button from '../styles/button.module.scss';
import { Children } from 'react';
import { AppProps } from 'next/app';

export default function Layout({
  Component,
  pageProps,
}: AppProps) {
  return (
    <>
      <Component className={button.primary}>
        {pageProps}
        <span className='material-symbols-outlined'></span>
      </Component>
    </>
  );
}
