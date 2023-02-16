// components/layout.js
import styles from '../styles/Home.module.scss';
import Navbar from './Navbar';
import Footer from './footer';
import React from 'react';

export default function Layout(props: any) {
  return (
    <>
      <Navbar />
      <main className={styles.main}>{props.children}</main>

      <Footer />
    </>
  );
}
