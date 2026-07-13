import tokens from './actuacion-tokens.module.css';
import styles from './actuacion-card.module.css';
import { formatCompactDate } from './actuacion-card-props';

export interface ActuacionCardProps {
  actuacion     : string;
  fechaActuacion: string | Date;
  anotacion     : string | null;
  fechaInicial? : string | Date | null;
  fechaFinal?   : string | Date | null;
  fechaRegistro : string | Date;
  codRegla      : string;
  conDocumentos : boolean;
  cant          : number;
  llaveProceso  : string;
  consActuacion : number;
  isUltimaAct?  : boolean;
  carpetaNumero?: number;
  idProceso?    : string;
  createdAt?    : string | Date;
}

export function ActuacionCard( {
  actuacion,
  fechaActuacion,
  anotacion,
  fechaInicial,
  fechaFinal,
  fechaRegistro,
  codRegla,
  conDocumentos,
  cant,
  llaveProceso,
  consActuacion,
  isUltimaAct = false,
  carpetaNumero,
  idProceso,
}: ActuacionCardProps ) {
  const actuacionTitle = actuacion || 'Actuación sin título';
  const anotacionDisplay = anotacion || 'Sin anotación registrada.';

  const fechaActuacionDisplay = formatCompactDate( fechaActuacion ) ?? '—';
  const fechaInicialDisplay = formatCompactDate( fechaInicial );
  const fechaFinalDisplay = formatCompactDate( fechaFinal );
  const fechaRegistroDisplay = formatCompactDate( fechaRegistro ) ?? '—';
  const showRango = !!( fechaInicialDisplay && fechaFinalDisplay );

  const hasCodRegla = !!codRegla;
  const hasCant = cant !== undefined && cant !== null;

  return (
    <div
      className={`${ tokens.scope } ${ styles.ractContainer }`}
    >
      <div className={styles.ractCard}>
        <div
          className={styles.ractAccent}
          style={{
            background: isUltimaAct
              ? 'var(--md-sys-color-primary)'
              : 'transparent'
          }}
        />
        <div className={styles.ractPad}>

          {/* BASE TIER */}
          <div className={styles.ractHeader}>
            <div className={styles.ractTitleRow}>
              <span
                className="material-symbols-rounded"
                style={{
                  fontSize : 20,
                  color    : 'var(--md-sys-color-primary)',
                  flex     : '0 0 auto',
                  marginTop: 1
                }}
                aria-hidden
              >
                gavel
              </span>
              <div className={styles.ractTitle}>{actuacionTitle}</div>
            </div>
            <div className={styles.ractFecha}>
              <span
                className="material-symbols-rounded"
                style={{
                  fontSize: 15
                }}
                aria-hidden
              >
                calendar_month
              </span>
              <span>{fechaActuacionDisplay}</span>
            </div>
          </div>

          <div
            className={styles.ractAnot}
            style={{
              fontStyle: anotacion
                ? 'normal'
                : 'italic'
            }}
          >
            {anotacionDisplay}
          </div>

          {/* SM TIER (>= 240px): rule code, documents, quantity */}
          <div className={styles.ractSm}>
            {hasCodRegla && (
              <span className={styles.chip}>{codRegla}</span>
            )}
            <div className={styles.metaItem}>
              <span
                className="material-symbols-rounded"
                style={{
                  fontSize: 16,
                  color   : conDocumentos
                    ? 'var(--md-sys-color-primary)'
                    : 'var(--md-sys-color-outline)'
                }}
                aria-hidden
              >
                attach_file
              </span>
              <span>{conDocumentos
                ? 'Con documentos'
                : 'Sin documentos'}</span>
            </div>
            {hasCant && (
              <div className={styles.metaItem}>
                <span
                  className="material-symbols-rounded"
                  style={{
                    fontSize: 16
                  }}
                  aria-hidden
                >
                  tag
                </span>
                <span>{`Cant. ${ cant }`}</span>
              </div>
            )}
          </div>

          {/* MD TIER (>= 340px): radicado, consecutivo, última actuación */}
          <div className={styles.ractMd}>
            <div className={styles.radicadoRow}>
              <div className={styles.radicado}>
                <span className={styles.label}>Radicado</span>
                <span className={styles.mono}>{llaveProceso || '—'}</span>
              </div>
              <span className={styles.accionN}>
                {`Acción n.° ${ consActuacion ?? '—' }`}
              </span>
            </div>
            {isUltimaAct && (
              <div>
                <span className={styles.badge}>Última actuación</span>
              </div>
            )}
          </div>

          {/* LG TIER (>= 460px): rango de fechas */}
          {showRango && (
            <div className={styles.ractLg}>
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 16,
                  color   : 'var(--md-sys-color-tertiary)'
                }}
                aria-hidden
              >
                date_range
              </span>
              <span>
                {'Plazo: '}
                <strong className={styles.rangoStrong}>{fechaInicialDisplay}</strong>
                {' — '}
                <strong className={styles.rangoStrong}>{fechaFinalDisplay}</strong>
              </span>
            </div>
          )}

          {/* XL TIER (>= 600px): metadatos de registro */}
          <div className={styles.ractXl}>
            <div className={styles.xlField}>
              <span className={styles.label}>Carpeta</span>
              <span className={styles.xlValue}>{`N.° ${ carpetaNumero ?? '—' }`}</span>
            </div>
            <div className={styles.xlField}>
              <span className={styles.label}>Registrado</span>
              <span className={styles.mono}>{fechaRegistroDisplay}</span>
            </div>
            <div className={styles.xlFieldWide}>
              <span className={styles.label}>ID proceso</span>
              <span className={styles.mono}>{idProceso ?? '—'}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
