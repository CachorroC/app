'use client';

import { Checkbox } from '#@/components/ds/checkbox';
import { BloqueDTO } from '#@/lib/bitacora/tipos';
import styles from './bloque-contenido.module.css';

export type BloqueContenidoProps = {
  bloque      : BloqueDTO;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onAlternar? : ( itemId: string ) => void;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onConvertir?: ( itemId: string ) => void;
};

/**
 * Renderiza una de tres formas de un bloque de nota: párrafo, lista con
 * viñetas o verificación (checklist). Cada fila de checklist muestra un
 * checkbox, el texto y una acción "Convertir en tarea" al pasar el cursor
 * o enfocar.
 */
export const BloqueContenido = ( {
  bloque, onAlternar, onConvertir 
}: BloqueContenidoProps ) => {
  if ( bloque.tipo === 'PARRAFO' ) {
    return <p className={styles.parrafo}>{bloque.texto}</p>;
  }

  const esCheck = bloque.tipo === 'VERIFICACION';

  return (
    <div className={styles.lista}>
      {bloque.titulo && <div className={styles.tituloBloque}>{bloque.titulo}</div>}
      {bloque.items.map( ( item ) => {
        const promovida = Boolean( item.tareaId );

        return (
          <div key={item.id} className={styles.fila}>
            {esCheck
              ? (
                  <span className={styles.casilla}>
                    <Checkbox
                      checked={item.completado}
                      ariaLabel={item.texto}
                      onChange={() => {
                        onAlternar?.( item.id );
                      }}
                    />
                  </span>
                )
              : <span className={styles.punto} aria-hidden="true" />}
            <span className={`${ styles.texto } ${ item.completado
              ? styles.completado
              : '' }`}
            >
              {item.texto}
              {promovida && (
                <span title="Ya convertida en tarea" className={styles.promovida}>
                  <span className="material-symbols-rounded" aria-hidden="true">assignment_turned_in</span>
                </span>
              )}
            </span>
            {esCheck && !promovida && (
              <button
                type="button"
                className={styles.convertir}
                onClick={() => {
                  onConvertir?.( item.id );
                }}
              >
                <span className="material-symbols-rounded" aria-hidden="true">add_task</span>
                Convertir en tarea
              </button>
            )}
          </div>
        );
      } )}
    </div>
  );
};
