import React from 'react';
import styles from '#@/styles/legalDashboard.module.css';
import { Category } from '#@/lib/types/carpetas';


export interface Juzgado {
  id    : string;
  tipo  : string;
  ciudad: string;
  url   : string;
}

export interface Actuacion {
  actuacion     : string;
  anotacion     : string | null;
  cant          : number;
  carpetaNumero : number | null;
  codRegla      : string;
  conDocumentos : boolean;
  consActuacion : number;
  createdAt     : Date;
  fechaActuacion: Date;
  fechaFinal    : Date | null;
  fechaInicial  : Date | null;
  fechaRegistro : Date;
  idProceso     : string;
  idRegActuacion: string;
  isUltimaAct   : boolean;
  llaveProceso  : string;
  procesoId     : string;
}

export interface Proceso {
  cantFilas           : number;
  carpetaNumero       : number;
  departamento        : string;
  despacho            : string;
  esPrivado           : boolean;
  fechaProceso        : Date | null;
  fechaUltimaActuacion: Date | null;
  idConexion          : number;
  idProceso           : string;
  juzgadoCiudad       : string;
  juzgadoId           : string;
  juzgadoTipo         : string;
  llaveProceso        : string;
  sujetosProcesales   : string;
  juzgado             : Juzgado;
  actuaciones         : Actuacion[];
}

export interface Carpeta {
  id                 : number;
  fecha              : Date | null;
  idProcesos         : string[];
  llaveProceso       : string;
  nombre             : string;
  numero             : number;
  revisado           : boolean;
  terminado          : boolean;
  updatedAt          : Date;
  category           : string;
  tipoProceso        : string;
  notasCount         : number | null;
  fechaUltimaRevision: Date | null;
  ciudad             : string | null;
  juzgadoTipo        : string | null;
  juzgadoCiudad      : string | null;
  juzgadoId          : string | null;
  idRegUltimaAct     : string | null;
  ultimaActuacion?   : Actuacion | null;
  juzgado?           : Juzgado | null;
  procesos           : Proceso[];
}

interface DashboardProps {
  carpeta: Carpeta;
}

const formatDate = ( date: Date | null | undefined ): string => {
  if ( !date ) {
    return 'N/A';
  }

  return new Intl.DateTimeFormat(
    'es-CO', {
      year  : 'numeric',
      month : 'short',
      day   : 'numeric',
      hour  : '2-digit',
      minute: '2-digit',
    }
  )
    .format( new Date( date ) );
};

const DataItem = ( {
  label, value
}: { label: string; value: React.ReactNode } ) => {
  return (
    <div className={styles.dataItem}>
      <span className={styles.dataLabel}>{label}</span>
      <span className={styles.dataValue}>
        {value !== null && value !== undefined && value !== ''
          ? value
          : <span style={{
              color: '#94a3b8'
            }}
            >N/A</span>}
      </span>
    </div>
  );
};

const JuzgadoInfo = ( {
  juzgado, title = 'Juzgado Asignado'
}: { juzgado: Juzgado; title?: string } ) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <div className={styles.dataGrid}>
        <DataItem label="ID Juzgado" value={juzgado.id} />
        <DataItem label="Tipo" value={juzgado.tipo} />
        <DataItem label="Ciudad" value={juzgado.ciudad} />
        <DataItem
          label="Enlace Oficial"
          value={
            <a href={juzgado.url} target="_blank" rel="noreferrer" style={{
              color         : '#2563eb',
              textDecoration: 'none',
              fontWeight    : 600
            }}
            >
              Abrir URL ↗
            </a>
          }
        />
      </div>
    </div>
  );
};

const ActuacionItem = ( {
  actuacion
}: { actuacion: Actuacion } ) => {
  return (
    <div className={styles.timelineItem}>
      <span className={styles.actuacionHeader}>{actuacion.actuacion}</span>
      <span className={styles.actuacionDate}>{formatDate( actuacion.fechaActuacion )}</span>

      {actuacion.anotacion && (
        <div className={styles.actuacionNote}>{actuacion.anotacion}</div>
      )}

      <div className={styles.actuacionDetailsGrid}>
        <DataItem label="ID Registro" value={actuacion.idRegActuacion} />
        <DataItem label="Regla / Cons" value={`${ actuacion.codRegla } / ${ actuacion.consActuacion }`} />
        <DataItem label="Inicio - Fin" value={`${ formatDate( actuacion.fechaInicial ) } a ${ formatDate( actuacion.fechaFinal ) }`} />
        <DataItem label="Registro / Creación" value={`${ formatDate( actuacion.fechaRegistro ) } / ${ formatDate( actuacion.createdAt ) }`} />
        <DataItem label="Docs Adjuntos" value={actuacion.conDocumentos
          ? 'Sí'
          : 'No'}
        />
        <DataItem label="Es Última" value={actuacion.isUltimaAct
          ? 'Sí'
          : 'No'}
        />
      </div>
    </div>
  );
};

