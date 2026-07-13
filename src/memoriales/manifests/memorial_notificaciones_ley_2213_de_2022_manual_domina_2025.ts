import type { MemorialTemplate } from './types';

export const memorial_notificaciones_ley_2213_de_2022_manual_domina_2025: MemorialTemplate = {
  id: 'memorial_notificaciones_ley_2213_de_2022_manual_domina_2025',
  filename: 'memorial_notificaciones_ley_2213_de_2022_manual_domina_2025.docx',
  displayName: 'memorial_notificaciones_ley_2213_de_2022_manual_domina_2025.docx',
  description: 'descripción de una línea',
  groups: [
    { legend: 'Datos generales',
      fields: [
      { name: 'anexos_list[]', label: 'anexos_list[]', type: 'text', required: true },
      { name: 'cuantia_value', label: 'cuantia_value', type: 'text', required: true },
      { name: 'guia_number', label: 'guia_number', type: 'text', required: true },
      { name: 'is_positiva', label: 'is_positiva', type: 'text', required: true },
      { name: 'llaveProceso', label: 'llaveProceso', type: 'text', required: true },
      { name: 'tipo_proceso', label: 'tipo_proceso', type: 'text', required: true },
      { name: 'has_anexos', label: 'has_anexos', type: 'boolean', required: true },
      ] },
    { key: 'deudor', legend: 'deudor',
      fields: [
      { name: 'nombre', label: 'nombre', type: 'text', required: true },
      ] },
    { key: 'juzgado', legend: 'juzgado',
      fields: [
      { name: 'ciudad', label: 'ciudad', type: 'text', required: true },
      { name: 'numero', label: 'numero', type: 'number', required: true },
      { name: 'numero_escrito', label: 'numero_escrito', type: 'number', required: true },
      { name: 'tipo', label: 'tipo', type: 'text', required: true },
      ] },
    { key: 'radicado', legend: 'radicado',
      fields: [
      { name: 'año', label: 'año', type: 'text', required: true },
      { name: 'numero', label: 'numero', type: 'number', required: true },
      ] },
  ],
};
