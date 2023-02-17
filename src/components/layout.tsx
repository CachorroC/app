// components/layout.js
import Link from 'next/link';
import Image from 'next/image';
import layout from '../styles/layout.module.scss';
import React from 'react';

export default function Layout(props: any) {
  return (
    <main className={layout.container}>
      <nav className={layout.navbar}>
        <Link href='/'>Home</Link>
        <Link href='/offline'>About</Link>
        <Link href='/post/first'>First Post</Link>
        <Link href='/post/second'>Second Post</Link>
        <Link href='/showLinks'>links</Link>
      </nav>
      <div className={layout.main}>{props.children}</div>
      <footer className={layout.footer}>
        <Link
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          Powered by{' '}
          <Image
            width={240}
            height={240}
            src='/vercel.svg'
            alt='Vercel Logo'
            className='logo'
          />
        </Link>
      </footer>
    </main>
  );
}
