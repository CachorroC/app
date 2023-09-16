'use client';

import { useCategory } from '#@/app/context/main-context';
import { MonCarpeta } from '#@/lib/types/carpetas';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, Suspense, useState } from 'react';
import { Loader } from '../Loader';
import card from './card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { NombreComponent } from '../nombre';
import buttons from 'components/Buttons/buttons.module.css';
import { section } from '../form/form.module.css';

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

  const {
    deudor
  } = carpeta;

  const {
    email, tel
  } = deudor;


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

  const {
    primerNombre, segundoNombre, primerApellido, segundoApellido
  }
    = carpeta.deudor;


  return (
    <div className={card.container}>
      <div className={card.card}>
        {errorLLaveProceso && (
          <div className={card.errorContainer}>
            <Link href={`/Carpetas/${ carpeta.numero }` as Route}>
              {'error con el numero de expediente'}
            </Link>
          </div>
        )}

        <Suspense fallback={<Loader />}>
          <NombreComponent key={carpeta.nombre} deudor={carpeta.deudor} />
        </Suspense>
        <section className={section}>
          <sub className={`${ typography.labelSmall } ${ card.sub }`}>
            {carpeta.numero}
          </sub>
          {children}
        </section>
        <div className={card.links}>
          <Link
            className={`${ card.link } ${ isActive && card.isActive }`}
            href={href as Route}
          >
            <span className={`${ card.icon } material-symbols-outlined`}>
              file_open
            </span>
            <span className={card.tooltiptext}>
              {'Actuaciones del proceso'}
            </span>
          </Link>
          <Link
            className={`${ card.link } ${ isActive && card.isActive }`}
            href={`/Procesos/${ carpeta.llaveProceso }/Editar`}
          >
            <span className={`material-symbols-outlined ${ card.icon }`}>
              folder_shared
            </span>
            <span className={card.tooltiptext}>{'Perfil del Demandado'}</span>
          </Link>
          <Link
            className={`${ card.link } ${ isActive && card.isActive }`}
            href={`/Procesos/${ carpeta.llaveProceso }` as Route}
          >
            <span className={`material-symbols-outlined ${ card.icon }`}>
              badge
            </span>
            <span className={card.tooltiptext}>Procesos</span>
          </Link>
          <Link
            className={`${ card.link } ${ isActive && card.isActive }`}
            href={`/Notas/${ carpeta.llaveProceso }`}
          >
            <span className={`material-symbols-outlined ${ card.icon }`}>
              add
            </span>
            <span className={card.tooltiptext}>{' Agregar nota'}</span>
          </Link>
          {email && (
            <Link
              className={`${ card.link } ${ isActive && card.isActive }`}
              href={email as Route}
            >
              <span className={`material-symbols-outlined ${ card.icon }`}>
                mail
              </span>
              <span className={card.tooltiptext}>{'Correo Electrónico'}</span>
            </Link>
          )}
          {tel.celular && (
            <Link
              key={tel.celular}
              className={card.link}
              href={`tel:${ tel.celular }`}
            >
              <span className={`material-symbols-outlined ${ card.icon }`}>
                phone_iphone
              </span>
              <span className={card.tooltiptext}>{tel.celular.toString()}</span>
            </Link>
          )}
          {tel.fijo && (
            <Link key={tel.fijo} className={card.link} href={`tel:${ tel.fijo }`}>
              <span className={`material-symbols-outlined ${ card.icon }`}>
                call
              </span>
              <span className={card.tooltiptext}>{tel.fijo.toString()}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );

};
