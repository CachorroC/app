'use client';
import { useSearch } from '#@/app/Context/search-context';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export function ClientCardRow<H extends string>(
  {
    carpeta,
    rowHref,
    children,
  }: {
    carpeta: IntCarpeta;
    rowHref: Route<H>;
    children: ReactNode;
  }
) {

      const {
        search
      } = useSearch();

      const router = useRouter();

      if ( search !== '' && carpeta.nombre.toLowerCase()
            .search(
              search.toLowerCase()
            ) === -1 ) {
        return null;
      }

      return (
        <tr onClick={ (
          e
        ) => {
                  e.preventDefault();
                  return router.push(
                    rowHref
                  );
        }}>

          { children }

        </tr>
      );
}