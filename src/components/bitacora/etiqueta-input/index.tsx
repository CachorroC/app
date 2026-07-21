'use client';

import { KeyboardEvent, useState } from 'react';
import { ChipEtiqueta } from '#@/components/notas-tareas/chip-etiqueta';
import { EtiquetaDTO } from '#@/lib/compartido/tipos';
import styles from './etiqueta-input.module.css';

export type EtiquetaInputProps = {
  etiquetas: EtiquetaDTO[];
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onCrear  : ( nombre: string ) => void;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onQuitar : ( etiquetaId: string ) => void;
};

/**
 * Fila de chips de etiquetas con creación en línea: Enter con texto crea
 * una etiqueta nueva (color asignado por el servidor); Backspace con el
 * campo vacío quita la última etiqueta.
 */
export const EtiquetaInput = ( {
  etiquetas, disabled = false, onCrear, onQuitar
}: EtiquetaInputProps ) => {
  const [
    valor,
    setValor
  ] = useState( '' );

  const manejarTecla = ( e: KeyboardEvent<HTMLInputElement> ) => {
    if ( e.key === 'Enter' ) {
      const nombre = valor.trim();

      if ( nombre ) {
        e.preventDefault();
        onCrear( nombre );
        setValor( '' );
      }

      return;
    }

    if ( e.key === 'Backspace' && valor === '' && etiquetas.length > 0 ) {
      onQuitar( etiquetas[ etiquetas.length - 1 ].id );
    }
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.fila}>
        {etiquetas.map( ( e ) => {
          return (
            <ChipEtiqueta
              key={e.id}
              texto={e.nombre}
              color={e.color}
              onRemove={disabled
                ? undefined
                : () => {
                    onQuitar( e.id );
                  }}
            />
          );
        } )}
        {!disabled && (
          <input
            type="text"
            value={valor}
            className={styles.input}
            aria-label="Crear o buscar etiqueta"
            placeholder={etiquetas.length > 0
              ? 'Agregar…'
              : 'Escriba y presione Enter…'}
            onChange={( e ) => {
              setValor( e.target.value );
            }}
            onKeyDown={manejarTecla}
          />
        )}
      </div>
      {!disabled && <p className={styles.ayuda}>Enter crea una etiqueta nueva con color propio.</p>}
    </div>
  );
};