const ProcesoCard = ( {
  proceso
}: { proceso: Proceso } ) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          {proceso.idProceso}
          {proceso.esPrivado && <span className={`${ styles.badge } ${ styles.badgePrimary }`}>Privado</span>}
        </h3>
        <div className={styles.cardSubtitle}>
          <strong>Sujetos:</strong> {proceso.sujetosProcesales}
        </div>
      </div>

      <div className={styles.dataGrid}>
        <DataItem label="Llave Proceso" value={proceso.llaveProceso} />
        <DataItem label="ID Conexión" value={proceso.idConexion} />
        <DataItem label="Carpeta" value={`#${ proceso.carpetaNumero }`} />
        <DataItem label="Despacho" value={proceso.despacho} />
        <DataItem label="Ubicación" value={`${ proceso.juzgadoCiudad }, ${ proceso.departamento }`} />
        <DataItem label="Fecha Proceso" value={formatDate( proceso.fechaProceso )} />
        <DataItem label="Últ. Actuación" value={formatDate( proceso.fechaUltimaActuacion )} />
        <DataItem label="Cant. Filas" value={proceso.cantFilas} />
      </div>

      <h4 className={styles.sectionTitle}>Detalles del Juzgado</h4>
      <div className={styles.dataGrid}>
        <DataItem label="Juzgado ID" value={proceso.juzgadoId} />
        <DataItem label="Tipo" value={proceso.juzgadoTipo} />
        <DataItem label="Ciudad" value={proceso.juzgadoCiudad} />
      </div>

      {proceso.actuaciones && proceso.actuaciones.length > 0 && (
        <>
          <h4 className={styles.sectionTitle}>Historial de Actuaciones ({proceso.actuaciones.length})</h4>
          <div className={styles.timeline}>
            {proceso.actuaciones.map( (
              act, index
            ) => {
              return (
                <ActuacionItem key={act.idRegActuacion || index} actuacion={act} />
              );
            } )}
          </div>
        </>
      )}
    </div>
  );
};

export const CarpetaDashboard: React.FC<DashboardProps> = ( {
  carpeta
} ) => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>

        {/* Sidebar / Top Metadata Panel */}
        <div className={styles.sidebarPanel}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                {carpeta.nombre}
                {carpeta.terminado
                  ? (
                      <span className={`${ styles.badge } ${ styles.badgeSuccess }`}>Terminado</span>
                    )
                  : (
                      <span className={`${ styles.badge } ${ styles.badgeWarning }`}>Activo</span>
                    )}
                {carpeta.revisado && <span className={`${ styles.badge } ${ styles.badgePrimary }`}>Revisado</span>}
              </h2>
              <div className={styles.cardSubtitle}>
                Carpeta #{carpeta.numero} • {carpeta.tipoProceso}
              </div>
            </div>

            <div className={styles.dataGrid}>
              <DataItem label="ID Interno" value={carpeta.id} />
              <DataItem label="Categoría" value={carpeta.category} />
              <DataItem label="Llave Proceso" value={carpeta.llaveProceso} />
              <DataItem label="Fecha" value={formatDate( carpeta.fecha )} />
              <DataItem label="Última Actualización" value={formatDate( carpeta.updatedAt )} />
              <DataItem label="Última Revisión" value={formatDate( carpeta.fechaUltimaRevision )} />
              <DataItem label="Notas Vinculadas" value={carpeta.notasCount} />
              <DataItem label="Ciudad" value={carpeta.ciudad} />
              <DataItem label="Juzgado Relacionado" value={`${ carpeta.juzgadoTipo || '' } ${ carpeta.juzgadoCiudad || '' }`} />
              <DataItem label="Reg. Última Act." value={carpeta.idRegUltimaAct} />
              <DataItem label="IDs Procesos" value={carpeta.idProcesos.join( ', ' )} />
            </div>
          </div>

          {carpeta.juzgado && (
            <JuzgadoInfo juzgado={carpeta.juzgado} title="Juzgado de la Carpeta" />
          )}

          {carpeta.ultimaActuacion && (
            <div className={styles.card}>
              <h3 className={styles.sectionTitle} style={{
                marginTop: 0
              }}
              >Última Actuación Global</h3>
              <ActuacionItem actuacion={carpeta.ultimaActuacion} />
            </div>
          )}
        </div>

        {/* Main Process Grid Area */}
        <div className={styles.mainPanel}>
          <div className={styles.procesosGrid}>
            {carpeta.procesos.map( ( proceso ) => {
              return (
                <ProcesoCard key={proceso.idProceso} proceso={proceso} />
              );
            } )}
            {carpeta.procesos.length === 0 && (
              <div className={styles.card} style={{
                textAlign: 'center',
                padding  : '3rem 1.5rem'
              }}
              >
                <p style={{
                  color   : '#64748b',
                  fontSize: '1.1rem',
                  margin  : 0
                }}
                >
                  No hay procesos vinculados a esta carpeta actualmente.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};