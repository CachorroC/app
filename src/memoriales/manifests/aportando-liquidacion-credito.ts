import type { MemorialTemplate } from './types';

/**
 * MemorialTemplate manifest for the memorial aporting the credit
 * liquidation to an executive process, rendered from
 * templates/aportando-liquidacion-credito.docx.
 */
export const aportandoLiquidacionCredito: MemorialTemplate = {
  id         : 'aportando-liquidacion-credito',
  filename   : 'aportando-liquidacion-credito.docx',
  displayName: 'Memorial aportando liquidación del crédito',
  description: 'Aporta la liquidación del crédito al proceso ejecutivo.',
  autofill   : {
    triggerField: 'deudor.nombre',
    fieldMap    : {
      'juzgado.tipo'   : 'juzgado.tipo',
      'juzgado.ciudad' : 'juzgado.ciudad',
      'juzgado.numero' : 'juzgado.numero',
      'radicado.numero': 'radicado.numero',
      'radicado.año'   : 'radicado.año',
      tipo_proceso     : 'tipoProceso',
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
        }, // revisar: ¿select? p.ej. "Civil Municipal"
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
          format  : 'radicadoNumero',
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
          name    : 'tipo_proceso',
          label   : 'Tipo de proceso',
          type    : 'text',
          required: true,
          format  : 'upper',
        }, // revisar: ¿select? p.ej. "Ejecutivo" — TODO: unificar en las plantillas (ver aportando-291-y-292: `tipoproceso`)
      ],
    },
  ],
};
