import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { MemorialTemplate } from '#@/memoriales/manifests/types';
import { buildContext } from './build-context';
import { formatCurrencyCOP } from './formatters';

const fakeTemplate: MemorialTemplate = {
  id         : 'fake',
  filename   : 'fake.docx',
  displayName: 'Fake',
  description: 'Fake template for build-context tests',
  groups     : [
    {
      key   : 'deudor',
      legend: 'Deudor',
      fields: [
        {
          name    : 'nombre',
          label   : 'Nombre',
          type    : 'text',
          required: true
        }
      ],
    },
    {
      key   : 'juzgado',
      legend: 'Juzgado',
      fields: [
        {
          name    : 'numero',
          label   : 'Número',
          type    : 'text',
          required: true
        },
        {
          name   : 'numero_escrito',
          label  : 'Número en letras',
          type   : 'text',
          derived: true
        },
      ],
    },
    {
      legend: 'Proceso',
      fields: [
        {
          name    : 'cuantia_value',
          label   : 'Cuantía',
          type    : 'currency',
          required: true,
          format  : 'currencyCOP'
        }
      ],
    },
    {
      legend: 'Anexos',
      fields: [
        {
          name : 'has_anexos',
          label: '¿Anexos?',
          type : 'boolean'
        },
        {
          name : 'anexos_list',
          label: 'Anexos',
          type : 'stringList'
        },
      ],
    },
  ],
};

test(
  'buildContext assembles nested groups, scalars, booleans, stringLists, and derived fields', () => {
    const context = buildContext(
      fakeTemplate, {
        deudor: {
          nombre: 'Juan Pérez'
        },
        juzgado: {
          numero: '4'
        },
        cuantia_value: 1500000,
        has_anexos   : true,
        anexos_list  : [
          ' Cédula ',
          '',
          ' Poder ' 
        ],
      } 
    );

    assert.deepEqual(
      context.deudor, {
        nombre: 'Juan Pérez'
      } 
    );
    assert.equal(
      ( context.juzgado as Record<string, unknown> ).numero_escrito, 'cuarto' 
    );
    assert.equal(
      context.cuantia_value, formatCurrencyCOP( 1500000 ) 
    );
    assert.equal(
      context.has_anexos, true 
    );
    assert.deepEqual(
      context.anexos_list, [
        'Cédula',
        'Poder' 
      ] 
    );
  } 
);

test(
  'buildContext defaults missing stringList/boolean values sensibly', () => {
    const context = buildContext(
      fakeTemplate, {
        deudor: {
          nombre: 'Ana'
        },
        juzgado: {
          numero: 'ABC'
        },
        cuantia_value: 0,
      } 
    );

    assert.equal(
      context.has_anexos, false 
    );
    assert.deepEqual(
      context.anexos_list, [] 
    );
    assert.equal(
      ( context.juzgado as Record<string, unknown> ).numero_escrito, 'ABC' 
    );
  } 
);
