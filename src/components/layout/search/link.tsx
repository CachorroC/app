'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCategory } from '#@/app/context/main-context';
import { MonCarpeta } from '#@/lib/types/carpetas';
import searchbar from 'components/layout/search/searchbar.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { fixFechas } from '#@/lib/project/helper';
import type { Route } from 'next';

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
    deudor, fecha, numero, nombre
  } = carpeta;


  const {
    category
  } = useCategory();

  const params = useParams();

  const isActive =  numero === Number(
    params.numero
  );

  if ( category !== 'todos' ) {
    if ( category !== carpeta.category ) {
      return null;
    }
  }

  const stringifiedFecha = fixFechas(
    fecha
  );

  if ( !carpeta.idProcesos || carpeta.idProcesos.length === 0 ) {
    content = (
      <Link
        key={carpeta._id}
        href={`${ path }/${ numero }` as Route}
        className={isActive
          ? searchbar.linkIsActive
          : searchbar.linkNotActive}
      >
        <sup className={searchbar.sub }>{`# ${ numero }`}</sup>
        <h4
          key={deudor.cedula}
          className={`${ typography.titleMedium } ${ searchbar.title }`}
        >
          {nombre}
        </h4>

        {fecha && (
          <sub className={searchbar.date}>{stringifiedFecha}</sub>
        )}
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
            href={`${ path }/${ numero }` as Route}
            className={isActive
              ? searchbar.linkIsActive
              : searchbar.linkNotActive}
          >

            <sup className={searchbar.sub }>
              {`# ${ numero }`}
            </sup>
            <h4
              key={deudor.cedula}
              className={`${ typography.titleMedium } ${ searchbar.title }`}
            >
              {nombre}
            </h4>

            {fecha && (
              <sub className={searchbar.date}>
                {stringifiedFecha}
              </sub>
            )}

          </Link>
        );
      }
    );
  }

  return <>{content}</>;
};
