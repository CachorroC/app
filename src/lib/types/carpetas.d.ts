// To parse this data:
//
//   import { Convert } from "./file";
//
//   const intCarpeta = Convert.toIntCarpeta(json);

import { DatabaseActuacionType } from './actuaciones';
import { outProceso } from './procesos';
import { WithId } from 'mongodb';
import { IntNota } from './notas';



/** Derived lifecycle state used by the UI for the StatusChip. */
export type CaseStatus = 'active' | 'review' | 'done' | 'overdue';

export type DashboardView = 'tabla' | 'tarjetas';

export type DetailView = 'tabs' | 'doc';

export type IntCarpeta = {
  category           : string;
  ciudad             : string | null;
  codeudor           : Codeudor | null;
  demanda            : intDemanda;
  deudor             : Deudor | null;
  fecha              : Date | null;
  fechaUltimaRevision: Date | null;
  id                 : number;
  idProcesos         : string[];
  idRegUltimaAct     : string | null;
  juzgado            : Juzgado | null;
  juzgadoCiudad      : string | null;
  juzgadoId          : string | null;
  juzgadoTipo        : string | null;
  llaveProceso       : string;
  nombre             : string;
  notas              : IntNota[];
  notasCount         : number | null;
  numero             : number;
  procesos           : outProceso[];
  revisado           : boolean;
  terminado          : boolean;
  tipoProceso        : string;
  ultimaActuacion    : DatabaseActuacionType | null;
  updatedAt          : Date;
};

export type Category =
  | 'Terminados'
  | 'Reintegra'
  | 'Bancolombia'
  | 'Insolvencia'
  | 'LiosJuridicos'
  | 'todos'
  | 'SinEspecificar';

export enum CategoryEnum {
  Bancolombia = 'Bancolombia',
  Reintegra = 'Reintegra',
  Insolvencia = 'Insolvencia',
  LiosJuridicos = 'LiosJuridicos',
  Terminados = 'Terminados',
  SinTercero = 'SinTercero',
  SinEspecificar = 'SinEspecificar',
}

export type Codeudor = {
  carpetaNumero: number;
  cedula       : null | string;
  direccion    : null | string;
  id           : number;
  nombre       : null | string;
  telefono     : null | string;
};

export type intDemanda = {
  avaluo                 : null | number;
  capitalAdeudado        : null | number;
  carpetaNumero          : number;
  departamento           : string | null;
  despacho               : null | string;
  entregaGarantiasAbogado: Date | null;
  etapaProcesal          : null | string;
  fechaPresentacion      : Date[];
  id                     : number;
  liquidacion            : number | null;
  llaveProceso           : string | null;
  mandamientoPago        : Date[];
  municipio              : string | null;
  obligacion             : string[];
  radicado               : null | string;
  tipoProceso            : string;
  vencimientoPagare      : Date[];
};

export type intDemandaDepartamento =
  | 'CUNDINAMARCA'
  | 'CUNDINNAMARCA'
  | 'TOLIMA'
  | 'CUN DINAMARCA'
  | 'BOYACÁ'
  | 'CUNDINAMRCA'
  | 'CNDINAMARCA'
  | 'ATLANTICO';

export type TipoProceso =
  | 'SINGULAR'
  | 'PRENDARIO'
  | 'HIPOTECARIO'
  | 'ACUMULADO';

export enum TipoProcesoEnum {
  HIPOTECARIO = 'HIPOTECARIO',
  PRENDARIO = 'PRENDARIO',
  SINGULAR = 'SINGULAR',
  ACUMULADO = 'ACUMULADO',
}

export type Deudor = {
  carpetaNumero  : number;
  cedula         : string;
  direccion      : null | string;
  email          : null | string;
  id             : number;
  primerApellido : string;
  primerNombre   : string;
  segundoApellido: null | string;
  segundoNombre  : null | string;
  telCelular     : null | string;
  telFijo        : null | string;
};

export type ProcesoDepartamento =
  | 'BOGOTÁ'
  | 'CUNDINAMARCA'
  | 'ANTIOQUIA'
  | 'META';

export type Juzgado = {
  id    : string;
  tipo  : string;
  url   : string;
  ciudad: string;
};

export type CodRegla = '00                              ';

export interface MonCarpeta extends IntCarpeta {
  id: number;
}

// Converts JSON strings to/from your types
export class carpetaConvert {
  public static toIntCarpeta( json: string ): IntCarpeta {
    return JSON.parse( json );
  }

  public static toIntCarpetas( json: string ): IntCarpeta[] {
    return JSON.parse( json );
  }

  public static toMonCarpeta( carpeta: WithId<IntCarpeta> ): MonCarpeta {
    return {
      ...carpeta,
      fecha: carpeta.fecha
        ? new Date( carpeta.fecha )
        : null,
      idRegUltimaAct: carpeta.idRegUltimaAct
        ? carpeta.idRegUltimaAct
        : null,
      ultimaActuacion: carpeta.ultimaActuacion
        ? carpeta.ultimaActuacion
        : null,
      nombre: carpeta.deudor
        ? `${ carpeta.deudor.primerNombre } ${ carpeta.deudor.segundoNombre } ${ carpeta.deudor.primerApellido } ${ carpeta.deudor.segundoApellido }`
        : carpeta.nombre,
    };
  }
  public static toMonCarpetas( carpetas: WithId<IntCarpeta>[] ): MonCarpeta[] {
    return carpetas.map( ( carpeta ) => {
      return this.toMonCarpeta( carpeta );
    } );
  }

  public static toCodeudor( json: string ): Codeudor {
    return JSON.parse( json );
  }

  public static codeudorToJson( value: Codeudor ): string {
    return JSON.stringify( value );
  }

  public static tointDemanda( json: string ): intDemanda {
    return JSON.parse( json );
  }

  public static demandaToJson( value: intDemanda ): string {
    return JSON.stringify( value );
  }

  public static toDeudor( json: string ): Deudor {
    return JSON.parse( json );
  }

  public static deudorToJson( value: Deudor ): string {
    return JSON.stringify( value );
  }

  public static toNota( json: string ): IntNota {
    return JSON.parse( json );
  }

  public static notaToJson( value: IntNota ): string {
    return JSON.stringify( value );
  }

  public static toJuzgado( json: string ): Juzgado {
    return JSON.parse( json );
  }

  public static juzgadoToJson( value: Juzgado ): string {
    return JSON.stringify( value );
  }
}

export type KeyOfCarpeta = keyof IntCarpeta;
