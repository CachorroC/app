// To parse this data:
//
//   import { Convert } from "./file";
//
//   const consultaActuacion = Convert.toConsultaActuacion(json);

export type Message =
  | 'OK'
  | 'Object reference not set to an instance of an object.'
  | 'No se pueden ver actuaciones de un proceso privado';

export type RequestActuacion = {
  StatusCode         : number;
  Message            : string;
  ConsultaActuaciones: ConsultaActuacion | null;
};

export type ConsultaActuacion = {
  actuaciones: intActuacion[];
  paginacion : Paginacion;
};

export interface intActuacion {
  actuacion     : string;
  anotacion     : null | string;
  cant          : number;
  codRegla      : string;
  conDocumentos : boolean;
  consActuacion : number;
  fechaActuacion: Date | string;
  fechaFinal    : Date | string |null;
  fechaInicial  : Date | string | null;
  fechaRegistro : Date | string;
  idRegActuacion: string;
  llaveProceso  : string;

};

export interface newActuacionWehookResponse extends intActuacion
{
  idProceso    : number;
  nombre       : string;
  carpetaNumero: number;
  carpetaId    : number;
  nombre       : string;
}

export type CodRegla = '00                              ';

export type Paginacion = {
  cantidadRegistros: number;
  registrosPagina  : number;
  cantidadPaginas  : number;
  pagina           : number;
  paginas          : null;
};

export type outActuacion = {
  createdAt?    : Date;
  idProceso     : number;
  isUltimaAct   : boolean;
  idRegActuacion: string;
  llaveProceso  : string;
  consActuacion : number;
  fechaActuacion: Date;
  actuacion     : string;
  anotacion     : null | string;
  fechaInicial  : Date | null;
  carpetaNumero : number | null;
  fechaFinal    : Date | null;
  fechaRegistro : Date;
  codRegla      : string;
  conDocumentos : boolean;
  cant          : number;
};
