// manifests/types.ts  (extended contract — note the added types since last turn)
// ---------------------------------------------------------------------------
export type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'currency'
  | 'textarea'
  | 'select'
  | 'boolean' // {% if X %} gate  -> checkbox, renders as bool in context
  | 'stringList'; // {% for x in xs %}{{ x }}{% endfor %} -> string[] in context

export type FieldFormat = 'none' | 'cedula' | 'currencyCOP' | 'dateLong' | 'radicado';

export interface FieldDef {
  name        : string;
  label       : string;
  type        : FieldType;
  required?   : boolean;
  placeholder?: string;
  helpText?   : string;
  options?    : { value: string; label: string }[]; // type 'select'
  format?     : FieldFormat;
}

export interface FieldGroup {
  key?       : string; // omit -> fields are top-level scalars
  legend     : string;
  fields     : FieldDef[];
  repeatable?: boolean; // maps to an array of objects
}

export interface MemorialTemplate {
  id         : string;
  filename   : string;
  displayName: string;
  description: string;
  groups     : FieldGroup[];
}

// ===========================================================================
// manifests/aportando-liquidacion-credito.ts
// ===========================================================================
export const aportandoLiquidacionCredito: MemorialTemplate = {
  id         : 'aportando-liquidacion-credito',
  filename   : 'aportando-liquidacion-credito.docx',
  displayName: 'Memorial aportando liquidación del crédito',
  description: 'Aporta la liquidación del crédito al proceso ejecutivo.',
  groups     : [
    {
      key   : 'deudor',
      legend: 'Datos del deudor',
      fields: [
        {
          name    : 'nombre',
          label   : 'Nombre del deudor',
          type    : 'text',
          required: true 
        }
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
          required: true 
        }, // revisar: ¿select? p.ej. "Civil Municipal"
        {
          name    : 'numero',
          label   : 'Número del juzgado (dígitos)',
          type    : 'text',
          required: true 
        },
        {
          name    : 'numero_escrito',
          label   : 'Número del juzgado (en letras)',
          type    : 'text',
          required: true 
        }, // revisar: derivar de `numero`
        {
          name    : 'ciudad',
          label   : 'Ciudad del juzgado',
          type    : 'text',
          required: true 
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
          format  : 'radicado' 
        },
        {
          name    : 'año',
          label   : 'Año del radicado',
          type    : 'number',
          required: true 
        },
      ],
    },
    {
      legend: 'Datos del proceso',
      fields: [
        {
          name    : 'cuantia_value',
          label   : 'Cuantía del proceso',
          type    : 'currency',
          required: true,
          format  : 'currencyCOP' 
        },
        {
          name    : 'tipo_proceso',
          label   : 'Tipo de proceso',
          type    : 'text',
          required: true 
        }, // revisar: ¿select? p.ej. "Ejecutivo"
      ],
    },
  ],
};

// ===========================================================================
// manifests/aportando-291-y-292.ts
// ===========================================================================
export const aportando291y292: MemorialTemplate = {
  id         : 'aportando-291-y-292',
  filename   : 'aportando_291_y_292.docx',
  displayName: 'Memorial aportando 291 y 292',
  description: 'Aporta los documentos 291 y 292 y (opcionalmente) anexos.',
  groups     : [
    {
      key   : 'deudor',
      legend: 'Datos del deudor',
      fields: [
        {
          name    : 'nombre',
          label   : 'Nombre del deudor',
          type    : 'text',
          required: true 
        }
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
          required: true 
        },
        {
          name    : 'numero',
          label   : 'Número del juzgado (dígitos)',
          type    : 'text',
          required: true 
        },
        {
          name    : 'numero_escrito',
          label   : 'Número del juzgado (en letras)',
          type    : 'text',
          required: true 
        },
        {
          name    : 'ciudad',
          label   : 'Ciudad del juzgado',
          type    : 'text',
          required: true 
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
          format  : 'radicado' 
        },
        {
          name    : 'año',
          label   : 'Año del radicado',
          type    : 'number',
          required: true 
        },
      ],
    },
    {
      legend: 'Datos del proceso',
      fields: [
        {
          name    : 'cuantia_value',
          label   : 'Cuantía del proceso',
          type    : 'currency',
          required: true,
          format  : 'currencyCOP' 
        },
        {
          name    : 'tipoproceso',
          label   : 'Tipo de proceso',
          type    : 'text',
          required: true 
        }, // ⚠ template usa `tipoproceso` (sin guion bajo); unificar con el otro memorial
        {
          name    : 'fecha_auto',
          label   : 'Fecha del auto',
          type    : 'date',
          required: true,
          format  : 'dateLong' 
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
          helpText: 'Un anexo por línea.' 
        },
      ],
    },
  ],
};

// ===========================================================================
// manifests/registry.ts
// ===========================================================================
export const memorialesRegistry = {
  [ aportandoLiquidacionCredito.id ]: aportandoLiquidacionCredito,
  [ aportando291y292.id ]           : aportando291y292,
} satisfies Record<string, MemorialTemplate>;

export const getTemplateById = ( id: string ): MemorialTemplate | undefined => {
  return ( memorialesRegistry as Record<string, MemorialTemplate> )[ id ];
};
