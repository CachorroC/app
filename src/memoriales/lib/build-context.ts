import type { FieldDef,
  FieldGroup,
  MemorialTemplate, } from '#@/memoriales/manifests/types';
import { applyFormat, formatPositivaNegativa } from './formatters';
import { deriveNumeroEscrito } from './derive';

/** The final render-context object handed off to the Python document-rendering service. */
export type RenderContext = Record<string, unknown>;
/** Internal alias for raw/partial form-value objects keyed by field or group name. */
type ValuesRecord = Record<string, unknown>;

/** Type guard — true if `value` is a non-null, non-array object. */
function isRecord( value: unknown ): value is ValuesRecord {
  return typeof value === 'object' && value !== null && !Array.isArray( value );
}

/**
 * Applies type-specific handling to a single field's raw value, producing its
 * context-ready representation.
 * @param field - the field definition, used to pick the right handling (boolean/positivaNegativa,
 * stringList, or a formatter via `applyFormat`).
 * @param value - the raw value collected from the form.
 * @returns the formatted value to place in the render context.
 */
function formatFieldValue(
  field: FieldDef, value: unknown 
): unknown {
  if ( field.type === 'boolean' ) {
    return field.format === 'positivaNegativa'
      ? formatPositivaNegativa( Boolean( value ) )
      : Boolean( value );
  }

  if ( field.type === 'stringList' ) {
    return Array.isArray( value )
      ? value
          .map( ( item ) => {
            return String( item )
              .trim();
          } )
          .filter( ( item ) => {
            return item.length > 0;
          } )
      : [];
  }

  if ( value === undefined || value === null || value === '' ) {
    return value ?? '';
  }

  return applyFormat(
    field.format, value as string | number 
  );
}

/**
 * Builds an output record from a group's field definitions and raw values, skipping
 * derived fields (which are computed separately).
 * @param fields - the group's field definitions.
 * @param groupValues - the raw values for that group.
 * @returns a record of formatted field values keyed by field name.
 */
function assembleGroupFields(
  fields: FieldDef[],
  groupValues: ValuesRecord,
): ValuesRecord {
  const result: ValuesRecord = {};

  for ( const field of fields ) {
    if ( field.derived ) {
      continue;
    }

    result[ field.name ] = formatFieldValue(
      field, groupValues[ field.name ] 
    );
  }

  return result;
}

/**
 * Assembles a group's context value, handling both repeatable groups (one record per
 * row) and single-object groups.
 * @param group - the group definition.
 * @param rawValue - the raw value(s) for that group, as collected from the form.
 * @returns a single record, or an array of records when the group is repeatable.
 */
function assembleGroup(
  group: FieldGroup,
  rawValue: unknown,
): ValuesRecord | ValuesRecord[] {
  if ( group.repeatable ) {
    const rows = Array.isArray( rawValue )
      ? rawValue
      : [];

    return rows.map( ( row ) => {
      return assembleGroupFields(
        group.fields, isRecord( row )
          ? row
          : {} 
      );
    } );
  }

  return assembleGroupFields(
    group.fields, isRecord( rawValue )
      ? rawValue
      : {} 
  );
}

/**
 * Computes the derived `juzgado.numero_escrito` ordinal field (e.g. "cuarto") from
 * `juzgado.numero` and mutates `context` in place.
 * @param template - the template, used to locate the `juzgado` group's derived field definition.
 * @param context - the render context being assembled; mutated in place.
 */
function deriveJuzgadoNumeroEscrito(
  template: MemorialTemplate,
  context: RenderContext,
): void {
  const juzgadoGroup = template.groups.find( ( group ) => {
    return group.key === 'juzgado';
  } );
  const numeroEscritoField = juzgadoGroup?.fields.find( ( field ) => {
    return field.name === 'numero_escrito' && field.derived;
  } );

  if ( !numeroEscritoField || !isRecord( context.juzgado ) ) {
    return;
  }

  const {
    juzgado 
  } = context;

  const derived = deriveNumeroEscrito( String( juzgado.numero ?? '' ) );

  juzgado.numero_escrito = applyFormat(
    numeroEscritoField.format, derived 
  );
}

/**
 * Transforms validated form values into the final render-context object sent to the
 * document-rendering service. Called by `generateMemorial` (in generate-memorial.ts)
 * after schema validation succeeds.
 * @param template - the memorial template describing the field groups to assemble.
 * @param values - the validated form values, keyed by group key (or flat, for ungrouped fields).
 * @returns the assembled render context, including derived fields.
 */
export function buildContext(
  template: MemorialTemplate,
  values: ValuesRecord,
): RenderContext {
  const context: RenderContext = {};

  for ( const group of template.groups ) {
    if ( group.key ) {
      context[ group.key ] = assembleGroup(
        group, values[ group.key ] 
      );
    } else {
      Object.assign(
        context, assembleGroupFields(
          group.fields, values 
        ) 
      );
    }
  }

  deriveJuzgadoNumeroEscrito(
    template, context 
  );

  return context;
}
