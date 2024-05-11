'use client';
import styles from '#@/components/layout/search/searchbar.module.css';
import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function ActiveLink(
  {
    isActive,
    searchParams,
    children,
  }: {
  isActive: boolean;
  searchParams: string;
  children: ReactNode;
}
) {
  const pathname = usePathname();

  return (
    <Link
      className={isActive
        ? styles.linkIsActive
        : styles.linkNotActive}
      href={( pathname + '?' + searchParams ) as Route}
    >
      {children}
    </Link>
  );
}
