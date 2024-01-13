export interface intFactura
{

  fecha: Date;
    nit: number,
    dv: number,
    razonSocial: string,
    ubicacion: string,
    ciudad:string,
    concepto: 'Restaurante'| 'Dotacion' | 'Arreglos' | 'ProcesoBancolombia'| 'ProcesoReintegra' | 'Activos' | 'Pasivos' | 'Liquidos' |'sinEspecificar',
    valor: number,
    iva: number,
    impuestoConsumo:number,
    icu: number,
    total: number

}