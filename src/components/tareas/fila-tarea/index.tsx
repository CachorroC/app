'use client';

import { useOptimistic, useTransition } from 'react';
import { Checkbox } from '#@/components/ds/checkbox';
import { ChipEstado } from '#@/components/notas-tareas/chip-estado';
import { completarTarea } from '#@/lib/tareas/actions';
import { TareaVista } from '#@/lib/tareas/vista';
import styles from './fila-tarea.module.css';

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

export type FilaTareaProps = { tarea: TareaVista };

/**
 * Fila de una tarea. Sin "modelo Tarea" no existe navegación a un detalle
 * — el plan no incluye /tareas/[id] — así que su única interacción es
 * marcarla atendida, optimista vía useOptimistic.
 */
export const FilaTarea = ( {
  tarea 
}: FilaTareaProps ) => {
  const [
    estadoOptimista,
    marcarAtendida 
  ] = useOptimistic(
    tarea.estado, () => {
      return 'ATENDIDA';
    } 
  );
  const [
    , iniciarTransicion 
  ] = useTransition();
  const p = PRIORIDAD_DEFS[ tarea.prioridad ] || PRIORIDAD_DEFS.MEDIA;
  const termino = Boolean( tarea.esTermino );
  const completada = estadoOptimista === 'ATENDIDA';

  const completar = () => {
    if ( completada ) {
      return;
    }

    iniciarTransicion( async () => {
      marcarAtendida( undefined );
      await completarTarea( tarea.id );
    } );
  };

  return (
    <div className={`${ styles.fila } ${ termino
      ? styles.termino
      : '' }`}
    >
      <span className={styles.barra} aria-hidden="true" />
      <Checkbox
        checked={completada}
        disabled={completada}
        ariaLabel={`Marcar "${ tarea.titulo }" como atendida`}
        onChange={completar}
      />
      <div className={styles.cuerpo}>
        <div className={styles.tituloFila}>
          {termino && (
            <span className={styles.chipTermino}>
              <span className="material-symbols-rounded" aria-hidden="true">gavel</span>
              Término
            </span>
          )}
          <span className={styles.titulo}>{tarea.titulo}</span>
          {tarea.origenNota && (
            <span title="Originada en una nota" className={styles.origen}>
              <span className="material-symbols-rounded" aria-hidden="true">sticky_note_2</span>
            </span>
          )}
        </div>
        <div className={styles.metaFila}>
          <span className={`${ styles.caso } ${ !tarea.carpeta
            ? styles.sinCaso
            : '' }`}
          >
            <span className="material-symbols-rounded" aria-hidden="true">{tarea.carpeta
              ? 'folder'
              : 'folder_off'}</span>
            {tarea.carpeta || 'Sin caso'}
          </span>
          {tarea.responsable && (
            <span className={styles.responsable}>
              <span className="material-symbols-rounded" aria-hidden="true">person</span>{tarea.responsable}
            </span>
          )}
          <span className={`${ styles.fecha } ${ tarea.vencida
            ? styles.vencidaTexto
            : '' }`}
          >
            <span className="material-symbols-rounded" aria-hidden="true">event</span>
            {tarea.fechaLimite || 'Sin fecha'}
          </span>
        </div>
      </div>
      <span className={`${ styles.prioridad } ${ p.clase }`} title={`Prioridad ${ p.label }`}>
        <span className={styles.puntoPrioridad} aria-hidden="true" />{p.label}
      </span>
      <ChipEstado variante={estadoOptimista} />
    </div>
  );
};
