import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { IntCarpeta } from '#@/lib/types/carpetas';
import { toCarpetaLookup } from './carpeta-lookup';

function baseCarpeta( overrides: Partial<IntCarpeta> ): IntCarpeta {
  return {
    category           : 'SinEspecificar',
    ciudad             : null,
    codeudor           : null,
    demanda            : {} as IntCarpeta['demanda'],
    deudor             : null,
    fecha              : null,
    fechaUltimaRevision: null,
    id                 : 1,
    idProcesos         : [],
    idRegUltimaAct     : null,
    juzgado            : null,
    juzgadoCiudad      : null,
    juzgadoId          : null,
    juzgadoTipo        : null,
    llaveProceso       : '',
    nombre             : 'CARPETA FALLBACK',
    notas              : [],
    notasCount         : null,
    numero             : 123,
    procesos           : [],
    revisado           : false,
    terminado          : false,
    tipoProceso        : 'SINGULAR',
    ultimaActuacion    : null,
    updatedAt          : new Date(),
    ...overrides,
  };
}

test(
  'toCarpetaLookup composes deudorNombre from deudor name parts', () => {
    const carpeta = baseCarpeta( {
      deudor: {
        carpetaNumero  : 123,
        cedula         : '123',
        direccion      : null,
        email          : null,
        id             : 1,
        primerApellido : 'Perez',
        primerNombre   : 'Juan',
        segundoApellido: null,
        segundoNombre  : null,
        telCelular     : null,
        telFijo        : null,
      },
    } );

    assert.equal(
      toCarpetaLookup( carpeta ).deudorNombre, 'Juan Perez' 
    );
  } 
);

test(
  'toCarpetaLookup falls back to carpeta.nombre when there is no deudor', () => {
    const carpeta = baseCarpeta( {
      deudor: null,
    } );

    assert.equal(
      toCarpetaLookup( carpeta ).deudorNombre, 'CARPETA FALLBACK' 
    );
  } 
);

test(
  'toCarpetaLookup maps juzgado and radicado fields from relations, defaulting to null', () => {
    const withRelations = toCarpetaLookup( baseCarpeta( {
      juzgado: {
        id    : '004',
        tipo  : 'CIVIL MUNICIPAL',
        ciudad: 'BOGOTA',
        url   : '',
      },
      demanda: {
        radicado   : '2019-123',
        tipoProceso: 'EJECUTIVO',
      } as IntCarpeta['demanda'],
    } ), );

    assert.equal(
      withRelations.juzgado.numero, '004' 
    );
    assert.equal(
      withRelations.juzgado.tipo, 'CIVIL MUNICIPAL' 
    );
    assert.equal(
      withRelations.juzgado.ciudad, 'BOGOTA' 
    );
    assert.equal(
      withRelations.radicado.año, '2019' 
    );
    assert.equal(
      withRelations.radicado.numero, '00123' 
    );
    assert.equal(
      withRelations.tipoProceso, 'EJECUTIVO' 
    );

    const withoutRelations = toCarpetaLookup( baseCarpeta( {
      juzgado: null,
    } ), );

    assert.equal(
      withoutRelations.juzgado.numero, null 
    );
    assert.equal(
      withoutRelations.radicado.numero, null 
    );
    assert.equal(
      withoutRelations.radicado.año, null 
    );
    assert.equal(
      withoutRelations.tipoProceso, 'SINGULAR' 
    );
  } 
);

test(
  'toCarpetaLookup maps a non-empty llaveProceso through, and defaults empty to null', () => {
    const withLlave = toCarpetaLookup( baseCarpeta( {
      llaveProceso: 'ABC-123',
    } ), );

    assert.equal(
      withLlave.llaveProceso, 'ABC-123' 
    );

    const withoutLlave = toCarpetaLookup( baseCarpeta( {
      llaveProceso: '',
    } ), );

    assert.equal(
      withoutLlave.llaveProceso, null 
    );
  } 
);

test(
  'toCarpetaLookup leaves radicado numero unpadded when already 5+ digits, and null when malformed', () => {
    const longNumero = toCarpetaLookup( baseCarpeta( {
      demanda: {
        radicado: '2019-12345',
      } as IntCarpeta['demanda'],
    } ), );

    assert.equal(
      longNumero.radicado.numero, '12345' 
    );

    const malformed = toCarpetaLookup( baseCarpeta( {
      demanda: {
        radicado: 'singuionvalido',
      } as IntCarpeta['demanda'],
    } ), );

    assert.equal(
      malformed.radicado.numero, null 
    );
    assert.equal(
      malformed.radicado.año, null 
    );
  } 
);
