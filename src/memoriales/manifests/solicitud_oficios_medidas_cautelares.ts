import type { MemorialTemplate } from './types';

export const solicitud_oficios_medidas_cautelares: MemorialTemplate = {
  id         : 'solicitud_oficios_medidas_cautelares',
  filename   : 'solicitud_oficios_medidas_cautelares.docx',
  displayName: 'Solicitud Oficios Medidas Cautelares',
  description: 'descripción de una línea',
  autofill   : {
    triggerField: 'deudor.nombre',
    fieldMap    : {
      'juzgado.tipo'   : 'juzgado.tipo',
      'juzgado.ciudad' : 'juzgado.ciudad',
      'juzgado.numero' : 'juzgado.numero',
      'radicado.numero': 'radicado.numero',
      'radicado.año'   : 'radicado.año',
      tipo_proceso     : 'tipoProceso',
      llaveProceso     : 'llaveProceso'
    },
  },
  groups: [
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
      ]
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
          name    : 'llaveProceso',
          label   : 'llaveProceso',
          type    : 'text',
          required: true
        },
        {
          name    : 'tipo_proceso',
          label   : 'tipo_proceso',
          type    : 'text',
          required: true,
          format  : 'upper',
        },
      ]
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
          required: true
        },
        {
          name    : 'numero_escrito',
          label   : 'numero_escrito',
          type    : 'number',
          required: true,
          derived : true,
          format  : 'upper',
        },
        {
          name    : 'tipo',
          label   : 'tipo del juzgado',
          type    : 'text',
          required: true,
          format  : 'upper',
        },
      ]
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
          format  : 'radicado',
        },
        {
          name    : 'numero',
          label   : 'numero',
          type    : 'number',
          required: true,
          format  : 'radicado',
        },
      ]
    },
  ],
};
