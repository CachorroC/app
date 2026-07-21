'use client';

import { KeyboardEvent, useEffect, useRef } from 'react';
import { Checkbox } from '#@/components/ds/checkbox';
import { BloqueDTO } from '#@/lib/bitacora/tipos';
import styles from './bloque-contenido.module.css';

export type BloqueContenidoProps = {
  bloque              : BloqueDTO;
  disabled?           : boolean;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onAlternar?         : ( itemId: string ) => void;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onConvertir?        : ( itemId: string ) => void;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onTextoBloqueLocal? : ( texto: string ) => void;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onTextoBloqueCommit?: ( texto: string ) => void;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onTextoItemLocal?   : ( itemId: string, texto: string ) => void;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onTextoItemCommit?  : ( itemId: string, texto: string ) => void;
  onAgregarItem?      : () => void;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onEliminarItem?     : ( itemId: string ) => void;
};

function autoResize( el: HTMLTextAreaElement | null ) {
  if ( !el ) {
    return;
  }

  el.style.height = 'auto';
  el.style.height = `${ Math.max(
    46, el.scrollHeight
  ) }px`;
}

/**
 * Renderiza y edita una de tres formas de un bloque de nota: párrafo
 * (textarea auto-crecible), lista con viñetas o verificación (checklist).
 * Enter en un ítem crea el siguiente; Backspace en un ítem vacío lo quita
 * y enfoca el anterior — el enfoque se restaura por id, no por índice,
 * porque el índice cambia al insertar/quitar.
 */
export const BloqueContenido = ( {
  bloque,
  disabled = false,
  onAlternar,
  onConvertir,
  onTextoBloqueLocal,
  onTextoBloqueCommit,
  onTextoItemLocal,
  onTextoItemCommit,
  onAgregarItem,
  onEliminarItem,
}: BloqueContenidoProps ) => {
  const parrafoRef = useRef<HTMLTextAreaElement>( null );
  const itemRefs = useRef<Record<string, HTMLInputElement | null>>( {} );
  const enfocarPendiente = useRef<string | null>( null );

  useEffect(
    () => {
      autoResize( parrafoRef.current );
    }, []
  );

  useEffect( () => {
    const id = enfocarPendiente.current;

    if ( id && itemRefs.current[ id ] ) {
      itemRefs.current[ id ]?.focus();
      enfocarPendiente.current = null;
    }
  } );

  if ( bloque.tipo === 'PARRAFO' ) {
    return (
      <textarea
        ref={parrafoRef}
        className={styles.parrafo}
        value={bloque.texto}
        disabled={disabled}
        aria-label="Texto del párrafo"
        onChange={( e ) => {
          onTextoBloqueLocal?.( e.target.value );
          autoResize( e.target );
        }}
        onBlur={( e ) => {
          onTextoBloqueCommit?.( e.target.value );
        }}
      />
    );
  }

  const esCheck = bloque.tipo === 'VERIFICACION';

  const manejarTecla = (
    e: KeyboardEvent<HTMLInputElement>, indice: number
  ) => {
    if ( disabled ) {
      return;
    }

    const item = bloque.items[ indice ];

    if ( e.key === 'Enter' ) {
      e.preventDefault();
      onAgregarItem?.();

      return;
    }

    if ( e.key === 'Backspace' && item.texto === '' && bloque.items.length > 1 ) {
      e.preventDefault();
      const anterior = bloque.items[ indice - 1 ] ?? bloque.items[ indice + 1 ];

      enfocarPendiente.current = anterior?.id ?? null;
      onEliminarItem?.( item.id );
    }
  };

  return (
    <div className={styles.lista}>
      {bloque.titulo && <div className={styles.tituloBloque}>{bloque.titulo}</div>}
      {bloque.items.map( (
        item, indice
      ) => {
        const promovida = Boolean( item.tareaId );

        return (
          <div key={item.id} className={styles.fila}>
            {esCheck
              ? (
                  <span className={styles.casilla}>
                    <Checkbox
                      checked={item.completado}
                      disabled={disabled}
                      ariaLabel={`Marcar ${ item.texto || 'ítem' }`}
                      onChange={() => {
                        onAlternar?.( item.id );
                      }}
                    />
                  </span>
                )
              : <span className={styles.punto} aria-hidden="true" />}
            <input
              ref={( el ) => {
                itemRefs.current[ item.id ] = el;
              }}
              type="text"
              className={`${ styles.texto } ${ item.completado
                ? styles.completado
                : '' }`}
              value={item.texto}
              disabled={disabled}
              placeholder={esCheck
                ? 'Nuevo ítem de verificación…'
                : 'Nuevo elemento…'}
              onChange={( e ) => {
                onTextoItemLocal?.(
                  item.id, e.target.value
                );
              }}
              onBlur={( e ) => {
                onTextoItemCommit?.(
                  item.id, e.target.value
                );
              }}
              onKeyDown={( e ) => {
                manejarTecla(
                  e, indice
                );
              }}
            />
            {promovida && (
              <span title="Ya convertida en tarea" className={styles.promovida}>
                <span className="material-symbols-rounded" aria-hidden="true">assignment_turned_in</span>
              </span>
            )}
            {esCheck && !promovida && !disabled && (
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
      {!disabled && (
        <button type="button" className={styles.agregarItem} onClick={onAgregarItem}>
          <span className="material-symbols-rounded" aria-hidden="true">add</span>
          {esCheck
            ? 'Agregar ítem'
            : 'Agregar elemento'}
        </button>
      )}
    </div>
  );
};
