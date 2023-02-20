/*^ // components/layout.js
import Link from "next/link";
import layout from "../styles/layout.module.scss";
import React from "react";
import Drawer from "./drawer";

export default function Layout(props: any) {
  return (
    );
  } */
import Image from "next/image";
import Footer from "./footer";
import Meta from "./meta";
import layout from "../styles/css/layout.module.css";
import Link from "next/link";
import { Drawer } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div className={layout.base}>
        <div className={layout.header}>
          <Drawer />
          <nav className={layout.navbar}>
            <Link href="/">Home</Link>
            <Link href="/offline">About</Link>
            <Link href="showLinks">Show Links</Link>
            <Link href="/post/first">First Post</Link>
            <Link href="/post/second">Second Post</Link>
            <Link href="/showLinks">links</Link>
          </nav>
        </div>
        {children}

        <Footer />
        <footer className={layout.footer}>
          <Link
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <Image
              width={240}
              height={240}
              src="/vercel.svg"
              alt="Vercel Logo"
              className="logo"
            />
          </Link>
        </footer>
      </div>
    </>
  );
};

export default Layout;
