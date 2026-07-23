'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCarpetaSort,
  useCarpetaSortDispatch, } from '#@/app/Context/carpetas-sort-context';
import { updateRevisadoState } from '#@/app/dashboard/Carpetas/actions';
import { CarpetaCard } from './carpeta-card';
import { CarpetaTableRow } from './carpeta-table-row';
import { CarpetasTableHeader } from './carpetas-table-header';
import styles from './styles.module.css';

const CARD_BREAKPOINT = 1024;

function toCsvCell( value: unknown ) {
  return `"${ String( value ?? '' )
    .replace(
      /"/g, '""' 
    ) }"`;
}

export function CarpetasTable() {
  const {
    carpetas, selected 
  } = useCarpetaSort();
  const dispatchCarpetas = useCarpetaSortDispatch();

  const containerRef = useRef<HTMLDivElement>( null );
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>( null );

  const [
    containerWidth,
    setContainerWidth
  ] = useState( CARD_BREAKPOINT );
  const [
    toast,
    setToast
  ] = useState<string | null>( null );
  const [
    isBusy,
    setIsBusy
  ] = useState( false );

  useEffect(
    () => {
      const el = containerRef.current;

      if ( !el || typeof ResizeObserver === 'undefined' ) {
        return undefined;
      }

      const observer = new ResizeObserver( ( entries ) => {
        const width = Math.round( entries[ 0 ].contentRect.width );

        setContainerWidth( width );
      } );

      observer.observe( el );
      setContainerWidth( el.clientWidth );

      return () => {
        observer.disconnect();
      };
    }, [] 
  );

  useEffect(
    () => {
      return () => {
        if ( toastTimeout.current ) {
          clearTimeout( toastTimeout.current );
        }
      };
    }, [] 
  );

  const showToast = useCallback(
    ( message: string ) => {
      setToast( message );

      if ( toastTimeout.current ) {
        clearTimeout( toastTimeout.current );
      }

      toastTimeout.current = setTimeout(
        () => {
          setToast( null );
        }, 2800 
      );
    }, [] 
  );

  const visibleSelected = carpetas.filter( ( carpeta ) => {
    return selected.has( carpeta.numero );
  } );

  const selCount = visibleSelected.length;
  const allSelected = carpetas.length > 0 && selCount === carpetas.length;
  const someSelected = selCount > 0 && !allSelected;

  const onSelectAll = ( next: boolean ) => {
    dispatchCarpetas( {
      type   : 'set-selection',
      numeros: next
        ? carpetas.map( ( carpeta ) => {
            return carpeta.numero;
          } )
        : [],
    } );
  };

  const onToggleSelect = ( numero: number ) => {
    dispatchCarpetas( {
      type: 'toggle-select',
      numero,
    } );
  };

  const onMarcarRevisado = async () => {
    setIsBusy( true );

    try {
      const results = await Promise.all( visibleSelected.map( ( carpeta ) => {
        return updateRevisadoState( {
          numero  : carpeta.numero,
          id      : carpeta.id,
          revisado: true,
        } );
      } ), );

      dispatchCarpetas( {
        type   : 'batch-update',
        payload: results,
      } );
      dispatchCarpetas( {
        type: 'clear-selection',
      } );
      showToast( results.length === 1
        ? '1 carpeta marcada como revisada'
        : `${ results.length } carpetas marcadas como revisadas`, );
    } finally {
      setIsBusy( false );
    }
  };

  const onExportar = () => {
    const header = [
      'Numero',
      'Nombre',
      'Categoria',
      'Tipo de proceso',
      'Fecha',
      'Radicado',
      'Cedula',
      'Expediente',
    ];

    const rows = visibleSelected.map( ( carpeta ) => {
      return [
        carpeta.numero,
        carpeta.nombre,
        carpeta.category,
        carpeta.tipoProceso,
        carpeta.fecha
          ? new Date( carpeta.fecha )
              .toLocaleDateString( 'es-CO' )
          : '',
        carpeta.demanda?.radicado ?? '',
        carpeta.deudor?.cedula ?? '',
        carpeta.llaveProceso,
      ]
        .map( toCsvCell )
        .join( ',' );
    } );

    const csv = [
      header.map( toCsvCell )
        .join( ',' ),
      ...rows
    ].join( '\n' );
    const blob = new Blob(
      [
        `\uFEFF${ csv }`
      ], {
        type: 'text/csv;charset=utf-8;',
      } 
    );
    const url = URL.createObjectURL( blob );
    const anchor = document.createElement( 'a' );

    anchor.href = url;
    anchor.download = `carpetas-${ new Date()
      .toISOString()
      .slice(
        0, 10 
      ) }.csv`;
    document.body.appendChild( anchor );
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL( url );

    showToast( visibleSelected.length === 1
      ? 'Exportando 1 carpeta…'
      : `Exportando ${ visibleSelected.length } carpetas…`, );
  };

  const showTable = containerWidth >= CARD_BREAKPOINT;

  return (
    <div
      ref={containerRef}
      className={styles.root}
    >
      <div className={styles.resultRow}>
        <span className={styles.resultLabel}>
          {carpetas.length === 1
            ? '1 carpeta'
            : `${ carpetas.length } carpetas`}
        </span>
      </div>

      {selCount > 0 && (
        <div className={styles.selectionBar}>
          <span className={styles.selectionLabel}>
            {selCount === 1
              ? '1 carpeta seleccionada'
              : `${ selCount } carpetas seleccionadas`}
          </span>
          <div className={styles.selectionSpacer} />
          <button
            type="button"
            className={styles.filledButton}
            disabled={isBusy}
            onClick={onMarcarRevisado}
          >
            <span
              className="material-symbols-rounded"
              aria-hidden="true"
            >
              task_alt
            </span>
            Marcar como revisado
          </button>
          <button
            type="button"
            className={styles.tonalButton}
            onClick={onExportar}
          >
            <span
              className="material-symbols-rounded"
              aria-hidden="true"
            >
              ios_share
            </span>
            Exportar
          </button>
          <button
            type="button"
            className={styles.textButton}
            onClick={() => {
              return dispatchCarpetas( {
                type: 'clear-selection',
              } );
            }}
          >
            Cancelar
          </button>
        </div>
      )}

      {carpetas.length === 0
        ? (
            <div className={styles.emptyState}>
              <span
                className="material-symbols-rounded"
                aria-hidden="true"
              >
                folder_off
              </span>
              <div className={styles.emptyTitle}>Sin resultados</div>
              <div className={styles.emptyBody}>
                Ninguna carpeta coincide con la búsqueda o los filtros aplicados.
              </div>
            </div>
          )
        : showTable
          ? (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <CarpetasTableHeader
                    allSelected={allSelected}
                    someSelected={someSelected}
                    onSelectAll={onSelectAll}
                  />
                  <tbody>
                    {carpetas.map( ( carpeta ) => {
                      return (
                        <CarpetaTableRow
                          key={carpeta.numero}
                          carpeta={carpeta}
                          selected={selected.has( carpeta.numero )}
                          onToggleSelect={() => {
                            return onToggleSelect( carpeta.numero );
                          }}
                        />
                      );
                    } )}
                  </tbody>
                </table>
              </div>
            )
          : (
              <div className={styles.cardGrid}>
                {carpetas.map( ( carpeta ) => {
                  return (
                    <CarpetaCard
                      key={carpeta.numero}
                      carpeta={carpeta}
                      selected={selected.has( carpeta.numero )}
                      onToggleSelect={() => {
                        return onToggleSelect( carpeta.numero );
                      }}
                    />
                  );
                } )}
              </div>
            )}

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
