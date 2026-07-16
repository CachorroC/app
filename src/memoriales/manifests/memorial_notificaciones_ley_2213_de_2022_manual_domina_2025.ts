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
          format  : 'upper'
        }
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
          name    : 'guia_number',
          label   : 'guia_number',
          type    : 'text',
          required: true
        },
        {
          name    : 'is_positiva',
          label   : 'is_positiva',
          type    : 'boolean',
          format  : 'positivaNegativa',
          required: true
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
          format  : 'radicadoNumero'
        },
      ],
    },
    {
      legend: 'Anexos',
      fields: [
        {
          name : 'has_anexos',
          label: '¿Incluye anexos?',
          type : 'boolean'
        },
        {
          name    : 'anexos_list',
          label   : 'Anexos',
          type    : 'stringList',
          helpText: 'Un elemento por línea.',
        },
      ],
    },
  ],
};
