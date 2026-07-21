'use client';

import { Button } from '#@/components/ds/button';
import styles from './editor-footer.module.css';

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

export type EditorFooterProps = {
  creadaEn      : string;
  editadaEn     : string;
  soloLectura   : boolean;
  guardando     : boolean;
  sucio         : boolean;
  recienGuardado: boolean;
  onDescartar   : () => void;
  onGuardar     : () => void;
};

export const EditorFooter = ( {
  creadaEn, editadaEn, soloLectura, guardando, sucio, recienGuardado, onDescartar, onGuardar
}: EditorFooterProps ) => {
  return (
    <footer className={styles.pie}>
      <div className={styles.meta}>
        <span>Creada {formatoFecha( creadaEn )}</span>
        <span>Editada {formatoFecha( editadaEn )}</span>
      </div>
      <div className={styles.acciones}>
        {soloLectura && (
          <span className={styles.indicador}>
            <span className="material-symbols-rounded" aria-hidden="true">lock</span>
            Solo lectura
          </span>
        )}
        {!soloLectura && guardando && (
          <span className={styles.indicador}>
            <span className={styles.spinner} aria-hidden="true" />
            Guardando…
          </span>
        )}
        {!soloLectura && !guardando && sucio && (
          <span className={`${ styles.indicador } ${ styles.pendiente }`}>
            <span className={styles.punto} aria-hidden="true" />
            Cambios sin guardar
          </span>
        )}
        {!soloLectura && !guardando && !sucio && recienGuardado && (
          <span className={`${ styles.indicador } ${ styles.exito }`}>
            <span className="material-symbols-rounded" aria-hidden="true">cloud_done</span>
            Guardado
          </span>
        )}
        {!soloLectura && !guardando && !sucio && !recienGuardado && (
          <span className={styles.indicador}>Sin cambios</span>
        )}
        {!soloLectura && (
          <>
            <Button variant="text" size="small" disabled={guardando || !sucio} onClick={onDescartar}>
              Descartar
            </Button>
            <Button
              variant="filled"
              size="small"
              disabled={guardando || !sucio}
              icon={<span className="material-symbols-rounded" aria-hidden="true">save</span>}
              onClick={onGuardar}
            >
              Guardar
            </Button>
          </>
        )}
      </div>
    </footer>
  );
};
