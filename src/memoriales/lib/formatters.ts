import type { FieldFormat } from '#@/memoriales/manifests/types';

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

export function formatRadicado( value: string ): string {
  return value.replace(
    /\D/g, ''
  );
}

export const RADICADO_NUMERO_LENGTH = 5;

export function formatRadicadoNumero( value: string ): string {
  return formatRadicado( value )
    .padStart(
      RADICADO_NUMERO_LENGTH, '0'
    );
}

export function formatCedula( value: string | number ): string {
  const digits = String( value )
    .replace(
      /\D/g, '' 
    );

  return digits.replace(
    /\B(?=(\d{3})+(?!\d))/g, '.' 
  );
}

export function formatUpper( value: string ): string {
  return value.toUpperCase();
}

export function formatPositivaNegativa( value: boolean ): string {
  return value
    ? 'POSITIVA'
    : 'NEGATIVA';
}

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
