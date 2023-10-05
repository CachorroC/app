// To parse this data:
//
//   import { Convert } from "./file";
//
//   const intCarpeta = Convert.toIntCarpeta(json);

import { WithId } from 'mongodb';
import { Actuacion } from './actuaciones';

export interface IntCarpeta {
  category: Category;
  cc?: number | null;
  demanda: intDemanda;
  deudor: intDeudor;
  idProcesos?: number[];
  llaveProceso?: string;
  numero: number;
  tipoProceso: TipoProceso;
  fecha?: Date;
  ultimaActuacion?: Actuacion;

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
  departamento: Departamento | null;
  entregaGarantiasAbogado: Date | null;
  etapaProcesal: null | string;
  expediente: null | string;
  fechaPresentacion: Date | null;
  juzgados: intJuzgado[] | null;
  mandamientoPago: Date |null
  municipio: string | null;
  obligacion: Obligacion|null;
  radicado: string|null;
  tipoProceso:TipoProceso
  vencimientoPagare:  Date[]| null;
}

export interface Obligacion {
  A?: number | string;
  B?: number | string;
}

export type Departamento = 'CUNDINAMARCA' | 'TOLIMA' | 'BOYACÁ';

export interface intJuzgado {
  id: number;
  tipo: string;
  url: string;
}

export interface intDeudor {
  tel: intTel;
  primerNombre: string;
  segundoNombre?:  string;
  primerApellido: string;
  segundoApellido?: string;
  cedula: number | null;
  direccion: string;
  email: string;
}

export interface intTel {
  fijo?: number ;
  celular?: number;
}

export type TipoProceso =
  | 'HIPOTECARIO'
  | 'PRENDARIO'
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

  fecha?: Date;
  ultimaActuacion?: Actuacion;
  _id: string;
  nombre: string;
}

export type CarpetaKeys = keyof MonCarpeta;

export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

export class BuildCarpeta implements MonCarpeta {
  constructor(
    {
      _id,
      tipoProceso,
      llaveProceso,
      demanda,
      category,
      numero,
      deudor: {
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        direccion = '',
        email = '',
        tel: {
          fijo = 0, celular = 0
        },
        cedula,
      },
    }: WithId<IntCarpeta>
  ) {
    const pN
      = primerNombre.charAt(
        0
      )
        .toUpperCase()
      + primerNombre.toLowerCase()
        .slice(
          1
        );

    const pA
      = primerApellido.charAt(
        0
      )
        .toUpperCase()
      + primerApellido.toLowerCase()
        .slice(
          1
        );

    const sN
      = segundoNombre
      && segundoNombre.charAt(
        0
      )
        .toUpperCase()
        + segundoNombre.toLowerCase()
          .slice(
            1
          );

    const sA
      = segundoApellido
      && segundoApellido.charAt(
        0
      )
        .toUpperCase()
        + segundoApellido.toLowerCase()
          .slice(
            1
          );
    this.deudor = {
      primerNombre   : pN,
      segundoNombre  : sN,
      primerApellido : pA,
      segundoApellido: sA,
      cedula         : Number(
        cedula
      ),
      direccion,
      email,
      tel: {
        fijo,
        celular,
      },
    };
    this._id = _id.toString();
    this.tipoProceso = tipoProceso;
    this.numero = numero;
    this.demanda = demanda;
    this.category = category;
    this.llaveProceso = llaveProceso;
    this.cc = this.deudor.cedula;
  }
  fecha?: Date;
  ultimaActuacion?: Actuacion;
  _id: string;
  demanda: intDemanda;
  category: Category;
  cc: number | null;
  deudor: intDeudor;
  numero: number;
  llaveProceso?: string | undefined;
  tipoProceso: TipoProceso;
  idProcesos?: number[] | undefined;
  get nombre() {
    const nombres
      = this.deudor.primerNombre
      + ( this.deudor.segundoNombre
        ? ' ' + this.deudor.segundoNombre
        : ' ' );

    const apellidos = this.deudor.segundoApellido
      ? this.deudor.primerApellido + ' ' + this.deudor.segundoApellido
      : this.deudor.primerApellido;

    const rawName = nombres + apellidos;

    return rawName;
  }
}

// Converts JSON strings to/from your types
export class carpetaConvert {
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
      _id   : carpeta._id.toString(),
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

        const rawName = nombres + apellidos;

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
  public static toIntCarpetas(
    json: string
  ): IntCarpeta[] {
    return JSON.parse(
      json
    );
  }

  public static intCarpetasToJson(
    value: IntCarpeta[]
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toIntCarpeta(
    json: string
  ): IntCarpeta {
    return JSON.parse(
      json
    );
  }

  public static intCarpetaToJson(
    value: IntCarpeta
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

  public static demandaToJson(
    value: intDemanda
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toDepartamento(
    json: string
  ): Departamento {
    return JSON.parse(
      json
    );
  }

  public static departamentoToJson(
    value: Departamento
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toJuzgado(
    json: string
  ): intJuzgado {
    return JSON.parse(
      json
    );
  }

  public static juzgadoToJson(
    value: intJuzgado
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toDeudor(
    json: string
  ): intDeudor {
    return JSON.parse(
      json
    );
  }

  public static deudorToJson(
    value: intDeudor
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toTel(
    json: string
  ): intTel {
    return JSON.parse(
      json
    );
  }

  public static telToJson(
    value: intTel
  ): string {
    return JSON.stringify(
      value
    );
  }
}


export type KeyOfCarpeta = keyof IntCarpeta

export const mockCarpeta: IntCarpeta =  {

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
      celular: 0
    },
    primerNombre   : '',
    segundoNombre  : '',
    primerApellido : '',
    segundoApellido: '',
    cedula         : 0,
    direccion      : '',
    email          : ''
  },
  demanda: {
    departamento           : null,
    capitalAdeudado        : 0,
    entregaGarantiasAbogado: null,
    etapaProcesal          : null,
    fechaPresentacion      : null,
    municipio              : null,
    tipoProceso            : 'SINGULAR',
    obligacion             : null,
    radicado               : null,
    vencimientoPagare      : null,
    expediente             : null,
    juzgados               : null,
    mandamientoPago        : null
  },
  cc: null
};