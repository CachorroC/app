import type { MemorialTemplate } from './types';

export const aportandoLiquidacionCredito: MemorialTemplate = {
  id         : 'aportando-liquidacion-credito',
  filename   : 'aportando-liquidacion-credito.docx',
  displayName: 'Memorial aportando liquidación del crédito',
  description: 'Aporta la liquidación del crédito al proceso ejecutivo.',
  groups     : [
    {
      key   : 'deudor',
      legend: 'Datos del deudor',
      fields: [
        {
          name    : 'nombre',
          label   : 'Nombre del deudor',
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
          name    : 'tipo',
          label   : 'Tipo de juzgado',
          type    : 'text',
          required: true
        }, // revisar: ¿select? p.ej. "Civil Municipal"
        {
          name    : 'numero',
          label   : 'Número del juzgado (dígitos)',
          type    : 'text',
          required: true
        },
        {
          name   : 'numero_escrito',
          label  : 'Número del juzgado (en letras)',
          type   : 'text',
          derived: true
        }, // derivado de `numero` — ver lib/derive.ts
        {
          name    : 'ciudad',
          label   : 'Ciudad del juzgado',
          type    : 'text',
          required: true
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
          format  : 'radicado'
        },
        {
          name    : 'año',
          label   : 'Año del radicado',
          type    : 'number',
          required: true
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
          options : [
            {
              value: 'mínima cuantía',
              label: 'Mínima cuantía'
            },
            {
              value: 'menor cuantía',
              label: 'Menor cuantía'
            },
            {
              value: 'mayor cuantía',
              label: 'Mayor cuantía'
            },
          ],
        },
        {
          name    : 'tipo_proceso',
          label   : 'Tipo de proceso',
          type    : 'text',
          required: true
        }, // revisar: ¿select? p.ej. "Ejecutivo" — TODO: unificar en las plantillas (ver aportando-291-y-292: `tipoproceso`)
      ],
    },
  ],
};
