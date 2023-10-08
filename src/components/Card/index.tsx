'use client';

import { MonCarpeta } from '#@/lib/types/carpetas';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import styles from './card.module.css';
import typography from '#@/styles/fonts/typography.module.scss';

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

  const llaveLength = carpeta.llaveProceso?.length;

  const errorLLaveProceso = llaveLength
    ? llaveLength < 23
    : true;

  const pathname = usePathname();

  const href = carpeta.idProcesos
    ? `${ path }/${ carpeta.llaveProceso }/${ carpeta.idProcesos[ 0 ] }`
    : `${ path }/${ carpeta.llaveProceso }`;

  const isActive
    = pathname === href
    || pathname === `${ path }/${ carpeta.llaveProceso }/${ carpeta.idProcesos
      ? carpeta.idProcesos[ 0 ]
      : 0 }`
    || pathname === `${ path }/${ carpeta.llaveProceso }`;



  return (
    <div className={styles.container} >
      <div
        className={`${ styles.card } ${
          errorLLaveProceso && styles.errorContainer
        }`}
      >

        <section className={styles.section}>
          <div className={styles.title}>
            <h4 className={typography.displaySmall}>{ carpeta.nombre}</h4>
            <sub className={`${ typography.labelSmall } ${ styles.sub }`}>
              {carpeta.numero}
            </sub>
          </div>
          {children}
        </section>

        { carpeta.idProcesos && carpeta.idProcesos.map(
          (
            idProceso
          ) => {
            return (
              <Link key={idProceso}
                className={`${ styles.link } ${ isActive && styles.isActive }`}
                href={`/Carpetas/Expediente/${ carpeta.llaveProceso }/${ idProceso }` as Route}
              >
                <span className={`${ styles.icon } material-symbols-outlined`}>
              update
                </span>
                <span className={styles.tooltiptext}>
                  {'Actuaciones del proceso'}
                </span>
              </Link>
            );
          }
        )}
        <div className={styles.links}>
          <Link
            className={`${ styles.link } ${ isActive && styles.isActive }`}
            href={href as Route}
          >
            <span className={`${ styles.icon } material-symbols-outlined`}>
              file_open
            </span>
            <span className={styles.tooltiptext}>
              {'Actuaciones del proceso'}
            </span>
          </Link>
          <Link
            className={`${ styles.link } ${ isActive && styles.isActive }`}
            href={`/Carpetas/Expediente/${ carpeta.llaveProceso }/Editar` as Route}
          >
            <span className={`material-symbols-outlined ${ styles.icon }`}>
              folder_shared
            </span>
            <span className={styles.tooltiptext}>{'Perfil del Demandado'}</span>
          </Link>
          <Link
            className={`${ styles.link } ${ isActive && styles.isActive }`}
            href={`/Carpetas/Expediente/${ carpeta.llaveProceso }` as Route}
          >
            <span className={`material-symbols-outlined ${ styles.icon }`}>
              badge
            </span>
            <span className={styles.tooltiptext}>Procesos</span>
          </Link>
          <Link
            className={`${ styles.link } ${ isActive && styles.isActive }`}
            href={`/Notas/Nueva?llaveProceso=${ carpeta.llaveProceso }` as Route}
          >
            <span className={`material-symbols-outlined ${ styles.icon }`}>
              add
            </span>
            <span className={styles.tooltiptext}>{' Agregar nota'}</span>
          </Link>
          {errorLLaveProceso && (
            <Link
              href={`/Carpetas/numero/${ carpeta.numero }` as Route}
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
