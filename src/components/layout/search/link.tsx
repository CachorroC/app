'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import { useSearch, useCategory } from '#@/app/context/main-context';
import { MonCarpeta } from '#@/lib/types/carpetas';
import searchbar from 'components/layout/search/searchbar.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { fixFechas } from '#@/lib/project/helper';

export const LinkCard = (
  {
    path,
    carpeta,
  }: {
  path: string;
  carpeta: MonCarpeta;
} 
) => {
  const {
    search, setSearch 
  } = useSearch();

  const {
    deudor, fecha, llaveProceso, idProceso, _id 
  } = carpeta;

  const Nombre = carpeta.nombre;

  const pathname = usePathname();

  const {
    category, setCategory 
  } = useCategory();

  const procesosHref = carpeta.llaveProceso
    ? carpeta.idProceso
      ? `${ path }/${ carpeta.llaveProceso }/${ carpeta.idProceso }`
      : `${ path }/${ carpeta.llaveProceso }`
    : `/Carpetas/${ carpeta.numero }`;

  const isActive
    = pathname === procesosHref
    || pathname === `${ path }/${ llaveProceso }/${ idProceso }`
    || pathname === `${ path }/${ llaveProceso }`;

  const isSearch
    = carpeta.nombre.toLowerCase()
          .indexOf(
            search.toLowerCase() 
          ) === -1;

  if ( category !== 'todos' ) {
    if ( category !== carpeta.category ) {
      return null;
    }
  }

  return (
    <Link
      key={carpeta._id}
      href={procesosHref as Route}
      className={searchbar.container}
    >
      <div className={isActive
        ? searchbar.isActive
        : searchbar.notActive}>
        <sup className={`${ !isSearch && searchbar.sub }`}>{carpeta.numero}</sup>
        <h4
          key={deudor.cedula}
          className={`${ typography.titleMedium } ${ searchbar.title }`}
        >
          {Nombre}
        </h4>

        {fecha && <sub className={searchbar.date}>{fixFechas(
          fecha 
        )}</sub>}
      </div>
    </Link>
  );
};