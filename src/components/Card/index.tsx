'use client';

import { MonCarpeta } from '#@/lib/types/carpetas';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import { Loader } from '../Loader';
import styles from './card.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { NombreComponent } from '../nombre';

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
  const llaveLength = carpeta.llaveProceso.length;

  const errorLLaveProceso = llaveLength < 23;

  const pathname = usePathname();

  const href = carpeta.idProceso
    ? `${ path }/${ carpeta.llaveProceso }/${ carpeta.idProceso }`
    : `${ path }/${ carpeta.llaveProceso }`;

  const isActive
    = pathname === href
    || pathname === `${ path }/${ carpeta.llaveProceso }/${ carpeta.idProceso }`
    || pathname === `${ path }/${ carpeta.llaveProceso }`;


  return (
    <div className={styles.container}>
      <div
        className={`${ styles.card } ${
          errorLLaveProceso && styles.errorContainer
        }`}
      >
        <div className={styles.section}>
          <div className={styles.title}>
            <Suspense fallback={<Loader />}>
              <NombreComponent
                key={carpeta.nombre}
                deudor={carpeta.deudor}
              />
            </Suspense>
            <sub className={`${ typography.labelSmall } ${ styles.sub }`}>
              {carpeta.numero}
            </sub>
          </div>

          {children}
        </div>

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
            href={`/Procesos/${ carpeta.llaveProceso }/Editar`}
          >
            <span className={`material-symbols-outlined ${ styles.icon }`}>
              folder_shared
            </span>
            <span className={styles.tooltiptext}>{'Perfil del Demandado'}</span>
          </Link>
          <Link
            className={`${ styles.link } ${ isActive && styles.isActive }`}
            href={`/Procesos/${ carpeta.llaveProceso }` as Route}
          >
            <span className={`material-symbols-outlined ${ styles.icon }`}>
              badge
            </span>
            <span className={styles.tooltiptext}>Procesos</span>
          </Link>
          <Link
            className={`${ styles.link } ${ isActive && styles.isActive }`}
            href={'/Notas/Nueva'}
          >
            <span className={`material-symbols-outlined ${ styles.icon }`}>
              add
            </span>
            <span className={styles.tooltiptext}>{' Agregar nota'}</span>
          </Link>
          {errorLLaveProceso && (
            <Link
              href={`/Carpetas/${ carpeta.numero }` as Route}
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
