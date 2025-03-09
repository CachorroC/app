// To parse this data:
//
//   import { Convert } from "./file";
//
//   const rawDb = Convert.toRawDb(json);

export interface RawDb {
  [x: string]: string | number| Date |undefined;
  NUMERO:                                    number;
  DEMANDADO_IDENTIFICACION:                  number | string;
  DEMANDADO_NOMBRE:                          string;
  DEMANDADO_TELEFONOS?:                      number | string;
  DEMANDADO_DIRECCION?:                      number | string;
  FECHA_VENCIMIENTO_PAGARE?:                 number | string;
  OBLIGACION_1?:                             number | string;
  VALOR_CAPITAL_ADEUDADO?:                   number | string;
  FECHA_ENTREGA_GARANTIAS_ABOGADO?:          number | string;
  DEPARTAMENTO:                              Departamento;
  JUZGADO_CIUDAD:                            string;
  JUZGADO_ORIGEN?:                           string;
  TIPO_PROCESO?:                             string;
  JUZGADO_CIUDAD_1?:                         string;
  RADICADO?:                                 string;
  EXPEDIENTE?:                               number | string;
  ETAPA_PROCESAL?:                           number | string;
  FECHA_PRESENTACION_DEMANDA?:               number | string;
  FECHA_MANDAMIENTO_DE_PAGO?:                number | string;
  MEDIDA_SOLICITADA?:                        number | string;
  NUMERO_DE_OFICIO?:                         number | string;
  FECHA_DEL_OFICIO?:                         number | string;
  BIENES?:                                   number | string;
  PLACAS_O_NUMERO_DE_MATRICULA?:             number | string;
  DESCRIPCION_DE_LA_MEDIDA?:                 number | string;
  FECHA_RETIRO_DE_OFICIOS?:                  number | string;
  FECHA_RADICACION?:                         number | string;
  RESPUESTA_EMBARGO?:                        number | string;
  FECHA_SOLICITUD_CAPTURA_O_SECUESTRO?:      number | string;
  BIENES_SECUESTRADOS?:                      number | string;
  PARQUEADERO?:                              number | string;
  FECHA_SOLICITUD_SENTENCIA?:                number | string;
  CAUSAL_DE_TERMINACION?:                    string;
  OBSERVACIONES?:                            string;
  FECHA_DEVOLUCION_GARANTIAS?:               number | string;
  DEMANDADO_EMAIL?:                          number | string;
  CODEUDOR_IDENTIFICACION?:                  number | string;
  CODEUDOR_NOMBRE?:                          number | string;
  CODEUDOR_TELEFONOS?:                       number | string;
  CODEUDOR_DIRECCION?:                       number | string;
  OBLIGACION_2?:                             number | string;
  FECHA_RECIBO_291?:                         number | string;
  RESULTADO_291?:                            number | string;
  FECHA_RECIBO_AVISO_292?:                   number | string;
  RESULTADO_292?:                            number | string;
  FECHA_PUBLICACION_EMPLAZAMIENTO?:          number | string;
  FECHA_APORTA_NOTIFICACION_291?:            number | string;
  TIPO_NOTIFICACION?:                        number | string;
  FECHA_DECRETO_SECUESTRO_O_CAPTURA?:        number | string;
  FECHA_CAPTURA?:                            number | string;
  FECHA_SECUESTRO?:                          number | string;
  VALOR_COSTAS?:                             number | string;
  FECHA_NOMBRAMIENTO_CURADOR?:               number | string;
  FECHA_AUTO_TERMINACION_PROCESO?:           number | string;
  NOMBRE_SECUESTRE?:                         number | string;
  FECHA_SOLICITUD_LIQUIDACION?:              number | string;
  FECHA_APROBACION_LIQUIDACION_DEL_CREDITO?: number | string;
  FECHA_APROBACION_COSTAS?:                  number | string;
  VALOR_AVALUO?:                             number | string;
  FECHA_REMATE?:                             number | string;
  FECHA_ADJUDICACION?:                       number | string;
  FECHA_RADICACION_MEMORIAL_TERMINACION?:    number | string;
  FECHA_ORDENA_MEDIDAS_CAUTELARES?:          number | string;
  FECHA_PRESENTACION_LIQUIDACION?:           number | string;
  VALOR_LIQUIDACION_DEL_CREDITO?:            number | string;
  FECHA_NOTIFICACION?:                       FechaNotificacionEnum | number;
  ULTIMO_MOVIMIENTO_IMPEDIR_DESISTIMIENTO?:  number | string;
  FECHA_DE_SUSPENSION_DEL_PROCESO?:          string;
  TERMINO_DE_SUSPENSION?:                    string;
  FECHA_SENTENCIA?:                          string;
  FECHA_CIERRE?:                             string;
  EXTRA?:                                    string;
  JUZGADO_EJECUCION?:                        string;
  EXTRA2?:                                   string;
  FECHA_MANDAMIENTO_PAGO?:                   number | string;
  FECHA_AUTO_NOTIFICADO?:                    number | string;
  RESPESTA_EMBARGO?:                         number | string;
  CERTIMAIL?:                                Certimail;
  FISICO?:                                   Certimail;
  FECHA_APORTA_NOTIFICACION_292?:            number | string;
  FECHA_DE_PRESENTACION_LIQUIDACION?:        string;
  FECHA_ULTIMA_REVISION?:                    Date;
  CONTACTO?:                                 string;
  FECHA_ULTIMA_ACTUACION?:                   Date;
  ULTIMO_ESTADO_APARECE?:                    number | string;
  ULTIMO_ESTADO_REVISADO?:                   Date | number;
}

export type Certimail = 'SI' | 'NO' | '04/10/2018' | 'FALSE' | 'TRUE';

export type Departamento = 'CUNDINAMARCA' | 'CUNDINNAMARCA' | 'CUNDINAMARCA ' | 'CUN DINAMARCA' | 'CUNDINNAMARCA ' | 'BOYACÁ' | 'TOLIMA' | 'CUNDINAMRCA' | 'CNDINAMARCA' | 'BOYACA';

export type FechaNotificacionEnum = '9/04/2018' | 'POSITIVO' | 'NEGATIVO' | '10/09/2018' | '21/05/2018' | '08/10/2018' | '|';

// Converts JSON strings to/from your types
export class Convert {
  public static toRawDb( json: string ): RawDb {
    return JSON.parse( json );
  }

  public static rawDbToJson( value: RawDb ): string {
    return JSON.stringify( value );
  }
}
