'use client';
import { LinkCard } from './link';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { useCategory, useSearch } from '#@/app/context/main-context';
import { arraySorter } from '#@/lib/project/helper';

export default function SearchOutputList(
  {
    path,
    fechas,
  }: {
  path: string;
  fechas: MonCarpeta[];
}
) {
  const {
    search
  } = useSearch();

  const {
    category
  }= useCategory();

  const rows: any[] = [];

  const byNombre = arraySorter(
    fechas, 'nombre'
  );
  byNombre.forEach(
    (
      proceso, index, array
    ) => {

      if ( proceso.nombre.toLowerCase()
            .indexOf(
              search.toLowerCase()
            ) === -1 ) {
        return;
      }

      if ( category === 'todos' || category === proceso.category ) {
        rows.push(
          <LinkCard path={path} carpeta={proceso} key={proceso._id} />
        );
      }
    }
  );

  return <>{rows}</>;
}
