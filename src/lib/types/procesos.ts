// To parse this data:
//
//   import { Convert, ConsultaNumeroRadicacion } from "./file";
//
//   const consultaNumeroRadicacion = Convert.toConsultaNumeroRadicacion(json);

export interface ConsultaNumeroRadicacion {
  tipoConsulta: string;
  procesos: Proceso[];
  parametros: Parametros;
  paginacion: Paginacion;
}

export interface Paginacion {
  cantidadRegistros: number;
  registrosPagina: number;
  cantidadPaginas: number;
  pagina: number;
  paginas: null;
}

export interface Parametros {
  numero: string;
  nombre: null;
  tipoPersona: null;
  idSujeto: null;
  ponente: null;
  claseProceso: null;
  codificacionDespacho: null;
  soloActivos: boolean;
}

export interface Proceso {
  idProceso: number;
  idConexion: number;
  llaveProceso: string;
  fechaProceso: Date | null;
  fechaUltimaActuacion: Date | null;
  despacho: string;
  departamento: string;
  sujetosProcesales: string;
  esPrivado: boolean;
  cantFilas: number;
}

// Converts JSON strings to/from your types
export class procesosConvert {
  public static toConsultaNumeroRadicacion(
    json: string,
  ): ConsultaNumeroRadicacion {
    return JSON.parse(
      json 
    );
  }

  public static consultaNumeroRadicacionToJson(
    value: ConsultaNumeroRadicacion,
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static toPaginacion(
    json: string 
  ): Paginacion {
    return JSON.parse(
      json 
    );
  }

  public static paginacionToJson(
    value: Paginacion 
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static toParametros(
    json: string 
  ): Parametros {
    return JSON.parse(
      json 
    );
  }

  public static parametrosToJson(
    value: Parametros 
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static toProceso(
    json: string 
  ): Proceso {
    return JSON.parse(
      json 
    );
  }

  public static procesoToJson(
    value: Proceso 
  ): string {
    return JSON.stringify(
      value 
    );
  }
}
