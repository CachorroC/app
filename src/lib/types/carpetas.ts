// To parse this data:
//
//   import { Convert } from "./file";
//
//   const intCarpeta = Convert.toIntCarpeta(json);

import { Despachos } from '../project/utils/Procesos/despachos';
import { outActuacion } from './actuaciones';
import { outProceso } from './procesos';
import { WithId } from 'mongodb';
import { intProceso } from 'types/procesos';
import { IntTask, SubTarea } from './tareas';
import { IntNota } from './notas';

export type IntCarpeta  = {
  category: string;
  ciudad: string | null;
  codeudor: Codeudor | null;
  demanda: intDemanda;
  deudor: Deudor | null;
  fecha: Date | null;
  fechaUltimaRevision: Date | null;
  id: number;
  idProcesos: number[];
  idRegUltimaAct: number | null;
  juzgado: Juzgado | null;
  juzgadoCiudad: string | null;
  juzgadoId: string | null;
  juzgadoTipo: string | null;
  llaveProceso: string;
  nombre: string;
  notas: IntNota[];
  notasCount: number | null;
  numero: number;
  procesos: outProceso[];
  revisado: boolean;
  tareas: IntTask[];
  terminado: boolean;
  tipoProceso: string;
  ultimaActuacion: outActuacion | null;
  updatedAt: Date;
}

export type Category =
  | 'Terminados'
  | 'Reintegra'
  | 'Bancolombia'
  | 'Insolvencia'
  | 'LiosJuridicos'
  | 'todos'
  | 'SinEspecificar';

export type Codeudor ={
  carpetaNumero: number | null;
  cedula: null | string;
  direccion: null | string;
  id: number;
  nombre: null | string;
  telefono: null | string;
}

export type intDemanda ={
  avaluo: null | number;
  capitalAdeudado: null | number;
  carpetaNumero?: number;
  departamento: string | null;
  despacho: null | string;
  entregaGarantiasAbogado: Date | null;
  etapaProcesal: null | string;
  fechaPresentacion: Date[];
  id: number;
  liquidacion: number | null;
  llaveProceso: string | null;
  mandamientoPago: Date[];
  medidasCautelares: MedidasCautelares | null;
  municipio: string | null;
  notificacion: Notificacion | null;
  obligacion: string[];
  radicado: null | string;
  tipoProceso: string;
  vencimientoPagare: Date[];
}

export type intDemandaDepartamento =
  | 'CUNDINAMARCA'
  | 'CUNDINNAMARCA'
  | 'TOLIMA'
  | 'CUN DINAMARCA'
  | 'BOYACÁ'
  | 'CUNDINAMRCA'
  | 'CNDINAMARCA'
  | 'ATLANTICO';

export type MedidasCautelares  ={
  demandaId: number | null;
  fechaOrdenaMedida: Date | null;
  id: number;
  medidaSolicitada: null | string;
}

export type Notificacion = {
  autoNotificado: null | Date;
  demandaId: number | null;
  certimail: boolean | null;
  fisico: boolean | null;
  id: number;
  notifiers: Notifier[]
}

export type Notifier ={
  fechaAporta: Date | null;
  fechaRecibido: Date | null;
  id?: number;
  notificacionId: number | null;
  resultado: boolean | null;
  tipo: string
}

export type TipoProceso =
  | 'SINGULAR'
  | 'PRENDARIO'
  | 'HIPOTECARIO'
  | 'ACUMULADO';

export type  Deudor = {
  carpetaNumero: number | null;
  cedula: string;
  direccion: null | string;
  email: null | string;
  id: number;
  primerApellido: string;
  primerNombre: string;
  segundoApellido: null | string;
  segundoNombre: null | string;
  telCelular: null | string;
  telFijo: null | string;
}

export type ProcesoDepartamento =
  | 'BOGOTÁ'
  | 'CUNDINAMARCA'
  | 'ANTIOQUIA'
  | 'META';

export type Juzgado ={
  id: string;
  tipo: string;
  url: string;
  ciudad: string;
}

export type CodRegla = '00                              ';

export interface MonCarpeta extends IntCarpeta {
  id: number;
}

