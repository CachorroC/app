import type { FieldDef, FieldGroup, MemorialTemplate } from '#@/memoriales/manifests/types';
import { applyFormat } from './formatters';
import { deriveNumeroEscrito } from './derive';

export type RenderContext = Record<string, unknown>;
type ValuesRecord = Record<string, unknown>;

function isRecord( value: unknown ): value is ValuesRecord {
  return typeof value === 'object' && value !== null && !Array.isArray( value );
}

function formatFieldValue(
  field: FieldDef, value: unknown 
): unknown {
  if ( field.type === 'boolean' ) {
    return Boolean( value );
  }

  if ( field.type === 'stringList' ) {
    return Array.isArray( value )
      ? value.map( ( item ) => {
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

function assembleGroupFields(
  fields: FieldDef[], groupValues: ValuesRecord 
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

function assembleGroup(
  group: FieldGroup, rawValue: unknown 
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

function deriveJuzgadoNumeroEscrito(
  template: MemorialTemplate, context: RenderContext
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

export function buildContext(
  template: MemorialTemplate, values: ValuesRecord 
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
