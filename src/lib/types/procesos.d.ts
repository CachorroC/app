// To parse this data:
//
//   import { Convert, ConsultaNumeroRadicacion } from "./file";
//
//   const consultaNumeroRadicacion = Convert.toConsultaNumeroRadicacion(json);

import { Juzgado } from './carpetas';

export type RequestProceso = {
  StatusCode:        number;
  Message:           Message;
  ConsultaProcesos?: ConsultaNumeroRadicacion;
}

export type ConsultaNumeroRadicacion = {
  tipoConsulta: TipoConsulta;
  procesos:     intProceso[];
  parametros:   Parametros;
  paginacion:   Paginacion;
}

export type Paginacion = {
  cantidadRegistros: number;
  registrosPagina:   number;
  cantidadPaginas:   number;
  pagina:            number;
  paginas:           null;
}

export type Parametros = {
  numero:               string;
  nombre:               null;
  tipoPersona:          null;
  idSujeto:             null;
  ponente:              null;
  claseProceso:         null;
  codificacionDespacho: null;
  soloActivos:          boolean;
}



export type Message =
  | 'OK'
  | 'El parametro "NumeroRadicacion" ha de contener 23 digitos.'
  | 'Object reference not set to an instance of an object.'
  | 'No se pueden ver actuaciones de un proceso privado';


export type intProceso  = {
  idProceso:            number;
  idConexion:           number;
  llaveProceso:         string;
  fechaProceso:         Date | null;
  fechaUltimaActuacion: Date | null;
  despacho:             string;
  departamento:         Departamento;
  sujetosProcesales:    string;
  esPrivado:            boolean;
  cantFilas:            number;
}

export type Departamento = 'BOGOTÁ' | 'CUNDINAMARCA' | 'META' | 'HUILA' | 'ANTIOQUIA' | 'ATLÁNTICO';

export type TipoConsulta = 'NumeroRadicacion';

export type outProceso ={
  fechaProceso: Date | null;
  fechaUltimaActuacion: Date | null;
  juzgado: Juzgado;
  idProceso: number;
  idConexion: number;
  llaveProceso: string;
  despacho: string;
  departamento: string;
  sujetosProcesales: string;
  esPrivado: boolean;
  cantFilas: number;
}
