/**
 * Union of form-field widget kinds a `FieldDef` can render as.
 *
 * `boolean` maps to a Jinja `{% if %}` gate, and `stringList` maps to a
 * Jinja `{% for %}` loop over strings.
 */
export type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'currency'
  | 'textarea'
  | 'select'
  | 'boolean' // {% if X %} gate  -> checkbox, renders as bool in context
  | 'stringList'; // {% for x in xs %}{{ x }}{% endfor %} -> string[] in context

/**
 * Union of output-formatting transforms applied to a field's value when
 * building the render context. `positivaNegativa` turns a boolean into
 * `'POSITIVA'` / `'NEGATIVA'` text. Consumed by `lib/formatters.ts`'s
 * `applyFormat`.
 */
export type FieldFormat =
  | 'none'
  | 'cedula'
  | 'currencyCOP'
  | 'dateLong'
  | 'radicado'
  | 'radicadoNumero'
  | 'upper'
  | 'positivaNegativa'; // boolean -> 'POSITIVA' | 'NEGATIVA' text

/**
 * Describes a single form field: its name, label, widget type, optional
 * required/placeholder/helpText/options (for `select`)/format, and whether
 * it is derived (a computed value excluded from the form and input schema,
 * e.g. `numero_escrito`).
 */
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
  showWhen?   : { field: string; equals: boolean }; // hide this field unless the named sibling field's value equals `equals`
}

/**
 * A section of the form. An optional `key` nests its fields under an
 * object path in the render context (omitting `key` means top-level
 * scalars), `legend` is the section heading, and `repeatable` marks it as
 * an array-of-objects group.
 */
export interface FieldGroup {
  key?       : string; // omit -> fields are top-level scalars
  legend     : string;
  fields     : FieldDef[];
  repeatable?: boolean; // maps to an array of objects
}

/**
 * Config for datalist-driven autofill. `triggerField` is the dotted form
 * path (e.g. `deudor.nombre`) hosting the datalist, and `fieldMap` maps
 * form dotted paths to `CarpetaLookup` dotted paths to pull suggested
 * values from.
 */
export interface AutofillConfig {
  triggerField: string; // dotted form path hosting the datalist, e.g. 'deudor.nombre'
  fieldMap    : Record<string, string>; // form dotted path -> CarpetaLookup dotted path
}

/**
 * The top-level manifest shape. `id` must match the manifest filename
 * basename, `filename` is the `.docx` template file in `templates/`,
 * `groups` are the form fields, and `autofill` is an optional autofill
 * config.
 */
export interface MemorialTemplate {
  id         : string;
  filename   : string;
  displayName: string;
  description: string;
  groups     : FieldGroup[];
  autofill?  : AutofillConfig;
}
