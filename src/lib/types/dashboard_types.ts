// ============================================================
// Asesor Jurídico — domain types
// Derived from prisma/schema.prisma. These mirror the Prisma models
// closely enough for the UI layer; swap for generated Prisma types
// (import type { Carpeta } from '@/prisma/generated/prisma') once wired.
// ============================================================

export enum Category {
  Bancolombia = 'Bancolombia',
  Reintegra = 'Reintegra',
  Insolvencia = 'Insolvencia',
  LiosJuridicos = 'LiosJuridicos',
  Terminados = 'Terminados',
  SinTercero = 'SinTercero',
  SinEspecificar = 'SinEspecificar',
}

export enum TipoProceso {
  HIPOTECARIO = 'HIPOTECARIO',
  PRENDARIO = 'PRENDARIO',
  SINGULAR = 'SINGULAR',
  ACUMULADO = 'ACUMULADO',
}

/** Derived lifecycle state used by the UI for the StatusChip. */
export type CaseStatus = 'active' | 'review' | 'done' | 'overdue';

export type DashboardView = 'tabla' | 'tarjetas';

export type DetailView = 'tabs' | 'doc';

export interface Deudor {
  id              : number;
  primerNombre    : string;
  segundoNombre?  : string | null;
  primerApellido  : string;
  segundoApellido?: string | null;
  cedula          : string;
  direccion?      : string | null;
  email?          : string | null;
  telCelular?     : string | null;
  telFijo?        : string | null;
}

export interface Codeudor {
  id        : number;
  nombre    : string;
  cedula?   : string | null;
  telefono? : string | null;
  direccion?: string | null;
}

export interface Juzgado {
  id    : string;
  nombre: string;
  tipo  : string;
  ciudad: string;
  url?  : string | null;
}

export interface MedidasCautelares {
  medidaSolicitada: string;
  fechaOrdena?    : string | null; // ISO date
}

export interface Notificacion {
  certimail      : boolean;
  fisico         : boolean;
  autoNotificado?: string | null; // ISO date
}

export interface Demanda {
  id                : number;
  departamento      : string;
  municipio         : string;
  despacho          : string;
  etapaProcesal     : string;
  tipoProceso       : string;
  radicado          : string;
  capitalAdeudado   : number;
  avaluo            : number;
  liquidacion       : number;
  obligacion        : string[];
  fechaPresentacion?: string | null;
  vencimientoPagare?: string | null;
  mandamientoPago?  : string | null;
  entregaGarantias? : string | null;
  medidas           : MedidasCautelares;
  notif             : Notificacion;
}

export interface Actuacion {
  id           : number;
  fecha        : string;       // ISO date
  actuacion    : string;
  anotacion    : string;
  conDocumentos: boolean;
  isUltima?    : boolean;
}

export interface Proceso {
  idProceso            : string;
  despacho             : string;
  departamento         : string;
  juzgado              : string;
  fechaProceso?        : string | null;
  fechaUltimaActuacion?: string | null;
  cantFilas            : number;
  esPrivado            : boolean;
  sujetosProcesales    : string;
}

export interface EmisorDeFactura {
  razonSocial: string;
}

export interface Factura {
  id         : string;
  fecha      : string;
  razonSocial: string;
  concepto   : string;
  valorBase  : number;
  valorTotal : number;
  estado     : 'Pagada' | 'Pendiente' | 'Anulada';
}

export interface Nota {
  id       : string;
  text     : string;
  content  : string[];
  createdAt: string;
  dueDate? : string | null;
  completed: boolean;
}

export interface Task {
  id      : number;
  text    : string;
  dueDate?: string | null;
  done    : boolean;
}

/** A Carpeta with all of its connected relations eagerly loaded. */
export interface Carpeta {

  actuaciones : Actuacion[];      // newest first
  avaluo      : number;
  capital     : number;
  category    : Category;
  ciudad      : string;
  codeudor?   : Codeudor | null;
  demanda     : Demanda;
  deudor      : Deudor;
  etapa       : string;
  facturas    : Factura[];
  fecha       : string;                // ISO date — fecha de apertura
  juzgado     : Juzgado;
  liquidacion : number;
  llaveProceso: string;
  nombre      : string;
  notas       : Nota[];
  numero      : number;
  procesos    : Proceso[];
  radicado    : string;
  revisado    : boolean;
  status      : CaseStatus;
  tareas      : Task[];
  terminado   : boolean;
  tipoProceso : TipoProceso;
  vencido     : boolean;
}

/** Convenience: the most recent actuación (drives the dashboard column). */
export type UltimaActuacion = Pick<Actuacion, 'actuacion' | 'anotacion' | 'fecha' | 'conDocumentos'>;
