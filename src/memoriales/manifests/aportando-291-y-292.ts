import type { MemorialTemplate } from './types';

export const aportando291y292: MemorialTemplate = {
  id         : 'aportando-291-y-292',
  filename   : 'aportando-291-y-292.docx',
  displayName: 'Memorial aportando 291 y 292',
  description: 'Aporta los documentos 291 y 292 y (opcionalmente) anexos.',
  autofill   : {
    triggerField: 'deudor.nombre',
    fieldMap    : {
      'juzgado.tipo'   : 'juzgado.tipo',
      'juzgado.ciudad' : 'juzgado.ciudad',
      'juzgado.numero' : 'juzgado.numero',
      'radicado.numero': 'radicado.numero',
      'radicado.año'   : 'radicado.año',
      tipoproceso      : 'tipoProceso',
    },
  },
  groups: [
    {
      key   : 'deudor',
      legend: 'Datos del deudor',
      fields: [
        {
          name    : 'nombre',
          label   : 'Nombre del deudor',
          type    : 'text',
          required: true,
          format  : 'upper',
        },
      ],
    },
    {
      key   : 'juzgado',
      legend: 'Juzgado',
      fields: [
        {
          name    : 'tipo',
          label   : 'Tipo de juzgado',
          type    : 'text',
          required: true,
          format  : 'upper',
        },
        {
          name    : 'numero',
          label   : 'Número del juzgado (dígitos)',
          type    : 'text',
          required: true,
        },
        {
          name   : 'numero_escrito',
          label  : 'Número del juzgado (en letras)',
          type   : 'text',
          derived: true,
          format : 'upper',
        }, // derivado de `numero` — ver lib/derive.ts
        {
          name    : 'ciudad',
          label   : 'Ciudad del juzgado',
          type    : 'text',
          required: true,
          format  : 'upper',
        },
      ],
    },
    {
      key   : 'radicado',
      legend: 'Radicado',
      fields: [
        {
          name    : 'numero',
          label   : 'Número de radicado',
          type    : 'text',
          required: true,
          format  : 'radicado',
        },
        {
          name    : 'año',
          label   : 'Año del radicado',
          type    : 'number',
          required: true,
        },
      ],
    },
    {
      legend: 'Datos del proceso',
      fields: [
        {
          name    : 'cuantia_value',
          label   : 'Cuantía del proceso',
          type    : 'select',
          required: true,
          format  : 'upper',
          options : [
            {
              value: 'mínima cuantía',
              label: 'Mínima cuantía',
            },
            {
              value: 'menor cuantía',
              label: 'Menor cuantía',
            },
            {
              value: 'mayor cuantía',
              label: 'Mayor cuantía',
            },
          ],
        },
        {
          name    : 'tipoproceso',
          label   : 'Tipo de proceso',
          type    : 'text',
          required: true,
          format  : 'upper',
        }, // ⚠ template usa `tipoproceso` (sin guion bajo); TODO: unificar en las plantillas
        {
          name    : 'fecha_auto',
          label   : 'Fecha del auto',
          type    : 'date',
          required: true,
          format  : 'dateLong',
        },
      ],
    },
    {
      legend: 'Anexos',
      fields: [
        {
          name : 'has_anexos',
          label: '¿Incluye anexos?',
          type : 'boolean',
        },
        {
          name    : 'anexos_list',
          label   : 'Anexos',
          type    : 'stringList',
          helpText: 'Un anexo por línea.',
        },
      ],
    },
  ],
};
