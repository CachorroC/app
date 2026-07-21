'use client';

import { ChangeEvent, useState } from 'react';
import { useCombobox } from '#@/app/Hooks/useCombobox';
import { ComboboxOptions } from '#@/components/ui/combobox/combobox-options';
import { CasoResumenDTO } from '#@/lib/compartido/tipos';
import styles from './carpeta-combobox.module.css';

export type CarpetaOpcion = {
  id    : string;
  numero: number;
  nombre: string;
};

export type CarpetaComboboxProps = {
  caso         : CasoResumenDTO | null;
  opciones     : CarpetaOpcion[];
  disabled?    : boolean;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onSeleccionar: ( caso: CasoResumenDTO | null ) => void;
};

export const CarpetaCombobox = ( {
  caso, opciones, disabled = false, onSeleccionar
}: CarpetaComboboxProps ) => {
  const [
    inputValue,
    setInputValue
  ] = useState( '' );

  const opcionesCombobox = opciones.map( ( o ) => {
    return {
      id   : o.id,
      label: `Carpeta ${ o.numero } · ${ o.nombre }`
    };
  } );

  const combobox = useCombobox( {
    options : opcionesCombobox,
    inputValue,
    onSelect: ( opcion ) => {
      const encontrada = opciones.find( ( o ) => {
        return o.id === opcion.id;
      } );

      if ( encontrada ) {
        onSeleccionar( {
          id        : encontrada.id,
          referencia: `Carpeta ${ encontrada.numero }`,
          nombre    : encontrada.nombre,
        } );
      }

      setInputValue( '' );
    },
  } );

  if ( caso && !combobox.isOpen ) {
    return (
      <div className={styles.seleccionada}>
        <span className="material-symbols-rounded" aria-hidden="true">folder</span>
        <span className={styles.numero}>{caso.referencia.toUpperCase()}</span>
        <span className={styles.nombre}>{caso.nombre}</span>
        {!disabled && (
          <button
            type="button"
            className={styles.quitar}
            aria-label="Quitar carpeta"
            onClick={() => {
              onSeleccionar( null );
            }}
          >
            <span className="material-symbols-rounded" aria-hidden="true">close</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.wrap} ref={combobox.wrapperRef}>
      <div className={`${ styles.buscar } ${ combobox.isOpen
        ? styles.activo
        : '' }`}
      >
        <span className="material-symbols-rounded" aria-hidden="true">search</span>
        <input
          type="text"
          value={inputValue}
          disabled={disabled}
          placeholder="Buscar por número o nombre…"
          aria-label="Buscar carpeta por número o nombre"
          className={styles.input}
          onFocus={() => {
            if ( !disabled ) {
              combobox.open();
            }
          }}
          onChange={( e: ChangeEvent<HTMLInputElement> ) => {
            setInputValue( e.target.value );
            combobox.open();
          }}
          onKeyDown={combobox.handleInputKeyDown}
          onBlur={combobox.handleInputBlur}
        />
      </div>
      <ComboboxOptions
        isOpen={combobox.isOpen}
        options={combobox.filteredOptions}
        highlightedIndex={combobox.highlightedIndex}
        panelStyle={combobox.panelStyle}
        getOptionProps={combobox.getOptionProps}
      />
    </div>
  );
};
