export function ParseFactura(
  rawFactura: string 
) {
  const facturaMap = new Map();

  const rawKeyValues = rawFactura.split(
    '\n' 
  );

  for ( const rawKV of rawKeyValues ) {
    const [
      key,
      value
    ] = rawKV.split(
      ':' 
    );
    facturaMap.set(
      key, value 
    );
  }

  return Object.fromEntries(
    facturaMap 
  );
}
