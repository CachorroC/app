'use client';
import { useSearch } from '#@/app/context/search-context';
import { useCategory } from '#@/app/context/main-context';
import { JSX } from 'react';
import { LinkCard } from './link';
import { Route } from 'next';
import { MonCarpeta } from '#@/lib/types/carpetas';

export function SearchOutputList(
  {
    carpetas
  }: {carpetas: MonCarpeta[]}
) {
  const rows: JSX.Element[] = [];

  const {
    search
  } = useSearch();

  const {
    category
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

      if ( category === 'todos' || category === proceso.category ) {
        rows.push(
          <LinkCard
            path={`/Carpeta/${
              proceso.numero
            }` as Route}
            carpeta={proceso}
            key={proceso._id}
          />,
        );
      }
    }
  );

  return <> {rows}</>;
}
