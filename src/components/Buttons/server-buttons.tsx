import type { Route } from 'next';
import Link from 'next/link';
import navbar from 'components/layout/navbar.module.css';

export const HomeButton = () => {
  return (
    <Link href={'/' as Route} className={navbar.buttonHome}>
      <span className={`material-symbols-outlined ${ navbar.icon }`}>home</span>
      <p className={navbar.ButtonTextHelper}>inicio</p>
    </Link>
  );
};
