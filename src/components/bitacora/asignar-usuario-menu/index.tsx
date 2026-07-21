'use client';

import { useRef } from 'react';
import { UsuarioDisponibleDTO } from '#@/lib/bitacora/tipos';
import styles from './asignar-usuario-menu.module.css';

export type AsignarUsuarioMenuProps = {
  disponibles: UsuarioDisponibleDTO[];
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onAsignar  : ( userId: string ) => void;
};

/** Menú desplegable de personal activo aún no asignado — <details> nativo: teclado y cierre-al-elegir sin estado propio. */
export const AsignarUsuarioMenu = ( {
  disponibles, onAsignar
}: AsignarUsuarioMenuProps ) => {
  const detallesRef = useRef<HTMLDetailsElement>( null );

  return (
    <details ref={detallesRef} className={styles.menu}>
      <summary className={styles.disparador}>
        <span className="material-symbols-rounded" aria-hidden="true">person_add</span>
        Asignar usuario
      </summary>
      <ul className={styles.lista}>
        {disponibles.length === 0
          ? <li className={styles.vacio}>Sin personal disponible</li>
          : disponibles.map( ( u ) => {
              return (
                <li key={u.id}>
                  <button
                    type="button"
                    className={styles.opcion}
                    onClick={() => {
                      onAsignar( u.id );

                      if ( detallesRef.current ) {
                        detallesRef.current.open = false;
                      }
                    }}
                  >
                    {u.nombre}
                  </button>
                </li>
              );
            } )}
      </ul>
    </details>
  );
};
