'use client';
import { useSearch } from '#@/app/Context/search-context';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { ReactNode } from 'react';

export const ClientCardRow = (
  {
    carpeta,
    children,
  }: {
    carpeta: IntCarpeta;
    children: ReactNode;
  }
) => {

          const {
            search
          } = useSearch();

          if ( search !== '' && carpeta.nombre.toLowerCase()
                .search(
                  search.toLowerCase()
                ) === -1 ) {
            return null;
          }

          return (
            <tr>
              {children}
            </tr>
          );
};