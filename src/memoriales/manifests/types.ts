export type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'currency'
  | 'textarea'
  | 'select'
  | 'boolean' // {% if X %} gate  -> checkbox, renders as bool in context
  | 'stringList'; // {% for x in xs %}{{ x }}{% endfor %} -> string[] in context

export type FieldFormat = 'none' | 'cedula' | 'currencyCOP' | 'dateLong' | 'radicado' | 'upper';

export interface FieldDef {
  name        : string;
  label       : string;
  type        : FieldType;
  required?   : boolean;
  placeholder?: string;
  helpText?   : string;
  options?    : { value: string; label: string }[]; // type 'select'
  format?     : FieldFormat;
  derived?    : boolean; // computed into the render context; excluded from the form and input schema
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
