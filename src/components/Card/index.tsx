'use client';

import { MonCarpeta } from '#@/lib/types/carpetas';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import styles from './card.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import type { Route } from 'next';
import { useCategory } from '#@/app/context/main-context';
import { useSearch } from '#@/app/context/search-context';
import { fixFechas } from '#@/lib/project/helper';
import { sectionColumn } from '../form/form.module.css';
import { buttonActiveCategory, buttonPassiveCategory } from '../Buttons/buttons.module.css';

export const Card = (
  {
    path,
    carpeta,
    children,
  }: {
  path: string;
  carpeta: MonCarpeta;
  children: ReactNode;
}
) => {
  let contentIdProcesos;

  const llaveLength = carpeta.llaveProceso?.length;

  const errorLLaveProceso = llaveLength
    ? llaveLength < 23
    : true;

  const pathname = usePathname();

  const {
    llaveProceso, _id, idProcesos, nombre, numero, deudor, fecha
  } = carpeta;

  const {
    category
  } = useCategory();

  const {
    search
  } = useSearch();

  if ( category !== 'todos' ) {
    if ( category !== carpeta.category ) {
      return null;
    }
  }


  const isSearch
    = nombre.toLowerCase()
      .indexOf(
        search.toLowerCase()
      ) === -1;


  if ( !idProcesos || idProcesos.length === 0 ) {


    contentIdProcesos = (
      <Link
        key={_id}
        href={`${ path }/${ numero }` as Route}
        className={ styles.link}
      >
        <div className={sectionColumn}>
          <sup className={`${ !isSearch && styles.sub }`}>
            {`# ${ numero }`}
          </sup>
          <h4
            key={deudor.cedula}
            className={`${ typography.titleMedium } ${ styles.title }`}
          >
            {nombre}
          </h4>

          {fecha && (
            <sub className={styles.date}>{fixFechas(
              fecha.toString()
            )}</sub>
          )}
        </div>
      </Link>
    );
  } else {
    contentIdProcesos = idProcesos.map(
      (
        idProceso
      ) => {

        const isActive = pathname === `${ path }/${ numero }/ultimasActuaciones/${ idProceso }`;
        return (
          <Link
            key={idProceso}
            href={`${ path }/${ numero }/ultimasActuaciones/${ idProceso }`as Route}
            className={styles.link}
          >
            <div className={isActive
              ? buttonActiveCategory
              : buttonPassiveCategory}>
              <sup className={`${ !isSearch && styles.sub }`}>
                {`# ${ numero }`}
              </sup>
              <h4
                key={deudor.cedula}
                className={`${ typography.titleMedium } ${ styles.title }`}
              >
                {nombre}
              </h4>

              {fecha && (
                <sub className={styles.date}>
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

  return (
    <div className={styles.container}>
      <div
        className={`${ styles.card } ${
          errorLLaveProceso && styles.errorContainer
        }`}
      >
        <section className={sectionColumn}>
          <div className={styles.title}>
            <h4 className={typography.headlineSmall}>{carpeta.nombre}</h4>
            <Link className={ `${ typography.labelSmall } ${ styles.link }` } href={`/Carpeta/${ numero }` as Route}>
              <span className={typography.labelLarge}>{`# ${ numero }`}</span>
              <span className={`material-symbols-outlined ${ styles.icon }`}>folder</span>
            </Link>
          </div>
          {children}
        </section>

        {contentIdProcesos}
        <div className={styles.links}>

          <Link
            className={styles.link }
            href={
              `/Notas/Nueva${
                llaveProceso
                  ? `?llaveProceso=${ llaveProceso }`
                  : ''
              }` as Route
            }
          >
            <span className={`material-symbols-outlined ${ styles.icon }`}>
              add
            </span>
            <span className={styles.tooltiptext}>{' Agregar nota'}</span>
          </Link>
          {errorLLaveProceso && (
            <Link
              href={`/Carpeta/${ numero }/Editar` as Route }
              className={styles.link}
            >
              {'error con el numero de expediente'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
