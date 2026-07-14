import type { MemorialTemplate } from './types';

export const memorial_notificaciones_ley_2213_de_2022_manual_domina_2025: MemorialTemplate
  = {
    id: 'memorial_notificaciones_ley_2213_de_2022_manual_domina_2025',
    filename:
      'memorial_notificaciones_ley_2213_de_2022_manual_domina_2025.docx',
    displayName:
      'memorial_notificaciones_ley_2213_de_2022_manual_domina_2025.docx',
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
          },
          {
            name    : 'guia_number',
            label   : 'guia_number',
            type    : 'text',
            required: true,
          },
          {
            name    : 'is_positiva',
            label   : 'Notificación positiva',
            type    : 'boolean',
            format  : 'positivaNegativa',
            required: true,
          },
          {
            name    : 'llaveProceso',
            label   : 'llaveProceso',
            type    : 'text',
            required: true,
          },
          {
            name    : 'tipo_proceso',
            label   : 'tipo_proceso',
            type    : 'text',
            required: true,
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
    ],
  };
