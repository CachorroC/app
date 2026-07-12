import type { MemorialTemplate } from './types';

export const impulso_calificacion_demanda: MemorialTemplate = {
  id         : 'impulso_calificacion_demanda',
  filename   : 'impulso_calificacion_demanda.docx',
  displayName: 'impulso_calificacion_demanda.docx',
  description: 'descripción de una línea',
  groups     : [
    {
      key   : 'deudor',
      legend: 'deudor',
      fields: [
        {
          name    : 'nombre',
          label   : 'nombre',
          type    : 'text',
          required: true,
          format  : 'upper',
        },
      ],
    },
    {
      legend: 'Datos generales',
      fields: [
        {
          name    : 'cuantia_value',
          label   : 'cuantia_value',
          type    : 'text',
          required: true,
          format  : 'upper',
        },
        {
          name    : 'mes_trascurrido',
          label   : 'mes_trascurrido',
          type    : 'text',
          required: true,
        },
        {
          name    : 'tipo_proceso',
          label   : 'tipo_proceso',
          type    : 'text',
          required: true,
          format  : 'upper',
        },
      ],
    },

    {
      key   : 'juzgado',
      legend: 'juzgado',
      fields: [
        {
          name    : 'ciudad',
          label   : 'ciudad',
          type    : 'text',
          required: true,
          format  : 'upper',
        },
        {
          name    : 'numero',
          label   : 'numero',
          type    : 'number',
          required: true,
        },
        {
          name   : 'numero_escrito',
          label  : 'numero_escrito',
          type   : 'text',
          derived: true,
          format : 'upper',
        },
        {
          name    : 'tipo',
          label   : 'tipo',
          type    : 'text',
          required: true,
          format  : 'upper',
        },
      ],
    },
    {
      key   : 'radicado',
      legend: 'radicado',
      fields: [
        {
          name    : 'año',
          label   : 'año',
          type    : 'text',
          required: true,
        },
        {
          name    : 'numero',
          label   : 'numero',
          type    : 'number',
          required: true,
        },
      ],
    },
  ],
};
