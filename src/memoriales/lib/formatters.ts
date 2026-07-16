import type { FieldFormat } from '#@/memoriales/manifests/types';

/** Formats a number as Colombian peso currency (e.g. `$ 1.000.000`). */
export function formatCurrencyCOP( value: number ): string {
  return new Intl.NumberFormat(
    'es-CO', {
      style                : 'currency',
      currency             : 'COP',
      maximumFractionDigits: 0,
    } 
  )
    .format( value );
}

/** Formats an ISO date string (`YYYY-MM-DD`) as a long-form Spanish date (e.g. "16 de julio de 2026"). */
export function formatDateLong( value: string ): string {
  const date = new Date( `${ value }T00:00:00` );

  return new Intl.DateTimeFormat(
    'es-CO', {
      day  : 'numeric',
      month: 'long',
      year : 'numeric',
    } 
  )
    .format( date );
}

/** Strips all non-digit characters from a radicado value. */
export function formatRadicado( value: string ): string {
  return value.replace(
    /\D/g, ''
  );
}

/** Fixed digit width for zero-padding a radicado "número". Used by `formatRadicadoNumero`. */
export const RADICADO_NUMERO_LENGTH = 5;

/** Strips non-digits from a radicado "número" and left-pads it to `RADICADO_NUMERO_LENGTH`. */
export function formatRadicadoNumero( value: string ): string {
  return formatRadicado( value )
    .padStart(
      RADICADO_NUMERO_LENGTH, '0'
    );
}

/** Strips non-digit characters and inserts thousands-separator dots (e.g. `1.234.567`). */
export function formatCedula( value: string | number ): string {
  const digits = String( value )
    .replace(
      /\D/g, '' 
    );

  return digits.replace(
    /\B(?=(\d{3})+(?!\d))/g, '.' 
  );
}

/** Uppercases the given string. */
export function formatUpper( value: string ): string {
  return value.toUpperCase();
}

/** Renders a boolean as `'POSITIVA'` or `'NEGATIVA'`. */
export function formatPositivaNegativa( value: boolean ): string {
  return value
    ? 'POSITIVA'
    : 'NEGATIVA';
}

/**
 * Dispatches to the matching formatter above based on a template field's declared
 * `format`, falling back to `String(value)` when no format (or an unrecognized one) is
 * given. This is the single entry point build-context.ts uses to format field values.
 * @param format - the field's declared format, if any.
 * @param value - the raw value to format.
 * @returns the formatted string.
 */
export function applyFormat(
  format: FieldFormat | undefined,
  value: string | number,
): string {
  switch ( format ) {
      case 'currencyCOP':
        return formatCurrencyCOP( Number( value ) );

      case 'dateLong':
        return formatDateLong( String( value ) );

      case 'radicado':
        return formatRadicado( String( value ) );

      case 'radicadoNumero':
        return formatRadicadoNumero( String( value ) );

      case 'cedula':
        return formatCedula( value );

      case 'upper':
        return formatUpper( String( value ) );
      default:
        return String( value );
  }
}
