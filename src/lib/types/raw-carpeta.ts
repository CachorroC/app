import { Category, TipoProceso } from './carpetas';

export interface TrulyCruda {
  demanda  : DemandaRaw;
  codeudor?: rawCodeudor;
  deudor   : DeudorRaw;
  numero   : number;
}

export interface CarpetaRaw extends TrulyCruda {
  category: Category;
}

export interface NuevaCarpeta {
  numero  : number;
  category: Category;
  deudor: {
    primerNombre    : string;
    segundoNombre?  : string;
    primerApellido  : string;
    segundoApellido?: string;
    cedula          : number;

    direccion?: string;
    email?    : string;
    tel: {
      celular?: number;
      fijo?   : number;
    };
  };
  demanda: {
    capitalAdeudado        : number;
    entregaGarantiasAbogado: string; //? Date
    obligacion             : ( number | string )[] | null;
    tipoProceso            : TipoProceso;
    vencimientoPagare      : string[]; //?Date[]
    fechaPresentacion?     : string[]; //?Date[]
  };
}

export interface DeudorRaw {
  cedula    : number | string;
  direccion?: number | string;
  email?    : number | string;
  nombre    : string;
  telefono? : number | string;
}

export interface rawCodeudor {
  cedula?   : number | string;
  nombre?   : number | string;
  direccion?: number | string;
  telefono? : number | string;
}

export interface DemandaRaw {
  llaveProceso            : string;
  capitalAdeudado?        : number | string;
  departamento?           : string;
  entregaGarantiasAbogado?: number | string;
  tipoProceso?            : string;
  mandamientoPago?        : string;
  etapaProcesal?    : number | string;
  fechaPresentacion?: number | string;
  municipio?        : string;
  obligacion?: {
    A?: number | string;
    B?: number | string;
  };
  radicado?         : number | string;
  vencimientoPagare?: number | string;
}
