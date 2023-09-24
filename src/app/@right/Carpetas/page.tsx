import { CarpetasSortButtons } from '#@/components/Carpetas/client/carpetasButtonsSort';
import { IntCarpeta } from '#@/lib/types/carpetas';

const carpetaBuilder: IntCarpeta = {
  fecha       : new Date(),
  nombre      : '',
  idProceso   : 0,
  category    : 'Terminados',
  categoryTag : 0,
  numero      : 0,
  llaveProceso: '',
  tipoProceso : 'HIPOTECARIO',
  deudor      : {
    tel: {
      fijo   : 0,
      celular: 0
    },
    primerNombre   : '',
    segundoNombre  : null,
    primerApellido : '',
    segundoApellido: null,
    cedula         : 0,
    direccion      : '',
    email          : ''
  },
  demanda: {
    departamento           : null,
    capitalAdeudado        : '',
    entregagarantiasAbogado: new Date(),
    etapaProcesal          : null,
    fechaPresentacion      : new Date(),
    municipio              : '',
    obligacion             : {},
    radicado               : '',
    vencimientoPagare      : new Date(),
    expediente             : '',
    juzgados               : []
  },
  ultimaActuacion: {
    idRegActuacion: 0,
    llaveProceso  : '',
    consActuacion : 0,
    fechaActuacion: '',
    actuacion     : '',
    anotacion     : '',
    fechaInicial  : '',
    fechaFinal    : '',
    fechaRegistro : '',
    codRegla      : '00                              ',
    conDocumentos : false,
    cant          : 0
  }
};

export default function Page () {

  const {
    deudor, demanda
  } = carpetaBuilder;

  const mainKeys = Object.keys(
    carpetaBuilder
  );

  const deudorKeys = Object.keys(
    deudor
  );

  const demandaKeys = Object.keys(
    demanda
  );

  const telKeys = Object.keys(
    deudor.tel
  );



  const carpetaKeys = [
    ...mainKeys,
    ...deudorKeys,
    ...demandaKeys,
    ...telKeys
  ];

  return (
    <CarpetasSortButtons keys={carpetaKeys} />
  );
}