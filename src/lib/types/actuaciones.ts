// To parse this data:
//
//   import { Convert, ConsultaActuacion } from "./file";
//
//   const consultaActuacion = Convert.toConsultaActuacion(json);

export interface ConsultaActuacion {
  actuaciones: Actuacion[];
  paginacion: Paginacion;
}

export interface Actuacion {
  idRegActuacion: number;
  llaveProceso: string;
  consActuacion: number;
  fechaActuacion: string;
  actuacion: string;
  anotacion: null | string;
  fechaInicial: null | string;
  fechaFinal: null | string;
  fechaRegistro: string;
  codRegla: CodRegla;
  conDocumentos: boolean;
  cant: number;
}

export type CodRegla = '00                              ';

export interface Paginacion {
  cantidadRegistros: number;
  registrosPagina: number;
  cantidadPaginas: number;
  pagina: number;
  paginas: null;
}

// Converts JSON strings to/from your types
export class actuacionConvert {
  public static toConsultaActuacion(
    json: string 
  ): ConsultaActuacion {
    const parsed: ConsultaActuacion = JSON.parse(
      json 
    );

    return parsed;
  }

  public static consultaActuacionToJson(
    value: ConsultaActuacion 
  ): string {
    return JSON.stringify(
      value 
    );
  }

  public static toActuacion(
    json: string 
  ): Actuacion {
    return JSON.parse(
      json 
    );
  }

  public static actuacioneToJson(
    value: Actuacion 
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
}
