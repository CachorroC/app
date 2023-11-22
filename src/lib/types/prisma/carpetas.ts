// To parse this data:
//
//   import { Convert } from "./file";
//
//   const prismaCarpeta = Convert.toPrismaCarpeta(json);

export interface PrismaCarpeta
{
  id: number;
  numero: number;
  llaveProceso: null | string;
  nombre: string;
  idProcesos: number[];
  category: Category;
  fecha: Date | null;
  demanda: Demanda | null;
  deudor: Deudor;
  ultimaActuacion: UltimaActuacion | null;
  juzgados: Juzgado[];
  procesos: Proceso[];
  notas: Nota[];
  tareas: Tarea[];
}

export type Category = 'Terminados' | 'LiosJuridicos' | 'Bancolombia' | 'Reintegra' | 'Insolvencia';

export interface Demanda
{
  id: number;
  departamento: Departamento;
  capitalAdeudado: string;
  entregaGarantiasAbogado: Date | null;
  tipoProceso: TipoProceso;
  mandamientoPago: Date | null;
  etapaProcesal: null | string;
  fechaPresentacion: Date | null;
  municipio: string;
  obligacion: string[];
  radicado: null | string;
  vencimientoPagare: Date[];
  expediente: null | string;
  carpetaNumero: number;
  despacho: null;
}

export type Departamento = 'BOGOTÁ' | 'CUNDINAMARCA' | 'TOLIMA' | 'CUN DINAMARCA' | 'CUNDINNAMARCA' | 'BOYACÁ' | 'CNDINAMARCA' | 'ANTIOQUIA';

export type TipoProceso = 'HIPOTECARIO' | 'PRENDARIO' | 'SINGULAR' | 'ACUMULADO';

export interface Deudor
{
  id: number;
  cedula: string;
  primerNombre: string;
  primerApellido: string;
  segundoNombre: null | string;
  segundoApellido: null | string;
  direccion: null | string;
  email: null | string;
  telCelular: null | string;
  telFijo: null | string;
  carpetaNumero: number;
}

export interface Juzgado
{
  id: number;
  tipo: string;
  url: string;
}

export interface Nota
{
  id: number;
  date: Date;
  createdAt: Date;
  pathname: null | string;
  carpetaNumero: number;
  content: string;
  title: string;
  updatedAt: Date;
}

export interface Proceso
{
  idProceso: number;
  idConexion: number;
  llaveProceso: string;
  fechaProceso: Date;
  fechaUltimaActuacion: Date | null;
  despacho: string;
  departamento: Departamento;
  sujetosProcesales: string;
  esPrivado: boolean;
  cantFilas: number;
  carpetaNumero: number;
}

export interface Tarea
{
  id: number;
  dueDate: null;
  carpetaId: number;
  complete: boolean;
  content: string;
  createdAt: Date;
  title: string;
  updatedAt: Date;
  subTareas: SubTarea[];
}

export interface SubTarea
{
  text: string;
  date: Date;
  isComplete: boolean;
  tareaId: number;
}

export interface UltimaActuacion
{
  createdAt: Date;
  idRegActuacion: number;
  llaveProceso: string;
  consActuacion: number;
  fechaActuacion: Date;
  actuacion: string;
  anotacion: null | string;
  fechaInicial: Date | null;
  fechaRegistro: Date;
  fechaFinal: Date | null;
  codRegla: CodRegla;
  conDocumentos: boolean;
  cant: number;
  carpetaNumero: number;
  procesoIdProceso: null;
}

export type CodRegla = '00                              ';

// Converts JSON strings to/from your types
export class Convert {
  public static toPrismaCarpeta (
    json: string
  ): PrismaCarpeta {
            return JSON.parse(
              json
            );
  }

  public static prismaCarpetaToJson (
    value: PrismaCarpeta
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toDemanda (
    json: string
  ): Demanda {
            return JSON.parse(
              json
            );
  }

  public static demandaToJson (
    value: Demanda
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toDeudor (
    json: string
  ): Deudor {
            return JSON.parse(
              json
            );
  }

  public static deudorToJson (
    value: Deudor
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toJuzgado (
    json: string
  ): Juzgado {
            return JSON.parse(
              json
            );
  }

  public static juzgadoToJson (
    value: Juzgado
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toNota (
    json: string
  ): Nota {
            return JSON.parse(
              json
            );
  }

  public static notaToJson (
    value: Nota
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toProceso (
    json: string
  ): Proceso {
            return JSON.parse(
              json
            );
  }

  public static procesoToJson (
    value: Proceso
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toTarea (
    json: string
  ): Tarea {
            return JSON.parse(
              json
            );
  }

  public static tareaToJson (
    value: Tarea
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toSubTarea (
    json: string
  ): SubTarea {
            return JSON.parse(
              json
            );
  }

  public static subTareaToJson (
    value: SubTarea
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toUltimaActuacion (
    json: string
  ): UltimaActuacion {
            return JSON.parse(
              json
            );
  }

  public static ultimaActuacionToJson (
    value: UltimaActuacion
  ): string {
            return JSON.stringify(
              value
            );
  }
}
