import type { MemorialTemplate } from './types';

/**
 * MemorialTemplate manifest for the memorial terminating a process due to
 * payment of overdue installments, rendered from
 * templates/terminacion_pago_cuotas_en_mora.docx.
 */
export const terminacion_pago_cuotas_en_mora: MemorialTemplate = {
  id         : 'terminacion_pago_cuotas_en_mora',
  filename   : 'terminacion_pago_cuotas_en_mora.docx',
  displayName: 'Terminacion Pago Cuotas En Mora',
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
  ],
};
