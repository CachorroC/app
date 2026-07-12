import type { MemorialTemplate } from './types';

export const impulso_calificacion_demanda: MemorialTemplate = {
  id         : 'impulso_calificacion_demanda',
  filename   : 'impulso_calificacion_demanda.docx',
  displayName: 'TODO impulso_calificacion_demanda.docx',
  description: 'TODO descripción de una línea',
  groups     : [
    {
      legend: 'TODO Datos generales',
      fields: [
        {
          name    : 'cuantia_value',
          label   : 'TODO cuantia_value',
          type    : 'text',
          required: true,
          format  : 'upper'
        },
        {
          name    : 'mes_trascurrido',
          label   : 'TODO mes_trascurrido',
          type    : 'text',
          required: true
        },
        {
          name    : 'tipo_proceso',
          label   : 'TODO tipo_proceso',
          type    : 'text',
          required: true,
          format  : 'upper'
        },
      ]
    },
    {
      key   : 'deudor',
      legend: 'TODO deudor',
      fields: [
        {
          name    : 'nombre',
          label   : 'TODO nombre',
          type    : 'text',
          required: true,
          format  : 'upper'
        },
      ]
    },
    {
      key   : 'juzgado',
      legend: 'TODO juzgado',
      fields: [
        {
          name    : 'ciudad',
          label   : 'TODO ciudad',
          type    : 'text',
          required: true,
          format  : 'upper'
        },
        {
          name    : 'numero',
          label   : 'TODO numero',
          type    : 'number',
          required: true
        },
        {
          name   : 'numero_escrito',
          label  : 'TODO numero_escrito',
          type   : 'text',
          derived: true,
          format : 'upper'
        },
        {
          name    : 'tipo',
          label   : 'TODO tipo',
          type    : 'text',
          required: true,
          format  : 'upper'
        },
      ]
    },
    {
      key   : 'radicado',
      legend: 'TODO radicado',
      fields: [
        {
          name    : 'año',
          label   : 'TODO año',
          type    : 'text',
          required: true 
        },
        {
          name    : 'numero',
          label   : 'TODO numero',
          type    : 'number',
          required: true 
        },
      ] 
    },
  ],
};
