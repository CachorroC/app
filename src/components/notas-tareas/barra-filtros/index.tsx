'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Route } from 'next';
import { useMediaQuery } from '#@/app/Hooks/useMediaQuery';
import { useDebounce } from '#@/app/Hooks/useDebounce';
import { Button } from '#@/components/ds/button';
import { TextField } from '#@/components/ds/text-field';
import styles from './barra-filtros.module.css';

export type CasoOpcion = { id: string; nombre: string };

export type EstadoOpcion = { valor: string; label: string };

export type BarraFiltrosProps = {
  casos               : CasoOpcion[];
  estados             : EstadoOpcion[];
  placeholder?        : string;
  mostrarAsignadasAMi?: boolean;
};

/**
 * BarraFiltros — compartida por /bitacora y /tareas. Sin estado propio de
 * verdad: cada cambio se escribe de inmediato en la URL (searchParams es la
 * única fuente de la verdad), salvo el texto de búsqueda que se debounce
 * 300ms antes de empujarse.
 */
export const BarraFiltros = ( {
  casos, estados, placeholder = 'Buscar…', mostrarAsignadasAMi = false
}: BarraFiltrosProps ) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const esMovil = useMediaQuery( '(max-width: 640px)' );

  const qUrl = searchParams.get( 'q' ) ?? '';
  const estadoUrl = searchParams.get( 'estado' );
  const estSel = estadoUrl
    ? estadoUrl.split( ',' )
        .filter( Boolean )
    : [];
  const caso = searchParams.get( 'caso' ) ?? 'todos';
  const asignadasAMi = searchParams.get( 'asignadasAMi' ) === '1';
  const desde = searchParams.get( 'desde' ) ?? '';
  const hasta = searchParams.get( 'hasta' ) ?? '';

  const [
    texto,
    setTexto 
  ] = useState( qUrl );
  const textoDebounced = useDebounce(
    texto, 300 
  );
  const [
    abierta,
    setAbierta 
  ] = useState( false );
  const primerRender = useRef( true );

  useEffect(
    () => {
      setTexto( qUrl );
    }, [
      qUrl 
    ] 
  );

  const actualizar = ( cambios: Record<string, string | null> ) => {
    const params = new URLSearchParams( searchParams.toString() );

    Object.entries( cambios )
      .forEach( ( [
        clave,
        valor 
      ] ) => {
        if ( !valor || valor === 'todos' ) {
          params.delete( clave );
        } else {
          params.set(
            clave, valor 
          );
        }
      } );
    router.replace(
      `${ pathname }?${ params.toString() }` as Route, {
        scroll: false 
      } 
    );
  };

  useEffect(
    () => {
      if ( primerRender.current ) {
        primerRender.current = false;

        return;
      }

      if ( textoDebounced !== qUrl ) {
        actualizar( {
          q: textoDebounced || null 
        } );
      }
    }, [
      textoDebounced 
    ] 
  );

  const toggleEstado = ( valor: string ) => {
    const siguiente = estSel.includes( valor )
      ? estSel.filter( ( v ) => {
          return v !== valor;
        } )
      : [
          ...estSel,
          valor 
        ];

    actualizar( {
      estado: siguiente.length
        ? siguiente.join( ',' )
        : null 
    } );
  };

  const toggleAsignadasAMi = () => {
    actualizar( {
      asignadasAMi: asignadasAMi
        ? null
        : '1',
    } );
  };

  const limpiar = () => {
    setTexto( '' );
    actualizar( {
      q           : null,
      estado      : null,
      caso        : null,
      desde       : null,
      hasta       : null,
      asignadasAMi: null,
    } );
  };

  const activos = estSel.length + ( caso !== 'todos'
    ? 1
    : 0 ) + ( desde || hasta
    ? 1
    : 0 ) + ( texto
    ? 1
    : 0 ) + ( asignadasAMi
    ? 1
    : 0 );

  const chipAsignadasAMi = mostrarAsignadasAMi && (
    <button
      type="button"
      onClick={toggleAsignadasAMi}
      className={`${ styles.chipEstado } ${ asignadasAMi
        ? styles.activo
        : '' }`}
    >
      {asignadasAMi && <span className="material-symbols-rounded" aria-hidden="true">check</span>}
      Asignadas a mí
    </button>
  );

  const chipsEstado = estados.map( ( o ) => {
    const on = estSel.includes( o.valor );

    return (
      <button
        key={o.valor}
        type="button"
        onClick={() => {
          toggleEstado( o.valor );
        }}
        className={`${ styles.chipEstado } ${ on
          ? styles.activo
          : '' }`}
      >
        {on && <span className="material-symbols-rounded" aria-hidden="true">check</span>}
        {o.label}
      </button>
    );
  } );

  const campoSelect = (
    <label className={styles.selectCaso}>
      <span className={`material-symbols-rounded ${ styles.iconoInicioSelect }`} aria-hidden="true">folder_managed</span>
      <select
        value={caso}
        onChange={( e ) => {
          actualizar( {
            caso: e.target.value 
          } );
        }}
      >
        <option value="todos">Todos los casos</option>
        <option value="sin-caso">Sin caso asociado</option>
        {casos.map( ( c ) => {
          return <option key={c.id} value={c.id}>{c.nombre}</option>;
        } )}
      </select>
      <span className={`material-symbols-rounded ${ styles.iconoFinSelect }`} aria-hidden="true">expand_more</span>
    </label>
  );

  const campoFecha = (
    valor: string, clave: 'desde' | 'hasta', etiqueta: string 
  ) => {
    return (
      <label className={styles.campoFecha}>
        <span>{etiqueta}</span>
        <input
          type="date"
          value={valor}
          onChange={( e ) => {
            actualizar( {
              [ clave ]: e.target.value 
            } );
          }}
        />
      </label>
    );
  };

  const controles = (
    <>
      <div className={styles.grupo}>
        <span className={styles.grupoLabel}>Estado</span>
        <div className={styles.filaEstado} style={{
          marginTop: 0
        }}
        >{chipsEstado}{chipAsignadasAMi}</div>
      </div>
      <div className={styles.grupo}>
        <span className={styles.grupoLabel}>Caso</span>
        {campoSelect}
      </div>
      <div className={styles.grupo}>
        <span className={styles.grupoLabel}>Rango de fechas</span>
        <div style={{
          display   : 'flex',
          gap       : 10,
          alignItems: 'flex-end' 
        }}
        >
          {campoFecha(
            desde, 'desde', 'Desde' 
          )}
          <span className={styles.separadorFechas}>—</span>
          {campoFecha(
            hasta, 'hasta', 'Hasta' 
          )}
        </div>
      </div>
    </>
  );

  if ( esMovil ) {
    return (
      <div>
        <div className={styles.filaBusqueda}>
          <div className={styles.campoBusqueda}>
            <TextField
              placeholder={placeholder}
              value={texto}
              onChange={( e ) => {
                setTexto( e.target.value );
              }}
              leadingIcon={<span className="material-symbols-rounded" aria-hidden="true">search</span>}
            />
          </div>
          <Button
            variant="outlined"
            icon={<span className="material-symbols-rounded" aria-hidden="true">tune</span>}
            onClick={() => {
              setAbierta( true );
            }}
          >
            {activos > 0
              ? `Filtros · ${ activos }`
              : 'Filtros'}
          </Button>
        </div>
        {abierta && (
          <div
            className={styles.filtrosSheet}
            onClick={() => {
              setAbierta( false );
            }}
          >
            <div className={styles.hojaContenido} onClick={( e ) => {
              e.stopPropagation();
            }}
            >
              <div className={styles.agarradera} />
              <div className={styles.hojaEncabezado}>
                <h3 className={styles.hojaTitulo}>Filtros</h3>
                <button type="button" className={styles.hojaLimpiar} onClick={limpiar}>Limpiar</button>
              </div>
              {controles}
              <Button
                variant="filled"
                fullWidth
                onClick={() => {
                  setAbierta( false );
                }}
              >
                Aplicar filtros
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className={styles.filaControles}>
        <div className={styles.campoBusqueda}>
          <TextField
            placeholder={placeholder}
            value={texto}
            onChange={( e ) => {
              setTexto( e.target.value );
            }}
            leadingIcon={<span className="material-symbols-rounded" aria-hidden="true">search</span>}
          />
        </div>
        {campoSelect}
        <div style={{
          display   : 'flex',
          gap       : 10,
          alignItems: 'flex-end' 
        }}
        >
          {campoFecha(
            desde, 'desde', 'Desde' 
          )}
          <span className={styles.separadorFechas}>—</span>
          {campoFecha(
            hasta, 'hasta', 'Hasta' 
          )}
        </div>
      </div>
      <div className={styles.filaEstado}>
        <span className={styles.etiquetaEstado}>Estado:</span>
        {chipsEstado}
        {chipAsignadasAMi}
        {activos > 0 && (
          <button type="button" className={styles.limpiar} onClick={limpiar}>
            <span className="material-symbols-rounded" aria-hidden="true">close</span>
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
};
