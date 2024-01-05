'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MonCarpeta } from '#@/lib/types/carpetas';
import searchbar from 'components/layout/search/searchbar.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import type { Route } from 'next';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { useNavigationContext } from '#@/app/context/navigation-context';

export function LinkCard<T extends string = string>(
  {
    path,
    carpeta,
  }: {
    path: Route<T> | URL;
    carpeta: MonCarpeta;
  } 
) {
      let content;

      const {
        fecha, numero, nombre 
      } = carpeta;

      const {
        setIsNavOpen 
      } = useNavigationContext();

      const params = useParams();

      const isActive = numero === Number(
        params.numero 
      );

      function handleClickNavigation() {
            setIsNavOpen(
              false 
            );
      }

      const stringifiedFecha = OutputDateHelper(
        fecha 
      );

      if ( !carpeta.idProcesos || carpeta.idProcesos.length === 0 ) {
        content = (
          <td key={carpeta.numero}>
            <Link
              key={carpeta.numero}
              onClick={handleClickNavigation}
              href={path as Route}
              className={
                isActive
                  ? searchbar.linkIsActive
                  : searchbar.linkNotActive
              }
            >
              <sup className={searchbar.sub}>{`# ${ numero }`}</sup>
              <h4
                key={carpeta.id}
                className={`${ typography.titleMedium } ${ searchbar.title }`}
              >
                {nombre}
              </h4>

              {fecha && <sub className={searchbar.date}>{stringifiedFecha}</sub>}
            </Link>
          </td>
        );
      } else {
        content = carpeta.idProcesos.map(
          (
            idProceso 
          ) => {
                    return (
                      <td key={idProceso}>
                        <Link
                          onClick={handleClickNavigation}
                          href={`/Carpeta/${ numero }/ultimasActuaciones/${ idProceso }` as Route}
                          className={
                            isActive
                              ? searchbar.linkIsActive
                              : searchbar.linkNotActive
                          }
                        >
                          <sup className={searchbar.sub}>{`# ${ numero }`}</sup>
                          <h4
                            key={idProceso}
                            className={`${ typography.titleMedium } ${ searchbar.title }`}
                          >
                            {nombre}
                          </h4>

                          {fecha && <sub className={searchbar.date}>{stringifiedFecha}</sub>}
                        </Link>
                      </td>
                    );
          } 
        );
      }

      return <tr>{content}</tr>;
}
