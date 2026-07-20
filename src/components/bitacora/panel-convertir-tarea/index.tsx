'use client';

import { useState, useTransition } from 'react';
import { promoverItemATarea } from '#@/lib/bitacora/actions';
import { Button } from '#@/components/ds/button';
import { Switch } from '#@/components/ds/switch';
import styles from './panel-convertir-tarea.module.css';

const PRIORIDADES = [
  {
    valor: 'BAJA',
    label: 'Baja' 
  },
  {
    valor: 'MEDIA',
    label: 'Media' 
  },
  {
    valor: 'ALTA',
    label: 'Alta' 
  },
  {
    valor: 'URGENTE',
    label: 'Urgente' 
  },
];

export type PanelConvertirTareaProps = {
  itemId    : string;
  onCancelar: () => void;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onCreada  : ( tareaId: string ) => void;
};

/**
 * Panel "Convertir en tarea" — responsable, fecha límite, prioridad y el
 * interruptor de término procesal. Construido a partir del boceto visual
 * del handoff (Nota - Editor.dc.html); no existía como código real en las
 * plantillas del design system.
 */
export const PanelConvertirTarea = ( {
  itemId, onCancelar, onCreada 
}: PanelConvertirTareaProps ) => {
  const [
    responsable,
    setResponsable 
  ] = useState( '' );
  const [
    fechaLimite,
    setFechaLimite 
  ] = useState( '' );
  const [
    prioridad,
    setPrioridad 
  ] = useState( 'MEDIA' );
  const [
    esTermino,
    setEsTermino 
  ] = useState( false );
  const [
    error,
    setError 
  ] = useState<string | null>( null );
  const [
    pendiente,
    iniciarTransicion 
  ] = useTransition();

  const crear = () => {
    setError( null );
    iniciarTransicion( async () => {
      const resultado = await promoverItemATarea(
        itemId, {
          responsable: responsable.trim() || undefined,
          fechaLimite: fechaLimite || undefined,
          prioridad,
          esTermino,
        } 
      );

      if ( !resultado.ok ) {
        setError( resultado.error );

        return;
      }

      onCreada( resultado.id );
    } );
  };

  return (
    <div className={styles.panel}>
      <div className={styles.fila}>
        <label className={styles.campo}>
          <span>Responsable</span>
          <input
            type="text"
            value={responsable}
            onChange={( e ) => {
              setResponsable( e.target.value );
            }}
            placeholder="Nombre"
          />
        </label>
        <label className={styles.campo}>
          <span>Fecha límite</span>
          <input
            type="date"
            value={fechaLimite}
            onChange={( e ) => {
              setFechaLimite( e.target.value );
            }}
          />
        </label>
        <label className={styles.campo}>
          <span>Prioridad</span>
          <select
            value={prioridad}
            onChange={( e ) => {
              setPrioridad( e.target.value );
            }}
          >
            {PRIORIDADES.map( ( p ) => {
              return <option key={p.valor} value={p.valor}>{p.label}</option>;
            } )}
          </select>
        </label>
      </div>
      <label className={styles.terminoFila}>
        <Switch
          checked={esTermino}
          ariaLabel="Es término procesal"
          onChange={setEsTermino}
        />
        Es término procesal
      </label>
      {error && <span className={styles.error}>{error}</span>}
      <div className={styles.acciones}>
        <Button
          variant="filled"
          disabled={pendiente}
          icon={<span className="material-symbols-rounded" aria-hidden="true">add_task</span>}
          onClick={crear}
        >
          Crear tarea
        </Button>
        <Button variant="text" disabled={pendiente} onClick={onCancelar}>Cancelar</Button>
      </div>
    </div>
  );
};