// Converts JSON strings to/from your types
export class carpetaConvert {
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

  public static toMonCarpeta(
    carpeta: WithId<IntCarpeta>
  ): MonCarpeta {
            return {
              ...carpeta,
              fecha: carpeta.fecha
                ? new Date(
                  carpeta.fecha
                )
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
  public static toMonCarpetas(
    carpetas: WithId<IntCarpeta>[]
  ): MonCarpeta[] {
            return carpetas.map(
              (
                carpeta
              ) => {
                        return this.toMonCarpeta(
                          carpeta
                        );
              }
            );
  }

  public static toCodeudor(
    json: string
  ): Codeudor {
            return JSON.parse(
              json
            );
  }

  public static codeudorToJson(
    value: Codeudor
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static tointDemanda(
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

  public static toMedidasCautelares(
    json: string
  ): MedidasCautelares {
            return JSON.parse(
              json
            );
  }

  public static medidasCautelaresToJson(
    value: MedidasCautelares
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toNotificacion(
    json: string
  ): Notificacion {
            return JSON.parse(
              json
            );
  }

  public static notificacionToJson(
    value: Notificacion
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toNotifier(
    json: string
  ): Notifier {
            return JSON.parse(
              json
            );
  }

  public static notifierToJson(
    value: Notifier
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toDeudor(
    json: string
  ): Deudor {
            return JSON.parse(
              json
            );
  }

  public static deudorToJson(
    value: Deudor
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toNota(
    json: string
  ): IntNota {
            return JSON.parse(
              json
            );
  }

  public static notaToJson(
    value: IntNota
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toJuzgado(
    json: string
  ): Juzgado {
            return JSON.parse(
              json
            );
  }

  public static juzgadoToJson(
    value: Juzgado
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toTarea(
    json: string
  ): IntTask {
            return JSON.parse(
              json
            );
  }

  public static tareaToJson(
    value: IntTask
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toSubTarea(
    json: string
  ): SubTarea {
            return JSON.parse(
              json
            );
  }

  public static subTareaToJson(
    value: SubTarea
  ): string {
            return JSON.stringify(
              value
            );
  }
}

export type KeyOfCarpeta = keyof IntCarpeta;

function incomingStringFixer(
  stringValue: string
) {
      return stringValue
            .toLowerCase()
            .normalize(
              'NFD'
            )
            .replace(
              /\p{Diacritic}/gu, ''
            )
            .trim();
}

export class DespachoJudicial implements Juzgado {
  constructor(
    proceso: intProceso
  ) {
            const matchedDespacho = Despachos.find(
              (
                dependenciaJudiail
              ) => {
                        const {
                          nombre
                        } = dependenciaJudiail;

                        const {
                          despacho
                        } = proceso;

                        const nombreDependenciaJudicial = incomingStringFixer(
                          nombre
                        );

                        const nombreDespachoProceso = incomingStringFixer(
                          despacho
                        );

                        const indexOfDesp = nombreDependenciaJudicial.indexOf(
                          nombreDespachoProceso,
                        );

                        if ( indexOfDesp >= 0 ) {
                          console.log(
                            `procesos despacho is in despachos ${ indexOfDesp + 1 }`
                          );
                        }

                        return nombreDependenciaJudicial === nombreDespachoProceso;
              }
            );

            if ( matchedDespacho ) {
              const {
                nombre, url, especialidad
              } = matchedDespacho;

              const stringId = nombre.match(
                /(\d+)/mi
              );
              this.tipo = nombre;
              this.ciudad = especialidad;
              this.id = stringId
                ? stringId.toString()
                      .padStart(
                        3, '000'
                      )
                : '000';
              this.url = `https://www.ramajudicial.gov.co${ url }`;
            } else {
              ( this.tipo = proceso.despacho ),
              ( this.url = `https://www.ramajudicial.gov.co/web/${ proceso.despacho
                    .replaceAll(
                      ' ', '-'
                    )
                    .toLowerCase() }` );
              this.id = '000';
              this.ciudad = '';
            }
  }
  ciudad: string;
  id: string;
  tipo: string;
  url: string;
}
