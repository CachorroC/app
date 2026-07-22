/** Puntaje 0-4: +1 por longitud>=8, +1 mayúsculas y minúsculas, +1 dígito, +1 símbolo. */
export function passwordScore( pw: string ): number {
  let n = 0;

  if ( pw.length >= 8 ) {
    n++;
  }

  if ( /[A-Z]/.test( pw ) && /[a-z]/.test( pw ) ) {
    n++;
  }

  if ( /\d/.test( pw ) ) {
    n++;
  }

  if ( /[^A-Za-z0-9]/.test( pw ) ) {
    n++;
  }

  return Math.min(
    n, 4
  );
}
