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
