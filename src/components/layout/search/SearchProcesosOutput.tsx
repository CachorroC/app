'use client';
import { useSearch } from '#@/app/context/search-context';
import { JSX } from 'react';
import { LinkCard } from './link';
import { Route } from 'next';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { useCategory } from '#@/app/context/category-context';

export function SearchOutputList(
  {
    carpetas 
  }: { carpetas: MonCarpeta[] } 
) {
      const rows: JSX.Element[] = [];

      const {
        search 
      } = useSearch();

      const {
        currentCategory 
      } = useCategory();

      carpetas.forEach(
        (
          proceso 
        ) => {
                  if ( proceso.nombre.toLowerCase()
                        .indexOf(
                          search.toLowerCase() 
                        ) === -1 ) {
                    return;
                  }

                  if ( currentCategory === 'todos' || currentCategory === proceso.category ) {
                    rows.push(
                      <LinkCard
                        path={`/Carpeta/${ proceso.numero }` as Route}
                        carpeta={proceso}
                        key={proceso._id}
                      />,
                    );
                  }
        } 
      );

      return <> {rows}</>;
}
