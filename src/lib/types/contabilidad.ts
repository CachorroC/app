export interface rawFactura {
  NumFac: string;
  FecFac: string;
  HorFac: string;
  NitFac: string;
  DocAdq: string;
  ValFac: string;
  ValIva: string;
  ValOtroIm: string;
  ValTolFac: string;
  CUFE: string;
  QRCode: string;
}

export interface intFactura
{
  facturaElectronica: string[];
  ciudad: string;
  CUFE: string;
  dv: number;
  fecha: Date;
  hasOtroImp: boolean;
  hasImpoConsumo: 0 | 4 | 8;
  hasIva: boolean;
  id: string;
  nit: number;
  QRCode: string;
  razonSocial: string;
  ubicacion?: string;
  valorBase: number;
  valorIcui?:        number;
  valorImpoConsumo?: number;
  valorIva: number;
  valorOtroImp: number;
  valorPropina?:     number;
  concepto:
    | 'Telefonia'
    | 'CyB'
    | 'Restaurante'
    | 'Dotacion'
    | 'Arreglos'
    | 'ProcesoBancolombia'
    | 'ProcesoReintegra'
    | 'sinEspecificar' | string;
  /**
   * valorTotal corresponde al valor de la compra
   */
  valorTotal: number;
}

export class Factura implements intFactura {
  constructor(
    {
      NumFac,
      FecFac,
      HorFac,
      NitFac,
      ValFac,
      ValTolFac,
      ValOtroIm,
      ValIva,
      CUFE,
      QRCode,
    }: rawFactura,
    razonSocial: string,
    concepto:
      | 'Telefonia'
      | 'CyB'
      | 'Restaurante'
      | 'Dotacion'
      | 'Arreglos'
      | 'ProcesoBancolombia'
      | 'ProcesoReintegra'
      | 'sinEspecificar',
    dv = 0,
    ciudad = 'Bogota',
  ) {
            this.concepto = concepto;
            this.ciudad = ciudad;
            this.id = NumFac;
            this.fecha = new Date(
              `${ FecFac }T${ HorFac }`
            );
            this.nit = Number(
              NitFac
            );
            this.dv = dv;
            this.valorBase = parseInt(
              ValFac
            );
            this.valorIva = parseInt(
              ValIva
            );
            this.valorTotal = parseInt(
              ValTolFac
            );
            this.valorOtroImp = parseInt(
              ValOtroIm
            );
            this.CUFE = CUFE;
            this.QRCode = QRCode;
            this.razonSocial = razonSocial;

            if ( this.valorIva === 0 ) {
              this.hasIva = false;
            } else {
              this.hasIva = true;
            }

            if ( this.valorOtroImp === 0 ) {
              this.hasOtroImp = false;
              this.hasImpoConsumo = 0;
            } else {
              this.hasOtroImp = true;
              this.hasImpoConsumo = 8;
            }

  }
  facturaElectronica: string[] = [];
  hasIva: boolean;
  hasOtroImp: boolean;
  hasImpoConsumo: 0 | 4 | 8;
  id: string;
  fecha: Date;
  nit: number;
  valorBase: number;
  valorIva: number;
  valorOtroImp: number;
  CUFE: string;
  QRCode: string;
  dv: number;
  razonSocial: string;
  ubicacion?: string | undefined;
  ciudad: string;
  valorIcui?:        number;
  valorImpoConsumo?: number;
  valorPropina?:     number;
  concepto:
    | 'Telefonia'
    | 'CyB'
    | 'Restaurante'
    | 'Dotacion'
    | 'Arreglos'
    | 'ProcesoBancolombia'
    | 'ProcesoReintegra'
    | 'sinEspecificar';
  valorTotal: number;
}

export interface monFactura extends intFactura {
  _id: string;
}
