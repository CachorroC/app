'use client';

import { useEffect, useRef } from 'react';
import { Icon } from '#@/components/ui';
import { Button } from '../ui/button';
import styles from './generation-status.module.css';

/** Drives which UI state `GenerationStatus` renders for a memorial document generation attempt. */
export type GenerationState =
  'idle' | 'validating' | 'generating' | 'success' | 'error';

/**
 * Props for `GenerationStatus` — the current generation `status`, optional
 * error details to show when `status === 'error'`, and the action callbacks
 * for downloading the result, starting a new generation, or retrying.
 */
interface GenerationStatusProps {
  status           : GenerationState;
  errorMessage?    : string;
  technicalDetail? : string;
  onDownload       : () => void;
  onGenerateAnother: () => void;
  onRetry          : () => void;
}

/**
 * Renders an `aria-live` status region for a memorial document generation flow.
 *
 * Shows a spinner for `validating`/`generating`, a success block (Download /
 * Generate-another actions) for `success`, an error block (message, a
 * collapsible technical detail, and a Retry action) for `error`, and nothing
 * for `idle`. Auto-focuses the primary action button on success/error
 * transitions for accessibility.
 *
 * @param props - See {@link GenerationStatusProps}.
 */
export function GenerationStatus( {
  status,
  errorMessage,
  technicalDetail,
  onDownload,
  onGenerateAnother,
  onRetry,
}: GenerationStatusProps ) {
  const downloadRef = useRef<HTMLButtonElement>( null );
  const retryRef = useRef<HTMLButtonElement>( null );

  useEffect(
    () => {
      if ( status === 'success' ) {
        downloadRef.current?.focus();
      } else if ( status === 'error' ) {
        retryRef.current?.focus();
      }
    }, [
      status
    ] 
  );

  if ( status === 'idle' ) {
    return null;
  }

  return (
    <div
      className={styles.region}
      aria-live="polite"
      aria-busy={status === 'validating' || status === 'generating'}
    >
      {status === 'validating'
        ? (
            <div className={styles.busyRow}>
              <Icon
                name="progress_activity"
                className={styles.spinner}
                size={22}
              />
              <span className={styles.busyText}>Validando información…</span>
            </div>
          )
        : null}

      {status === 'generating'
        ? (
            <div className={styles.busyRow}>
              <Icon
                name="progress_activity"
                className={styles.spinner}
                size={22}
              />
              <span className={styles.busyText}>Generando documento…</span>
            </div>
          )
        : null}

      {status === 'success'
        ? (
            <div className={`${ styles.resultBlock } ${ styles.successBlock }`}>
              <div className={styles.resultHeader}>
                <Icon
                  name="check_circle"
                  className={styles.successIcon}
                  size={26}
                />
                <div className={styles.successTitle}>
                  Memorial generado con éxito
                </div>
              </div>
              <div className={styles.actions}>
                <Button
                  ref={downloadRef}
                  variant="filled"
                  icon={
                    <Icon
                      name="download"
                      size={18}
                    />
                  }
                  onClick={onDownload}
                >
                  Descargar .docx
                </Button>
                <Button
                  variant="text"
                  icon={
                    <Icon
                      name="restart_alt"
                      size={18}
                    />
                  }
                  onClick={onGenerateAnother}
                >
                  Generar otro
                </Button>
              </div>
            </div>
          )
        : null}

      {status === 'error'
        ? (
            <div className={`${ styles.resultBlock } ${ styles.errorBlock }`}>
              <div className={styles.resultHeader}>
                <Icon
                  name="error"
                  className={styles.errorIcon}
                  size={26}
                />
                <div className={styles.errorTitle}>
                  No pudimos generar el documento
                </div>
              </div>
              <div className={styles.errorMessage}>
                {errorMessage
              ?? 'Ocurrió un problema al generar el memorial. Por favor, vuelva a intentarlo.'}
              </div>
              {technicalDetail
                ? (
                    <details className={styles.technicalDetails}>
                      <summary>Detalles técnicos</summary>
                      <pre>{technicalDetail}</pre>
                    </details>
                  )
                : null}
              <div>
                <Button
                  ref={retryRef}
                  variant="filled"
                  icon={
                    <Icon
                      name="refresh"
                      size={18}
                    />
                  }
                  onClick={onRetry}
                >
                  Reintentar
                </Button>
              </div>
            </div>
          )
        : null}
    </div>
  );
}
