import { MemorialTemplate } from '../memoriales-manifests';


export const aportaliquidacion: MemorialTemplate = {
  id         : 'aporta-liquidacion',
  filename   : 'aportando-liquidacion-credito.docx',
  displayName: 'TODO aportando liquidacion credito.docx',
  description: 'TODO descripción de una línea',
  groups     : [
    {
      legend: 'TODO Datos generales',
      fields: [
        {
          name    : 'cuantia_value',
          label   : 'TODO cuantia_value',
          type    : 'text',
          required: true
        },
        {
          name    : 'tipo_proceso',
          label   : 'TODO tipo_proceso',
          type    : 'text',
          required: true
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
          required: true
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
          required: true
        },
        {
          name    : 'numero',
          label   : 'TODO numero',
          type    : 'number',
          required: true
        },
        {
          name    : 'numero_escrito',
          label   : 'TODO numero_escrito',
          type    : 'number',
          required: true
        },
        {
          name    : 'tipo',
          label   : 'TODO tipo',
          type    : 'text',
          required: true
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
