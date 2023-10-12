'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCategory } from '#@/app/context/main-context';
import { MonCarpeta } from '#@/lib/types/carpetas';
import searchbar from 'components/layout/search/searchbar.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { fixFechas } from '#@/lib/project/helper';
import { useSearch } from '#@/app/context/search-context';

export const LinkCard = (
  {
    path,
    carpeta,
  }: {
  path: string;
  carpeta: MonCarpeta;
}
) => {
  let content;

  const {
    search
  } = useSearch();

  const {
    deudor, fecha, llaveProceso, numero, nombre
  } = carpeta;


  const pathname = usePathname();

  const {
    category
  } = useCategory();

  if ( category !== 'todos' ) {
    if ( category !== carpeta.category ) {
      return null;
    }
  }

  const isActive
    = pathname === `${ path }/${ llaveProceso }`
    || pathname === `${ path }/${ carpeta.numero }`;

  const isSearch
    = carpeta.nombre.toLowerCase()
      .indexOf(
        search.toLowerCase()
      ) === -1;

  if ( !carpeta.idProcesos || carpeta.idProcesos.length === 0 ) {
    content = (
      <Link
        key={carpeta._id}
        href={`${ path }/${ numero }`}
        className={searchbar.container}
      >
        <div className={isActive
          ? searchbar.isActive
          : searchbar.notActive}>
          <sup className={`${ !isSearch && searchbar.sub }`}>
            {`# ${ numero }`}
          </sup>
          <h4
            key={deudor.cedula}
            className={`${ typography.titleMedium } ${ searchbar.title }`}
          >
            {nombre}
          </h4>

          {fecha && (
            <sub className={searchbar.date}>{fixFechas(
              fecha.toString()
            )}</sub>
          )}
        </div>
      </Link>
    );
  } else {
    content = carpeta.idProcesos.map(
      (
        idProceso
      ) => {
        return (
          <Link
            key={idProceso}
            href={`${ path }/${ numero }`}
            className={searchbar.container}
          >
            <div className={isActive
              ? searchbar.isActive
              : searchbar.notActive}>
              <sup className={`${ !isSearch && searchbar.sub }`}>
                {carpeta.numero}
              </sup>
              <h4
                key={deudor.cedula}
                className={`${ typography.titleMedium } ${ searchbar.title }`}
              >
                {nombre}
              </h4>

              {fecha && (
                <sub className={searchbar.date}>
                  {fixFechas(
                    fecha.toString()
                  )}
                </sub>
              )}
            </div>
          </Link>
        );
      }
    );
  }

  return <>{content}</>;
};
