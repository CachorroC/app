// To parse this data:
//
//   import { Convert } from "./file";
//
//   const prismaCarpeta = Convert.toPrismaCarpeta(json);

import { Decimal } from '@prisma/client/runtime/library';
import { Category, intNotificacion } from '../carpetas';
import { Juzgado } from '@prisma/client';

export interface PrismaCarpeta
{
  category: Category;
  codeudor: Codeudor | null;
  demandas: PrismaDemanda[];
  deudor: PrismaDeudor;
  fecha: Date | null;
  idProcesos: number[];
  idRegUltimaAct: number | null;
  juzgados: PrismaJuzgado[];
  llaveProceso: string;
  nombre: string;
  notas: PrismaNota[];
  notificacion: intNotificacion | null;
  numero: number;
  revisado: boolean;
  tareas: PrismaTarea[];

  terminado: boolean;
  tipoProceso: TipoProceso;
  updatedAt: Date;
  ultimaActuacion: PrismaUltimaActuacion | null;
}

export interface Codeudor {
  cedula: string | null;
  nombre: string | null;
  id: number;
  carpetaNumero: number;
  direccion: string | null;
  telefono: string | null;
}


export interface PrismaDemanda
{
  cantFilas: number | null;
  capitalAdeudado: Decimal  | null;
  carpetaNumero: number;
  departamento: string | null;
  despacho: string | null;
  entregaGarantiasAbogado: Date | null;
  esPrivado: boolean | null;
  etapaProcesal: null | string;
  fechaPresentacion: Date[];
  fechaProceso: Date | null;
  fechaUltimaActuacion: Date | null;
  idConexion: number | null;
  id: number;
  idProceso: number;
  llaveProceso: string | null;
  mandamientoPago: Date | null;
  municipio: string | null;
  obligacion: string[];
  radicado: null | string;
  sujetosProcesales: string | null;
  juzgado: Juzgado | null;
  tipoProceso: string;
  vencimientoPagare: Date[];

}

export type DemandaDepartamento = 'CUNDINAMARCA' | 'CUNDINNAMARCA' | 'TOLIMA' | 'CUN DINAMARCA' | 'BOYACÁ' | 'CUNDINAMRCA' | 'CNDINAMARCA' | 'ATLANTICO';


export type Departamento = 'BOGOTÁ' | 'CUNDINAMARCA' | 'TOLIMA' | 'CUN DINAMARCA' | 'CUNDINNAMARCA' | 'BOYACÁ' | 'CNDINAMARCA' | 'ANTIOQUIA';

export type TipoProceso = 'HIPOTECARIO' | 'PRENDARIO' | 'SINGULAR' | 'ACUMULADO';

export interface PrismaDeudor
{
  id: number;
  cedula: string | null;
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

export interface PrismaJuzgado
{
  id: number;
  tipo: string;
  url: string;
}

export interface PrismaNota
{
  id: number;
  date: Date;
  createdAt: Date;
  pathname: null | string;
  carpetaNumero: number|null;
  content: string | null;
  title: string;
  updatedAt: Date;
}

export interface PrismaProceso
{

  id: number;
  idProceso: number;
  idConexion: number;
  llaveProceso: string;
  fechaProceso: Date | null;
  fechaUltimaActuacion: Date | null;
  despacho: string;
  departamento: string;
  sujetosProcesales: string;
  carpetaNumero: number;
  esPrivado: boolean;
  cantFilas: number;
  demandaId: null;
}

export type ProcesoDepartamento = 'BOGOTÁ' | 'CUNDINAMARCA' | 'ANTIOQUIA' | 'META';


export interface PrismaTarea
{
  id: number;
  dueDate: Date | null;
  carpetaNumero: number | null;
  complete: boolean;
  content: string | null;
  createdAt: Date;
  title: string;
  updatedAt: Date;
  subTareas: PrismaSubPrismaTarea[];
}

export interface PrismaSubPrismaTarea
{
  id: number;
  text: string;
  date: Date | null;
  isComplete: boolean;
  tareaId: number | null;
}

export interface PrismaUltimaActuacion
{
  id: number;
  carpetaNumero: number| null;
  isUltimaAct: boolean;
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
  codRegla: string;
  conDocumentos: boolean;
  cant: number;
  idProceso: number;
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

  public static toPrismaDemanda (
    json: string
  ): PrismaDemanda {
            return JSON.parse(
              json
            );
  }

  public static PrismademandaToJson (
    value: PrismaDemanda
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toPrismaDeudor (
    json: string
  ): PrismaDeudor {
            return JSON.parse(
              json
            );
  }

  public static deudorToJson (
    value: PrismaDeudor
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toPrismaJuzgado (
    json: string
  ): PrismaJuzgado {
            return JSON.parse(
              json
            );
  }

  public static juzgadoToJson (
    value: PrismaJuzgado
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toPrismaNota (
    json: string
  ): PrismaNota {
            return JSON.parse(
              json
            );
  }

  public static notaToJson (
    value: PrismaNota
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toProceso (
    json: string
  ): PrismaProceso {
            return JSON.parse(
              json
            );
  }

  public static procesoToJson (
    value: PrismaProceso
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toPrismaTarea (
    json: string
  ): PrismaTarea {
            return JSON.parse(
              json
            );
  }

  public static tareaToJson (
    value: PrismaTarea
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toPrismaSubPrismaTarea (
    json: string
  ): PrismaSubPrismaTarea {
            return JSON.parse(
              json
            );
  }

  public static subPrismaTareaToJson (
    value: PrismaSubPrismaTarea
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toUltimaActuacion (
    json: string
  ): PrismaUltimaActuacion {
            return JSON.parse(
              json
            );
  }

  public static ultimaActuacionToJson (
    value: PrismaUltimaActuacion
  ): string {
            return JSON.stringify(
              value
            );
  }
}
