/** Spanish masculine ordinal words for digits 1-9. Lookup table for the 1-9 branch of `numeroJuzgadoEnPalabras`. */
const UNITS = [
  '',
  'primero',
  'segundo',
  'tercero',
  'cuarto',
  'quinto',
  'sexto',
  'séptimo',
  'octavo',
  'noveno',
];
/** Spanish cardinal units 1-9, used only when compounding with tens (31-99, e.g. "cuarenta y nueve"). */
const CARDINAL_UNITS = [
  '',
  'uno',
  'dos',
  'tres',
  'cuatro',
  'cinco',
  'seis',
  'siete',
  'ocho',
  'nueve',
];
/** Spanish cardinal words for 10-19 (irregular forms). */
const CARDINAL_TEENS = [
  'diez',
  'once',
  'doce',
  'trece',
  'catorce',
  'quince',
  'dieciséis',
  'diecisiete',
  'dieciocho',
  'diecinueve',
];
/** Spanish cardinal words for 20-29 (contracted forms with accent shifts). */
const CARDINAL_TWENTIES = [
  'veinte',
  'veintiuno',
  'veintidós',
  'veintitrés',
  'veinticuatro',
  'veinticinco',
  'veintiséis',
  'veintisiete',
  'veintiocho',
  'veintinueve',
];
/** Spanish cardinal words for the tens digit, 30-90 in steps of ten (index 3-9; 0-2 unused). */
const CARDINAL_TENS = [
  '',
  '',
  '',
  'treinta',
  'cuarenta',
  'cincuenta',
  'sesenta',
  'setenta',
  'ochenta',
  'noventa',
];

/**
 * Spanish written form for 1–99: ordinal for 1-9 (e.g. 4 -> "cuarto"), cardinal from
 * 10 up (e.g. 10 -> "diez", 49 -> "cuarenta y nueve").
 */
export function numeroJuzgadoEnPalabras( n: number ): string | null {
  if ( !Number.isInteger( n ) || n < 1 || n > 99 ) {
    return null;
  }

  if ( n < 10 ) {
    return UNITS[ n ];
  }

  if ( n < 20 ) {
    return CARDINAL_TEENS[ n - 10 ];
  }

  if ( n < 30 ) {
    return CARDINAL_TWENTIES[ n - 20 ];
  }

  const tens = Math.floor( n / 10 );
  const units = n % 10;

  if ( units === 0 ) {
    return CARDINAL_TENS[ tens ];
  }

  return `${ CARDINAL_TENS[ tens ] } y ${ CARDINAL_UNITS[ units ] }`;
}

/** Derives `juzgado.numero_escrito` from `juzgado.numero`; falls back to the raw value if unparseable. */
export function deriveNumeroEscrito( numeroRaw: string ): string {
  const parsed = Number.parseInt(
    numeroRaw, 10
  );
  const palabra = numeroJuzgadoEnPalabras( parsed );

  if ( palabra === null ) {
    console.warn( `[memoriales] no se pudo derivar numero_escrito desde "${ numeroRaw }"; se usa el valor original.`, );

    return numeroRaw;
  }

  return palabra;
}
