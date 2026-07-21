'use client';

import { IconButton } from '#@/components/ds/icon-button';
import { ChipEstado } from '#@/components/notas-tareas/chip-estado';
import { TareaVinculadaDTO } from '#@/lib/bitacora/tipos';
import styles from './tarea-vinculada-row.module.css';

const PRIORIDAD_DEFS: Record<string, { label: string; clase: string }> = {
  BAJA: {
    label: 'Baja',
    clase: styles.baja
  },
  MEDIA: {
    label: 'Media',
    clase: styles.media
  },
  ALTA: {
    label: 'Alta',
    clase: styles.alta
  },
  URGENTE: {
    label: 'Urgente',
    clase: styles.urgente
  },
};

function formatoFecha( iso: string ): string {
  const d = new Date( iso );

  return `${ String( d.getDate() )
    .padStart(
      2, '0'
    ) }/${ String( d.getMonth() + 1 )
    .padStart(
      2, '0'
    ) }/${ d.getFullYear() }`;
}

export type TareaVinculadaRowProps = {
  tarea   : TareaVinculadaDTO;
  onAbrir?: () => void;
};

/** Fila compacta de una tarea vinculada — trato de mayor urgencia para término procesal y vencidas. */
export const TareaVinculadaRow = ( {
  tarea, onAbrir
}: TareaVinculadaRowProps ) => {
  const vencida = Boolean( tarea.fechaLimite
    && new Date( tarea.fechaLimite ) < new Date()
    && tarea.estado !== 'ATENDIDA'
    && tarea.estado !== 'ARCHIVADA' );
  const termino = tarea.esTermino;
  const p = PRIORIDAD_DEFS[ tarea.prioridad ] || PRIORIDAD_DEFS.MEDIA;

  return (
    <div
      className={`${ styles.fila } ${ termino
        ? styles.termino
        : '' } ${ !termino && vencida
        ? styles.vencida
        : '' }`}
    >
      <div className={styles.cuerpo}>
        <div className={styles.tituloFila}>
          {termino && (
            <span className={styles.chipTermino}>
              <span className="material-symbols-rounded" aria-hidden="true">gavel</span>
              Término procesal
            </span>
          )}
          <span className={styles.titulo}>{tarea.titulo}</span>
        </div>
        <div className={styles.metaFila}>
          <ChipEstado variante={tarea.estado} />
          <span className={`${ styles.prioridad } ${ p.clase }`}>
            <span className={styles.puntoPrioridad} aria-hidden="true" />
            {p.label}
          </span>
          {tarea.fechaLimite && (
            <span className={`${ styles.fecha } ${ vencida
              ? styles.fechaVencida
              : '' }`}
            >
              <span className="material-symbols-rounded" aria-hidden="true">{vencida
                ? 'event_busy'
                : 'event'}</span>
              {formatoFecha( tarea.fechaLimite )}
              {vencida && ' · vencida'}
            </span>
          )}
        </div>
      </div>
      {onAbrir && (
        <IconButton ariaLabel="Abrir tarea" variant="standard" onClick={onAbrir}>
          <span className="material-symbols-rounded" aria-hidden="true">open_in_new</span>
        </IconButton>
      )}
    </div>
  );
};
