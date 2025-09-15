'use client';
import { useCategory } from '#@/app/Context/category-context';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { Route } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';

export function ClientCardRow<H extends string>( {
  carpeta,
  rowHref,
  children,
}: {
  carpeta: IntCarpeta;
  rowHref: Route<H>;
  children: ReactNode;
} ) {
  const {
    currentCategory 
  } = useCategory();

  if ( currentCategory !== 'todos' && currentCategory !== carpeta.category ) {
    return null;
  }

  return (
    <tr key={rowHref}>
      <td>
        <Link href={rowHref}>{carpeta.numero}</Link>
      </td>
      {children}
    </tr>
  );
}
