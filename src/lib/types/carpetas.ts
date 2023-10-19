import { WithId } from 'mongodb';
import { intActuacion } from './actuaciones';
import { intProceso } from './procesos';

export interface NuevaCarpeta {
  numero: number;
  category: Category;
  deudor: {
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido?: string;
    cedula: number;

    direccion?: string;
    email?: string;
    tel: {
      celular?: number;
      fijo?: number;
    };
  };
  demanda: {
    capitalAdeudado: number;
    entregaGarantiasAbogado: string; //? Date
    obligacion: Obligacion[] | null;
    tipoProceso: TipoProceso;
    vencimientoPagare: string[]; //?Date[]
    fechaPresentacion?: string; //?Date
  };
}

export interface IntCarpeta {
    _id:              string;
    llaveProceso:     null | string;
    category:         Category;
    numero:           number;
    tipoProceso:      TipoProceso;
    deudor:           intDeudor;
    cc:               number | null;
    idProcesos:       number[];
    demanda:          intDemanda;
    fecha?:           Date;
    ultimaActuacion?: intActuacion;
    procesos?:        intProceso[];
    codeudor?:        intCodeudor;
}

export type Category =
  | 'Terminados'
  | 'LiosJuridicos'
  | 'Bancolombia'
  | 'Reintegra'
  | 'Insolvencia'
  | 'sin Especificar'
  | 'todos';

export interface intDemanda {
  capitalAdeudado: number | null;
  entregaGarantiasAbogado: Date | null;
  etapaProcesal: null | string;
  expediente: null | string;
  fechaPresentacion: Date | null;
  juzgados: intJuzgado[] | null;
  municipio: string;
  tipoProceso: TipoProceso;
    mandamientoPago:         Date | null;
    obligacion:              Array<number | string>;
    radicado:                null | string;
    vencimientoPagare:       Array<Date | null>;
    departamento:            Departamento;
    despacho?:               string;
    sujetosProcesales?:      string;
}

export type Obligacion = number | string;

export type Departamento =
  | 'CUNDINAMARCA'
  | 'TOLIMA'
  | 'BOYACÁ'
  | 'depto'
  | 'VAUPES'
  | 'CASANARE'
  | 'CESAR';

export interface intJuzgado {
  id: number;
  tipo: string;
  url: string;
}

export interface intDeudor {
  tel: intTel;
  primerNombre: string;
  segundoNombre: string | null;
  primerApellido: string;
  segundoApellido: string | null;
  cedula: number | null;
  direccion: string | null;
  email: string | null;
}

export interface intTel {
  fijo: number | null;
  celular: number | null;
}

export interface intCodeudor {
    cedula?:    number | string;
    nombre?:    number | string;
    direccion?: number | string;
    telefono?:  number | string;
}

export type TipoProceso =
  | 'HIPOTECARIO'
  | 'PRENDARIO'
  | 'ACUMULADO'
  | 'SINGULAR'
  | 'SINGULAR ACUMULADO CON HIPOTECARIO'
  | 'SINGULAR ACUM HIPOTECARIO'
  | '11001400308320170071700'
  | '25473418900120170092400'
  | 'PRENDARO'
  | ' HIPOTECARIO'
  | 'HMM PISO 1'
  | '  SINGULAR'
  | 'HIPOTECARIA'
  | 'HIPOTECARO'
  | 'SINGULAR ACUMULADO CON HIPOTECARIO CAJA SOCIAL'
  | 'SOACHA'
  | 'HIPOTECARIO ';

export type CodRegla = '00                              ';

export interface MonCarpeta extends IntCarpeta
{
  llaveProceso: string | null;
  fecha?: Date;
  ultimaActuacion?: intActuacion;
  _id: string;
  nombre: string;
}

export type CarpetaKeys = keyof MonCarpeta;

export type NuevaCarpetaKeys = keyof NuevaCarpeta;

export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

// Converts JSON strings to/from your types

