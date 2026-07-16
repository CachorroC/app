/**
 * Safely walks a dot-delimited path (e.g. `"juzgado.numero"`) into a nested values
 * object, returning `undefined` if any intermediate key is missing, null, or not an
 * object. Used for conditional field visibility and autofill lookups in
 * components/memorial-form/autofill-context.tsx and components/fieldset/index.tsx.
 * @param values - the (possibly nested) object to read from.
 * @param path - a dot-delimited key path, e.g. `"juzgado.numero"`.
 * @returns the value found at `path`, or `undefined` if the path can't be resolved.
 */
export function getPath(
  values: Record<string, unknown>,
  path: string,
): unknown {
  return path.split( '.' )
    .reduce<unknown>(
      (
        acc, key 
      ) => {
        if ( acc === null || typeof acc !== 'object' ) {
          return undefined;
        }

        return ( acc as Record<string, unknown> )[ key ];
      }, values 
    );
}
