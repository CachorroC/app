'use client';
import { useSearch } from '#@/app/Context/search-context';
import { JSX } from 'react';
import { LinkCard } from './link';
import { Route } from 'next';
import { useCategory } from '#@/app/Context/category-context';
import { useCarpetaSort } from '#@/app/Context/carpetas-sort-context';

export function SearchOutputList() {
      const {
        carpetas
      } = useCarpetaSort();

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
                        key={proceso.numero}
                      />,
                    );
                  }
        }
      );

      return (
        <table>
          <thead>
            <tr>
              <td>nombre</td>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
}
