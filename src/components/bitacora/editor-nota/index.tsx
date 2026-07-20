'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { Button } from '#@/components/ds/button';
import { IconButton } from '#@/components/ds/icon-button';
import { ChipEstado } from '#@/components/notas-tareas/chip-estado';
import { ChipEtiqueta } from '#@/components/notas-tareas/chip-etiqueta';
import { alternarItem, archivarNota, fijarNota } from '#@/lib/bitacora/actions';
import { BloqueDTO, NotaDetalle } from '#@/lib/bitacora/tipos';
import { BloqueContenido } from '../bloque-contenido';
import { PanelConvertirTarea } from '../panel-convertir-tarea';
import styles from './editor-nota.module.css';

function alternarEnBloques(
  bloques: BloqueDTO[], itemId: string 
): BloqueDTO[] {
  return bloques.map( ( b ) => {
    if ( b.tipo === 'PARRAFO' ) {
      return b;
    }

    return {
      ...b,
      items: b.items.map( ( it ) => {
        return it.id === itemId
          ? {
              ...it,
              completado: !it.completado 
            }
          : it;
      } ),
    };
  } );
}

export type EditorNotaProps = { nota: NotaDetalle };

export const EditorNota = ( {
  nota 
}: EditorNotaProps ) => {
  const [
    bloquesOptimistas,
    aplicarOptimista 
  ] = useOptimistic(
    nota.bloques, alternarEnBloques 
  );
  const [
    fijada,
    setFijada 
  ] = useState( nota.fijada );
  const [
    itemEnConversion,
    setItemEnConversion 
  ] = useState<string | null>( null );
  const [
    , iniciarTransicion 
  ] = useTransition();

  const alternar = ( itemId: string ) => {
    iniciarTransicion( async () => {
      aplicarOptimista( itemId );
      await alternarItem( itemId );
    } );
  };

  const alternarFijada = () => {
    const siguiente = !fijada;

    setFijada( siguiente );
    iniciarTransicion( async () => {
      await fijarNota(
        nota.id, siguiente 
      );
    } );
  };

  return (
    <div className={styles.editor}>
      <header className={styles.encabezado}>
        <div className={styles.tituloFila}>
          <IconButton
            ariaLabel={fijada
              ? 'Desfijar nota'
              : 'Fijar nota'}
            selected={fijada}
            variant={fijada
              ? 'tonal'
              : 'standard'}
            onClick={alternarFijada}
          >
            <span className="material-symbols-rounded">push_pin</span>
          </IconButton>
          <h1 className={styles.titulo}>{nota.titulo}</h1>
          <ChipEstado variante={nota.estado} />
        </div>
        <div className={styles.metaFila}>
          {nota.caso
            ? <span className={styles.caso}>{`${ nota.caso.referencia } · ${ nota.caso.nombre }`}</span>
            : <span className={styles.sinCaso}>Sin caso asociado</span>}
        </div>
        {nota.etiquetas.length > 0 && (
          <div className={styles.etiquetas}>
            {nota.etiquetas.map( ( e ) => {
              return <ChipEtiqueta key={e.id} texto={e.nombre} color={e.color} />;
            } )}
          </div>
        )}
      </header>

      <div className={styles.bloques}>
        {bloquesOptimistas.map( ( bloque ) => {
          const mostrarPanel = bloque.tipo !== 'PARRAFO'
            && itemEnConversion !== null
            && bloque.items.some( ( i ) => {
              return i.id === itemEnConversion;
            } );

          return (
            <div key={bloque.id} className={styles.bloqueWrap}>
              <BloqueContenido
                bloque={bloque}
                onAlternar={alternar}
                onConvertir={( itemId ) => {
                  setItemEnConversion( itemId );
                }}
              />
              {mostrarPanel && itemEnConversion && (
                <PanelConvertirTarea
                  itemId={itemEnConversion}
                  onCancelar={() => {
                    setItemEnConversion( null );
                  }}
                  onCreada={() => {
                    setItemEnConversion( null );
                  }}
                />
              )}
            </div>
          );
        } )}
      </div>

      <div className={styles.pieAcciones}>
        <Button
          variant="outlined"
          icon={<span className="material-symbols-rounded" aria-hidden="true">inventory_2</span>}
          onClick={() => {
            iniciarTransicion( async () => {
              await archivarNota( nota.id );
            } );
          }}
        >
          Archivar nota
        </Button>
      </div>
    </div>
  );
};
