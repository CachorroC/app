/** Spanish masculine ordinal words for digits 0-9 (index 0 is unused). Lookup table for `ordinalMasculino`. */
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
/** Spanish masculine ordinal words for tens, 0-90 in steps of ten. Lookup table for `ordinalMasculino`. */
const TENS = [
  '',
  'décimo',
  'vigésimo',
  'trigésimo',
  'cuadragésimo',
  'quincuagésimo',
  'sexagésimo',
  'septuagésimo',
  'octogésimo',
  'nonagésimo',
];

/** Spanish masculine ordinal for 1–99 (e.g. 4 -> "cuarto", 84 -> "octogésimo cuarto"). */
export function ordinalMasculino( n: number ): string | null {
  if ( !Number.isInteger( n ) || n < 1 || n > 99 ) {
    return null;
  }

  if ( n < 10 ) {
    return UNITS[ n ];
  }

  if ( n % 10 === 0 ) {
    return TENS[ n / 10 ];
  }

  const tens = Math.floor( n / 10 );
  const units = n % 10;

  return `${ TENS[ tens ] } ${ UNITS[ units ] }`;
}

/** Derives `juzgado.numero_escrito` from `juzgado.numero`; falls back to the raw value if unparseable. */
export function deriveNumeroEscrito( numeroRaw: string ): string {
  const parsed = Number.parseInt(
    numeroRaw, 10 
  );
  const ordinal = ordinalMasculino( parsed );

  if ( ordinal === null ) {
    console.warn( `[memoriales] no se pudo derivar numero_escrito desde "${ numeroRaw }"; se usa el valor original.`, );

    return numeroRaw;
  }

  return ordinal;
}
