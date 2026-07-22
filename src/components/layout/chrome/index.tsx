'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export const Chrome = ( {
  children
}: { children: ReactNode } ) => {
  const pathname = usePathname();

  if ( pathname?.startsWith( '/auth' ) ) {
    return null;
  }

  return children;
};
