import type { MemorialTemplate } from './types';

export const memorial_notificaciones_ley_2213_de_2022_manual_domina_2025: MemorialTemplate = {
  id         : 'memorial_notificaciones_ley_2213_de_2022_manual_domina_2025',
  filename   : 'memorial_notificaciones_ley_2213_de_2022_manual_domina_2025.docx',
  displayName: 'Memorial Notificaciones Ley 2213 De 2022 Manual Domina 2025',
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
      llaveProceso     : 'llaveProceso',
      'deudor.email'   : 'deudor.email'
    },
  },
  groups: [
    {
      key   : 'deudor',
      legend: 'deudor',
      fields: [
        {
          name    : 'email',
          label   : 'email',
          type    : 'text',
          required: true
        },
        {
          name    : 'nombre',
          label   : 'nombre',
          type    : 'text',
          required: true,
          format  : 'upper'
        },
      ],
    },
    {
      legend: 'Datos generales',
      fields: [
        {
          name    : 'cuantia_value',
          label   : 'cuantia_value',
          type    : 'select',
          required: true,
          format  : 'upper',
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
          format  : 'upper'
        },
        {
          name    : 'numero',
          label   : 'numero',
          type    : 'number',
          required: true
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
          format  : 'upper'
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
          format  : 'radicado'
        },
        {
          name    : 'numero',
          label   : 'numero',
          type    : 'number',
          required: true,
          format  : 'radicado'
        },
      ],
    },
    {
      key   : 'state',
      legend: 'state',
      fields: [
        {
          name    : 'fecha',
          label   : 'Fecha de la guía en el anexo',
          type    : 'date',
          required: true,
          format  : 'dateLong'
        },
        {
          name    : 'guia',
          label   : 'Número de guía',
          type    : 'text',
          required: true
        },
        {
          name    : 'message',
          label   : 'Texto que va despues de POSITIVA cuando es POSITIVA, dejar en blanco si es NEGATIVA',
          type    : 'text',
          showWhen: {
            field : 'is_positiva',
            equals: true
          },
        },
        {
          name    : 'is_positiva',
          label   : 'is_positiva',
          type    : 'boolean',
          format  : 'positivaNegativa',
          required: true
        },
      ],
    },
  ],
};
