import { z } from 'zod';
import type { FieldDef, MemorialTemplate } from '#@/memoriales/manifests/types';

function fieldSchema( field: FieldDef ): z.ZodTypeAny {
  if ( field.type === 'number' || field.type === 'currency' ) {
    const base = z.coerce.number( {
      error: 'Ingrese un número válido' 
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

    const enumSchema = z.enum( values as [ string, ...string[] ], {
      error: 'Seleccione una opción válida'
    } );

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

export function buildSchema( template: MemorialTemplate ): z.ZodObject<z.ZodRawShape> {
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
