import tokens from './actuacion-tokens.module.css';
import styles from './actuacion-card-error.module.css';
import { Button } from '#@/memoriales/components/ui/button';
import { Icon } from '#@/components/ui';

export interface ActuacionCardErrorProps {
  message?      : string;
  carpetaNumero?: number;
  errorCode?    : string | null;
  detail?       : string | null;
  onRetry?      : () => void;
}

export function ActuacionCardError( {
  message,
  carpetaNumero,
  errorCode,
  detail,
  onRetry,
}: ActuacionCardErrorProps ) {
  const messageDisplay
    = message
    ?? 'Ocurrió un problema al consultar esta actuación en el proceso judicial.';
  const refDisplay = errorCode
    ? `Ref. ${ errorCode }`
    : 'Ref. desconocida';
  const carpetaDisplay
    = carpetaNumero !== undefined && carpetaNumero !== null
      ? `N.° ${ carpetaNumero }`
      : '—';
  const hasDetail = !!detail;
  const handleRetry = onRetry ?? ( () => {} );

  return (
    <div
      className={`${ tokens.scope } ${ styles.raceContainer }`}
      role="alert"
    >
      <div className={styles.raceCard}>
        <div className={styles.raceAccent} />
        <div className={styles.racePad}>
          {/* BASE TIER: siempre visible, incluso por debajo de 240px */}
          <div className={styles.raceHeader}>
            <div className={styles.raceTitleRow}>
              <span
                className="material-symbols-rounded"
                style={{
                  fontSize : 20,
                  color    : 'var(--md-sys-color-error)',
                  flex     : '0 0 auto',
                  marginTop: 1,
                }}
                aria-hidden
              >
                error
              </span>
              <div className={styles.raceTitle}>
                No se pudo cargar la actuación
              </div>
            </div>
          </div>

          <div className={styles.raceMessage}>{messageDisplay}</div>

          {/* SM TIER: código de referencia + acción de reintentar */}
          <div className={styles.raceSm}>
            <span className={styles.raceRef}>{refDisplay}</span>
            <Button
              variant="text"
              size="small"
              icon={
                <Icon
                  name="refresh"
                  size={16}
                />
              }
              onClick={handleRetry}
            >
              Reintentar
            </Button>
          </div>

          {/* MD TIER: qué carpeta / proceso falló, para orientarse en tablas densas */}
          <div className={styles.raceMd}>
            <div className={styles.raceCarpetaRow}>
              <span className={styles.raceCarpetaLabel}>Carpeta</span>
              <span className={styles.raceCarpetaValue}>{carpetaDisplay}</span>
            </div>
          </div>

          {/* LG TIER: detalle técnico (solo si hay espacio y hay detalle) */}
          {hasDetail && (
            <div className={styles.raceLg}>
              <span
                className="material-symbols-rounded"
                style={{
                  fontSize : 16,
                  color    : 'var(--md-sys-color-on-surface-variant)',
                  marginTop: 1,
                }}
                aria-hidden
              >
                code
              </span>
              <span className={styles.raceDetail}>{detail}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
