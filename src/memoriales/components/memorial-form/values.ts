import type { FieldGroup, MemorialTemplate } from '#@/memoriales/manifests/types';

type ValuesRecord = Record<string, unknown>;

function isRecord( value: unknown ): value is ValuesRecord {
  return typeof value === 'object' && value !== null && !Array.isArray( value );
}

function defaultForField( field: { type: string } ): unknown {
  if ( field.type === 'boolean' ) {
    return false;
  }

  if ( field.type === 'stringList' ) {
    return [
      {
        value: ''
      }
    ];
  }

  return '';
}

function defaultGroupValues( group: FieldGroup ): ValuesRecord {
  const result: ValuesRecord = {};

  for ( const field of group.fields ) {
    if ( field.derived ) {
      continue;
    }

    result[ field.name ] = defaultForField( field );
  }

  return result;
}

/** RHF default values — `stringList` fields use the `{value: string}[]` shadow shape `useFieldArray` needs. */
export function defaultValuesForTemplate( template: MemorialTemplate ): ValuesRecord {
  const values: ValuesRecord = {};

  for ( const group of template.groups ) {
    if ( group.key ) {
      values[ group.key ] = group.repeatable
        ? []
        : defaultGroupValues( group );
    } else {
      Object.assign(
        values, defaultGroupValues( group ) 
      );
    }
  }

  return values;
}

function assembleGroupValues(
  group: FieldGroup, rawGroup: ValuesRecord 
): ValuesRecord {
  const booleanField = group.fields.find( ( field ) => {
    return field.type === 'boolean';
  } );
  const gateValue = booleanField
    ? Boolean( rawGroup[ booleanField.name ] )
    : true;
  const result: ValuesRecord = {};

  for ( const field of group.fields ) {
    if ( field.derived ) {
      continue;
    }

    if ( field.type === 'stringList' ) {
      const rows = Array.isArray( rawGroup[ field.name ] )
        ? rawGroup[ field.name ] as { value?: string }[]
        : [];

      result[ field.name ] = gateValue
        ? rows.map( ( row ) => {
            return ( row?.value ?? '' ).trim();
          } )
            .filter( ( value ) => {
              return value.length > 0;
            } )
        : [];

      continue;
    }

    result[ field.name ] = rawGroup[ field.name ];
  }

  return result;
}

/** Flattens the RHF shadow shape (stringList rows, has_anexos gating) into plain submit values. */
export function assembleSubmitValues(
  template: MemorialTemplate, raw: ValuesRecord 
): ValuesRecord {
  const values: ValuesRecord = {};

  for ( const group of template.groups ) {
    if ( group.key ) {
      const rawGroupValue = raw[ group.key ];

      if ( group.repeatable ) {
        const rows = Array.isArray( rawGroupValue )
          ? rawGroupValue
          : [];

        values[ group.key ] = rows.map( ( row ) => {
          return assembleGroupValues(
            group, isRecord( row )
              ? row
              : {} 
          );
        } );
      } else {
        values[ group.key ] = assembleGroupValues(
          group, isRecord( rawGroupValue )
            ? rawGroupValue
            : {} 
        );
      }
    } else {
      Object.assign(
        values, assembleGroupValues(
          group, raw 
        ) 
      );
    }
  }

  return values;
}
