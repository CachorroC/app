'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Route } from 'next';
import styles from './selector-vista.module.css';

type Vista = 'tarjetas' | 'lista';

export type SelectorVistaProps = { vista: Vista };

export const SelectorVista = ( {
  vista 
}: SelectorVistaProps ) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const cambiar = ( siguiente: Vista ) => {
    const params = new URLSearchParams( searchParams.toString() );

    if ( siguiente === 'tarjetas' ) {
      params.delete( 'vista' );
    } else {
      params.set(
        'vista', siguiente 
      );
    }

    router.replace(
      `${ pathname }?${ params.toString() }` as Route, {
        scroll: false 
      } 
    );
  };

  return (
    <div className={styles.grupo}>
      <button
        type="button"
        aria-label="Ver como cuadrícula"
        aria-pressed={vista === 'tarjetas'}
        className={`${ styles.opcion } ${ vista === 'tarjetas'
          ? styles.activa
          : '' }`}
        onClick={() => {
          cambiar( 'tarjetas' );
        }}
      >
        <span className="material-symbols-rounded" aria-hidden="true">grid_view</span>
      </button>
      <button
        type="button"
        aria-label="Ver como lista"
        aria-pressed={vista === 'lista'}
        className={`${ styles.opcion } ${ vista === 'lista'
          ? styles.activa
          : '' }`}
        onClick={() => {
          cambiar( 'lista' );
        }}
      >
        <span className="material-symbols-rounded" aria-hidden="true">view_list</span>
      </button>
    </div>
  );
};