export class carpetaConvert {
  public static demandaToJson(
    value: intDemanda
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static departamentoToJson(
    value: Departamento
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static deudorToJson(
    value: intDeudor
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static intCarpetasToJson(
    value: IntCarpeta[]
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static intCarpetaToJson(
    value: IntCarpeta
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static juzgadoToJson(
    value: intJuzgado
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static telToJson(
    value: intTel
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toDemanda(
    json: string
  ): intDemanda {
    return JSON.parse(
      json
    );
  }

  public static toDepartamento(
    json: string
  ): Departamento {
    return JSON.parse(
      json
    );
  }

  public static toDeudor(
    json: string
  ): intDeudor {
    return JSON.parse(
      json
    );
  }

  public static toIntCarpeta(
    json: string
  ): IntCarpeta {
    return JSON.parse(
      json
    );
  }

  public static toIntCarpetas(
    json: string
  ): IntCarpeta[] {
    return JSON.parse(
      json
    );
  }

  public static toJuzgado(
    json: string
  ): intJuzgado {
    return JSON.parse(
      json
    );
  }

  public static toMonCarpeta(
    carpeta: WithId<IntCarpeta>
  ): MonCarpeta {
    const pN
      = carpeta.deudor.primerNombre.charAt(
        0
      )
        .toUpperCase()
      + carpeta.deudor.primerNombre.toLowerCase()
        .slice(
          1
        );

    const pA
      = carpeta.deudor.primerApellido.charAt(
        0
      )
        .toUpperCase()
      + carpeta.deudor.primerApellido.toLowerCase()
        .slice(
          1
        );

    const sN
      = carpeta.deudor.segundoNombre
      && carpeta.deudor.segundoNombre.charAt(
        0
      )
        .toUpperCase()
        + carpeta.deudor.segundoNombre.toLowerCase()
          .slice(
            1
          );

    const sA
      = carpeta.deudor.segundoApellido
      && carpeta.deudor.segundoApellido.charAt(
        0
      )
        .toUpperCase()
        + carpeta.deudor.segundoApellido.toLowerCase()
          .slice(
            1
          );

    return {
      ...carpeta,
      _id         : carpeta._id.toString(),
      llaveProceso: carpeta.llaveProceso
        ? carpeta.llaveProceso
        : null,
      deudor: {
        ...carpeta.deudor,
        primerNombre   : pN,
        primerApellido : pA,
        segundoNombre  : sN,
        segundoApellido: sA,
      },
      get nombre() {
        const nombres
          = this.deudor.primerNombre
          + ( this.deudor.segundoNombre
            ? ' ' + this.deudor.segundoNombre
            : ' ' );

        const apellidos = this.deudor.segundoApellido
          ? this.deudor.primerApellido + ' ' + this.deudor.segundoApellido
          : this.deudor.primerApellido;

        const rawName = `${ nombres } ${ apellidos }`;

        return rawName;
      },
    };
  }
  public static toMonCarpetas(
    carpetas: WithId<IntCarpeta>[]
  ): MonCarpeta[] {
    const newCarpetas = carpetas.map(
      (
        carpeta
      ) => {
        return this.toMonCarpeta(
          carpeta
        );
      }
    );

    return newCarpetas;
  }

  public static toTel(
    json: string
  ): intTel {
    return JSON.parse(
      json
    );
  }
}

export type KeyOfCarpeta = keyof IntCarpeta;

export const mockCarpeta: IntCarpeta = {
  idProcesos: [
    0
  ],
  category    : 'Terminados',
  numero      : 0,
  llaveProceso: '',
  tipoProceso : 'HIPOTECARIO',
  deudor      : {
    tel: {
      fijo   : 0,
      celular: 0,
    },
    primerNombre   : '',
    segundoNombre  : '',
    primerApellido : '',
    segundoApellido: '',
    cedula         : 0,
    direccion      : '',
    email          : '',
  },
  demanda: {
    departamento           : null,
    capitalAdeudado        : 0,
    entregaGarantiasAbogado: new Date(),
    etapaProcesal          : null,
    fechaPresentacion      : null,
    municipio              : null,
    tipoProceso            : 'SINGULAR',
    obligacion             : [
      0
    ],
    radicado         : null,
    vencimientoPagare: [
      new Date()
    ],
    expediente     : null,
    juzgados       : null,
    mandamientoPago: null,
  },
  cc: null,
};
