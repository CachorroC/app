'use client';
import { useCarpetaSort } from '#@/app/context/carpetas-sort-context';
import { useSearch } from '#@/app/context/search-context';
import { useCategory } from '#@/app/context/main-context';
import { JSX } from 'react';
import { LinkCard } from './link';


export default function SearchOutputList(
  {
    path,
  }: {
  path: string;
}
) {
  const rows: JSX.Element[] = [];


  const carpetasReduced = useCarpetaSort();

  const {
    search
  } = useSearch();

  const {
    category
  } = useCategory();


  carpetasReduced.forEach(
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
            path={path}
            carpeta={proceso}
            key={proceso._id}
          />
        );
      }
    }
  );

  return <>
    {rows}</>;
}
