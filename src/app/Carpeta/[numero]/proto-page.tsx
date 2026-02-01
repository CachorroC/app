import { IntCarpeta } from '#@/lib/types/carpetas';
import { appContainer, card, cardHeader, cardIcon, cardTitle, chip, dashboardGrid, dataLabel, dataRow, dataValue, filled, headerCard, headerInfo, headerMeta, money, statusTerminado, timeline, timelineContent, timelineDate, timelineItem } from './proto-styles.module.css';

export default function ProtoPage (
  {
    carpeta
  }: {carpeta: IntCarpeta}
) {
  const copFormatter = new Intl.NumberFormat(
    'es-CO', {
      style   : 'currency',
      currency: 'COP'
    }
  );

  return (
    <>
      <div className={ appContainer }>
        <header className={headerCard}>
          <div className={headerInfo}>
            <div style={{
              fontSize     : '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom : '8px'
            }}
            >
              Carpeta #{carpeta.numero}
            </div>
            <h1>Bancolombia vs. {carpeta.nombre}</h1>
            <p>Llave Proceso: {carpeta.llaveProceso}</p>

            <div className={headerMeta}>
              <span className={`${ chip } ${ filled }`}>Bancolombia</span>
              <span className={chip}>{carpeta.tipoProceso}</span>
              <span className={`${ chip } ${ statusTerminado }`}>En Proceso</span>
            </div>
          </div>

          <div style={{
            textAlign: 'right'
          }}
          >
            <p style={{
              fontSize: '0.8rem',
              opacity : 0.8
            }}
            >Última actualización</p>
            <strong>{carpeta.fecha?.toLocaleDateString(
              'es-ES'
            )}</strong>
          </div>
        </header>

        <div className={dashboardGrid}>

          <div style={{
            display      : 'flex',
            flexDirection: 'column',
            gap          : '24px'
          }}
          >

            <section className={card}>
              <div className={cardHeader}>
                <span className={cardTitle}>Deudor Principal</span>
                <span className={cardIcon}>👤</span>
              </div>
              <div className={dataRow}>
                <span className={dataLabel}>Nombre</span>
                <span className={dataValue}>{carpeta.nombre}</span>
              </div>
              <div className={dataRow}>
                <span className={dataLabel}>Cédula</span>
                <span className={dataValue}>{carpeta.deudor?.cedula}</span>
              </div>
              <div className={dataRow}>
                <span className={dataLabel}>Teléfono</span>
                <span className={dataValue}>{carpeta.deudor?.telCelular}</span>
              </div>
              <div className={dataRow}>
                <span className={dataLabel}>Email</span>
                <span className={dataValue}>{carpeta.deudor?.email}</span>
              </div>
            </section>

            <section className={card}>
              <div className={cardHeader}>
                <span className={cardTitle}>Detalles Judiciales</span>
                <span className={cardIcon}>⚖️</span>
              </div>
              <div className={dataRow}>
                <span className={dataLabel}>Juzgado</span>
                <span className={dataValue}>{carpeta.juzgado?.tipo}</span>
              </div>
              <div className={dataRow}>
                <span className={dataLabel}>Ciudad</span>
                <span className={dataValue}>{carpeta.demanda.departamento}</span>
              </div>
              <div className={dataRow}>
                <span className={dataLabel}>Radicado</span>
                <span className={dataValue}>{carpeta.demanda.radicado}</span>
              </div>
              <div className={dataRow}>
                <span className={dataLabel}>Capital Adeudado</span>
                <span className={`${ dataValue } ${ money }`}>{copFormatter.format(
                  carpeta.demanda?.capitalAdeudado ?? 0 
                )}</span>
              </div>
            </section>

            <section className={card} style={{
              backgroundColor: 'var(--tertiary-container)',
              color          : 'var(--on-tertiary-container)'
            }}
            >
              <div className={cardHeader}>
                <span className={cardTitle}>Facturación</span>
                <span className={cardIcon}>💲</span>
              </div>
              <div className={dataRow} style={{
                borderColor: 'rgba(0,0,0,0.1)'
              }}
              >
                <span className={dataLabel} style={{
                  color  : 'inherit',
                  opacity: 0.8
                }}
                >Total Facturado</span>
                <span className={`${ dataValue } ${ money }`}>$ 2.500.000</span>
              </div>
              <div className={dataRow} style={{
                borderColor: 'rgba(0,0,0,0.1)'
              }}
              >
                <span className={dataLabel} style={{
                  color  : 'inherit',
                  opacity: 0.8
                }}
                >Última Factura</span>
                <span className={dataValue}>FE-9921</span>
              </div>
            </section>
          </div>

          <div style={{
            display      : 'flex',
            flexDirection: 'column',
            gap          : 24
          }}
          >

            <section className={card}>
              <div className={cardHeader}>
                <span className={cardTitle}>Tareas Pendientes</span>
                <span className={cardIcon}>✅</span>
              </div>
              <div style={{
                display   : 'flex',
                gap       : 12,
                alignItems: 'center',
                padding   : '8px 0'
              }}
              >
                <input type="checkbox" style={{
                  width      : 18,
                  height     : 18,
                  accentColor: 'var(--primary)'
                }}
                />
                <div style={{
                  flex: 1
                }}
                >
                  <div style={{
                    fontWeight: 500
                  }}
                  >Solicitar Liquidación</div>
                  <div style={{
                    fontSize: '0.8rem',
                    color   : 'var(--error)'
                  }}
                  >Vence: Mañana</div>
                </div>
              </div>
              <div style={{
                display   : 'flex',
                gap       : 12,
                alignItems: 'center',
                padding   : '8px 0'
              }}
              >
                <input type="checkbox" checked style={{
                  width      : 18,
                  height     : 18,
                  accentColor: 'var(--primary)'
                }}
                />
                <div style={{
                  flex          : 1,
                  textDecoration: 'line-through',
                  opacity       : 0.6
                }}
                >
                  <div style={{
                    fontWeight: 500
                  }}
                  >Revisar Medidas Cautelares</div>
                </div>
              </div>
            </section>

            <section className={card}>
              <div className={cardHeader}>
                <span className={cardTitle}>Actuaciones Recientes</span>
                <span className={cardIcon}>📅</span>
              </div>

              <div className={timeline}>
                <div className={timelineItem}>
                  <div className={timelineDate}>28 Ene 2026</div>
                  <div className={timelineContent}>
                    <strong>Auto Libra Mandamiento Pago</strong>
                    <p style={{
                      fontSize : '0.9rem',
                      marginTop: '4px'
                    }}
                    >El juzgado emite orden de pago. Se debe notificar al demandado.</p>
                  </div>
                </div>

                <div className={timelineItem}>
                  <div className={timelineDate}>15 Dic 2025</div>
                  <div className={timelineContent} style={{
                    backgroundColor: 'var(--surface-variant)',
                    color          : 'var(--on-surface-variant)'
                  }}
                  >
                    <strong>Admisión Demanda</strong>
                    <p style={{
                      fontSize : '0.9rem',
                      marginTop: '4px'
                    }}
                    >Radicación aceptada en despacho.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={card} style={{
              borderStyle: 'dashed'
            }}
            >
              <div className={cardHeader}>
                <span className={cardTitle} style={{
                  fontSize: '1rem'
                }}
                >Notas Rápidas</span>
              </div>
              <p style={{
                fontSize: '0.9rem',
                color   : 'var(--on-surface-variant)'
              }}
              >
                Cliente indicó que cambiará de dirección el próximo mes. Pendiente actualizar base de datos.
              </p>
            </section>

          </div>
        </div>
      </div>

      <div className="fab" title="Nueva Actuación">
        +
      </div>
    </>

  );
}
