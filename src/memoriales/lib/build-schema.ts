import { z } from 'zod';
import type { FieldDef, MemorialTemplate } from '#@/memoriales/manifests/types';

/**
 * Given a field definition, returns the matching Zod validator for its declared type
 * (number/currency coerced to number, boolean, stringList, select mapped to an enum,
 * else plain string), using Spanish user-facing error messages.
 * @param field - the field definition to build a validator for.
 * @returns a Zod schema enforcing that field's type and required-ness.
 */
function fieldSchema( field: FieldDef ): z.ZodTypeAny {
  if ( field.type === 'number' || field.type === 'currency' ) {
    const base = z.coerce.number( {
      error: 'Ingrese un número válido',
    } );

    return field.required
      ? base
      : base.optional();
  }

  if ( field.type === 'boolean' ) {
    return z.boolean()
      .default( false );
  }

  if ( field.type === 'stringList' ) {
    return z.array( z.string() )
      .optional();
  }

  if ( field.type === 'select' ) {
    const values = ( field.options ?? [] ).map( ( option ) => {
      return option.value;
    } );

    if ( values.length === 0 ) {
      return z.string();
    }

    const enumSchema = z.enum(
      values as [string, ...string[]], {
        error: 'Seleccione una opción válida',
      } 
    );

    return field.required
      ? enumSchema
      : enumSchema.optional();
  }

  return field.required
    ? z.string()
        .min(
          1, 'Este campo es obligatorio' 
        )
    : z.string()
        .optional();
}

/**
 * Builds a Zod object shape from a group's field definitions, skipping derived fields
 * (which are computed rather than user-supplied).
 * @param fields - the group's field definitions.
 * @returns a shape mapping field name to its Zod validator.
 */
function groupShape( fields: FieldDef[] ): Record<string, z.ZodTypeAny> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for ( const field of fields ) {
    if ( field.derived ) {
      continue;
    }

    shape[ field.name ] = fieldSchema( field );
  }

  return shape;
}

/**
 * Dynamically builds a Zod validation schema from a memorial template's field groups,
 * for server-side validation. Nests grouped fields under their group key (wrapping in
 * `z.array` when the group is repeatable) and inlines ungrouped fields at the top level.
 * Used by `generateMemorial` to `safeParse` raw client input.
 * @param template - the memorial template describing the fields to validate.
 * @returns a Zod object schema matching the template's shape.
 */
export function buildSchema( template: MemorialTemplate, ): z.ZodObject<z.ZodRawShape> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for ( const group of template.groups ) {
    const fieldsShape = groupShape( group.fields );

    if ( Object.keys( fieldsShape ).length === 0 ) {
      continue;
    }

    if ( group.key ) {
      const groupSchema = z.object( fieldsShape );

      shape[ group.key ] = group.repeatable
        ? z.array( groupSchema )
        : groupSchema;
    } else {
      Object.assign(
        shape, fieldsShape 
      );
    }
  }

  return z.object( shape );
}
