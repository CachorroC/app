'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Route } from 'next';
import Link from 'next/link';
import styles from '#@/styles/layout.module.css';
import { useNavigationContext } from '#@/app/context/navigation-context';

export function NavLink<T extends string>(
  {
    hrefLabel, iconLabel, textLabel
  }:{ iconLabel: string; textLabel: string;  hrefLabel: Route<T> | URL}
) {
      const {
        setIsNavOpen
      } = useNavigationContext();

      const pathname = usePathname();

      const isActive = pathname === hrefLabel;
      return (
        <Link key={hrefLabel.toString()} className={
          isActive
            ? styles.linkActive
            : styles.link
        } onClick={
          () => {
                    setIsNavOpen(
                      false
                    );
          }
        } href={hrefLabel as Route}
        >
          <span className={`material-symbols-outlined ${ styles.icon }`}>{iconLabel}</span>
          <h1 className={ styles.text}>{textLabel}</h1>
        </Link>
      );
}
