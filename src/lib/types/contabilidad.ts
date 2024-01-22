import { JsonObject } from '@prisma/client/runtime/library';

export interface RawFactura1
{
  NroFactura: string;
  NitFacturador:       string;
  NitAdquiriente:      string;
  FechaFactura:        Date;
  HoraFactura:         string;
  ValorFactura:        string;
  ValorIVA:            string;
  ValorOtrosImpuestos: string;
  ValorTotalFactura:   string;
  CUFE: string;
  [ x: string ]: string | Date;
}

export interface RawFactura2{
  NumFac:     string;
  FecFac:     Date;
  HorFac:     string;
  NitFac:     string;
  DocAdq:     string;
  ValFac:     string;
  ValIva:     string;
  ValOtroIm:  string;
  ValTolFac?: string;
  CUFE:       string;
  QRCode?:    string;
  https?:     string;
  ValFacIm?: string;
  [ x: string ]: string | Date | undefined;
}

export type RawFactura = RawFactura1 | RawFactura2


export function rawFacturaBuilder (
  qrstring: string
): intFactura {

      const facturaMap = new Map<keyof RawFactura, string | Date>();

      const firstMatcher = qrstring.matchAll(
        /([a-z0-9A-Z_]+)(?::|=)(['\s"])?([a-z0-9A-Z_:\-./?=]+)(['\s\n"])?/gm
      );

      for ( const matchedKeyValues of firstMatcher ) {
        console.log(
          matchedKeyValues
        );
        facturaMap.set(
          matchedKeyValues[ 1 ], matchedKeyValues[ 3 ]
        );
      }

      let newFactura, mF;

      const pruebaSiExisteNumFactura = facturaMap.get(
        'NumFac'
      );

      if ( !pruebaSiExisteNumFactura ) {
        newFactura =  Object.fromEntries(
          facturaMap
        ) as RawFactura1;

        mF = {
          ciudad        : '',
          dv            : 0,
          fecha         : new Date(),
          hasOtroImp    : false,
          hasIcui       : false,
          hasImpoConsumo: false,
          hasIva        : false,
          id            : '',
          nit           : Number(
            newFactura.NitFacturador
          ),
          razonSocial : '',
          direccion   : '',
          valorBase   : newFactura.ValorFactura,
          valorIva    : newFactura.ValorIVA,
          valorOtroImp: '',
          valorTotal  : '',
          concepto    : ''
        };
      } else {
        newFactura =   Object.fromEntries(
          facturaMap
        ) as RawFactura2;
        mF ={
          ciudad        : '',
          dv            : 0,
          fecha         : new Date(),
          hasOtroImp    : false,
          hasIcui       : false,
          hasImpoConsumo: false,
          hasIva        : false,
          id            : newFactura.NumFac,
          nit           : Number(
            newFactura.NitFac
          ),
          razonSocial : '',
          direccion   : '',
          valorBase   : '',
          valorIva    : newFactura.ValIva,
          valorOtroImp: '',
          valorTotal  : '',
          concepto    : ''
        };
      }


      return mF;
}

export interface intFactura
{
  facturaElectronica?: string;
  ciudad: string;
  dv: number;
  fecha: Date;
  hasOtroImp: boolean;
  hasIcui: boolean;
  hasImpoConsumo: boolean;
  secondaryFactura?: JsonObject;
  nombreComercial?: string;
  hasIva: boolean;
  id: string;
  nit: number;
  razonSocial: string;
  direccion: string;
  valorBase: string;
  valorIva: string;
  valorOtroImp: string;
  valorTotal: string;
  concepto:
  | 'Telefonia'
  | 'CyB'
  | 'Servicios Publicos'
  | 'Restaurante o Bar'
  | 'Parqueadero o Peaje'
    | 'Dotacion'
    | 'Arreglos'
    | 'ProcesoBancolombia'
    | 'ProcesoReintegra'
    | 'sinEspecificar' | string;

}

export class Factura implements intFactura {
  secondaryFactura: JsonObject;
  constructor (
    qrString: string, {
      direccion,
      razonSocial,
      nombreComercial,
      concepto,
      dv,
      ciudad
    }: { direccion: string; razonSocial: string; dv: number; ciudad: string; concepto: string;  nombreComercial?: string; }
  ) {

            const facturaMap = new Map<keyof RawFactura, string | Date>();

            const firstMatcher = qrString.matchAll(
              /([a-z0-9A-Z_]+)(?::|=)(?:['\s"])?([a-z0-9A-Z_:\-./?=]+)(['\s\n"])?/gm
            );

            for ( const matchedKeyValues of firstMatcher ) {
              console.log(
                matchedKeyValues
              );
              facturaMap.set(
                matchedKeyValues[ 1 ], matchedKeyValues[ 2 ]
              );
            }

            let newFactura;

            const pruebaSiExisteNumFactura = facturaMap.get(
              'NumFac'
            );

            if ( !pruebaSiExisteNumFactura ) {
              newFactura =  Object.fromEntries(
                facturaMap
              ) as RawFactura1;
              this.fecha = new Date(
                `${ newFactura.FechaFactura }T${ newFactura.HoraFactura }`
              );
              this.id = newFactura.NroFactura;
              this.nit = Number(
                newFactura.NitFacturador
              );
              this.valorBase = newFactura.ValorFactura;
              this.valorIva = newFactura.ValorIVA;
              this.valorOtroImp = newFactura.ValorOtrosImpuestos;
              this.valorTotal = newFactura.ValorTotalFactura;

            } else {
              newFactura =   Object.fromEntries(
                facturaMap
              ) as RawFactura2;
              this.fecha = new Date(
                `${ newFactura.FecFac }T${ newFactura.HorFac }`
              );
              this.id = newFactura.NumFac;
              this.nit = Number(
                newFactura.NitFac
              );
              this.valorBase = newFactura.ValFac;

              this.valorIva = newFactura.ValIva;
              this.valorOtroImp = newFactura.ValOtroIm;
              this.valorTotal = newFactura.ValTolFac
                ? newFactura.ValTolFac
                : newFactura.ValFacIm
                  ? newFactura.ValFacIm
                  :`${ parseFloat(
                    newFactura.ValFac
                  ) + parseFloat(
                    newFactura.ValOtroIm
                  ) + parseFloat(
                    newFactura.ValIva
                  ) }`;

            }

            this.nombreComercial = nombreComercial;
            this.concepto = concepto;
            this.ciudad = ciudad;
            this.direccion = direccion;
            this.dv = dv;
            this.razonSocial = razonSocial;
            this.facturaElectronica = String(
              qrString
            );
            this.secondaryFactura = newFactura as JsonObject;

            if ( this.valorIva === '0.00' ) {
              this.hasIva = false;
            } else {
              this.hasIva = true;
            }

            if ( this.valorOtroImp === '0.00' ) {
              this.hasOtroImp = false;
              this.hasIcui = false;
              this.hasImpoConsumo = false;
            } else {
              this.hasOtroImp = true;
              this.hasIcui = true;
              this.hasImpoConsumo = true;
            }

  }
  hasIcui: boolean;
  hasImpoConsumo: boolean;
  valorBase: string;
  valorIva: string;
  nombreComercial?: string;
  valorOtroImp: string;
  valorTotal: string;
  facturaElectronica?: string;
  ciudad: string;
  dv: number;
  fecha: Date;
  hasOtroImp: boolean;
  hasIva: boolean;
  id: string;
  nit: number;
  razonSocial: string;
  direccion: string;
  concepto: string;
  static convertRawFacturaTointFactura (
    rawFactura: RawFactura
  ): intFactura {
            for ( const key in rawFactura ) {
              if ( Object.prototype.hasOwnProperty.call(
                rawFactura, key
              ) ) {
                console.log(
                  key
                );

                const element = rawFactura[ key ];
                console.log(
                  element
                );
              }
            }

            const newFactura: intFactura = {
              ciudad: '',
              dv    : 0,
              fecha : new Date(
                `${
                  rawFactura.FechaFactura
                    ?  rawFactura.FechaFactura
                    : rawFactura.FecFac
                }T${ rawFactura.HoraFactura
                  ?                   rawFactura.HoraFactura
                  : rawFactura.HorFac
                }`
              ),
              hasOtroImp    : false,
              hasIcui       : false,
              hasImpoConsumo: false,
              hasIva        : false,
              id            : String(
                rawFactura.NroFactura
                  ? rawFactura.NroFactura
                  : rawFactura.NumFac
              ),
              nit: Number(
                rawFactura.NitFacturador
                  ? rawFactura.NitFacturador
                  : rawFactura.NitFac
              ),
              razonSocial: '',
              direccion  : '',
              valorBase  : String(
                rawFactura.ValorFactura
                  ? rawFactura.ValorFactura
                  : rawFactura.ValFac
              ),
              valorIva: String(
                rawFactura.ValorIVA
                  ? rawFactura.ValorIVA
                  : rawFactura.ValIva
              ),
              valorOtroImp: String(
                rawFactura.ValorOtrosImpuestos
                  ? rawFactura.ValorOtrosImpuestos
                  : rawFactura.ValOtroIm
              ),
              valorTotal: String(
                rawFactura.ValorTotalFactura
                  ? rawFactura.ValorTotalFactura
                  : rawFactura.ValFacIm
                    ? rawFactura.ValFacIm
                    : rawFactura.ValTolFac
              ),
              concepto: ''
            };
            return newFactura;
  }
}

export interface monFactura extends intFactura {
  _id: string;
}
