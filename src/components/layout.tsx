/*^ // components/layout.js
import Link from "next/link";
import layout from "../styles/layout.module.scss";
import React from "react";
import Drawer from "./drawer";

export default function Layout(props: any) {
  return (
    );
  } */
import Image from 'next/image';
import Footer from './footer';
import Meta from './meta';
import styles from '../styles/css/layout.module.css';
import Link from 'next/link';
import Header from '../components/header';
import { Drawer } from '@mui/material';
import Container from '../components/container';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div className={styles.base}>
        <Header />
        <Container>{children}</Container>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
