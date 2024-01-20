

export interface rawFactura{

  NumFac: string;
  FecFac: string;
  HorFac: string;
  NitFac: string;
  DocAdq: string;
  ValFac: string;
  ValIva: string;
  ValOtroIm: string;
  ValTolFac?: string;
  ValFacIm?: string;
  CUFE: string;
  QRCode: string;
}

export interface intFactura
{
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
  constructor (
    qrString: string, {
      direccion,
      razonSocial,
      concepto,
      dv,
      ciudad
    }: { direccion: string; razonSocial: string;  dv: number; ciudad: string; concepto: string}
  ) {

            const facturaMap = new Map();

            const rawKeyValues = qrString.split(
              '\n'
            );

            for ( const rawKV of rawKeyValues ) {
              const [ key, ...restValues ] = rawKV.split(
                ':'
              );
              facturaMap.set(
                key, restValues.join(
                  ':'
                )
              );
            }

            const newState =   Object.fromEntries(
              facturaMap
            );

            const  {
              NumFac,
              FecFac,
              HorFac,
              NitFac,
              ValFac,
              ValTolFac,
              ValFacIm,
              ValOtroIm,
              ValIva,
            } = newState;

            this.concepto = concepto;
            this.ciudad = ciudad;
            this.direccion = direccion;
            this.id = String(
              NumFac
            );
            this.fecha = new Date(
              `${ FecFac }T${ HorFac }`
            );
            this.nit = Number(
              NitFac
            );
            this.dv = dv;


            this.valorTotal = ValTolFac
              ? ValTolFac
              : ValFacIm
                ? ValFacIm
                : '';
            this.valorBase = ValFac;
            this.valorOtroImp = ValOtroIm;
            this.valorIva = ValIva;
            this.razonSocial = razonSocial;
            this.facturaElectronica = String(
              qrString
            );

            if ( this.valorIva === '0' ) {
              this.hasIva = false;
            } else {
              this.hasIva = true;
            }

            if ( this.valorOtroImp === '0' ) {
              this.hasOtroImp = false;
            } else {
              this.hasOtroImp = true;
            }

  }
  valorBase: string;
  valorIva: string;
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
}

export interface monFactura extends intFactura {
  _id: string;
}
