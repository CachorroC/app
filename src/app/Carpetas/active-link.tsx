'use client';
import styles from '#@/components/layout/search/searchbar.module.css';
import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ActiveLink(
  {
    isActive,
    searchParams,
    children,
  }: {
    isActive: boolean;
    searchParams: string;
    children: React.ReactNode;
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
