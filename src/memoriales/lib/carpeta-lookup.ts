import type { IntCarpeta } from '#@/lib/types/carpetas';

/**
 * The trimmed carpeta shape used for client-side form autofill: identifying info plus
 * the juzgado and radicado subsets a memorial template may need. Returned by
 * `getCarpetasLookup`/`toCarpetaLookup` and consumed by `useCarpetasLookup`.
 */
export interface CarpetaLookup {
  numero      : number;
  nombre      : string;
  deudorNombre: string;
  juzgado: {
    tipo  : string | null;
    ciudad: string | null;
    numero: string | null;
  };
  radicado: {
    numero: string | null;
    año   : string | null;
  };
  tipoProceso : string | null;
  llaveProceso: string | null;
}

/** Fixed digit width the radicado "número" is zero-padded to. Consumed by `parseRadicado`. */
const RADICADO_NUMERO_LENGTH = 5;

/** DB stores radicado as `"<año>-<numero>"`; the número side is padded to match the 5-digit consecutivo used on the templates. */
function parseRadicado( raw: string | null | undefined ): {
  numero: string | null;
  año   : string | null;
} {
  if ( !raw ) {
    return {
      numero: null,
      año   : null,
    };
  }

  const [
    añoPart,
    numeroPart
  ] = raw.split( '-' );

  if ( !añoPart || !numeroPart ) {
    return {
      numero: null,
      año   : null,
    };
  }

  return {
    año   : añoPart.trim(),
    numero: numeroPart.trim()
      .padStart(
        RADICADO_NUMERO_LENGTH, '0' 
      ),
  };
}

/**
 * Builds the debtor's full display name by joining the non-empty name parts
 * (primer/segundo nombre, primer/segundo apellido). Falls back to `carpeta.nombre`
 * when there is no debtor or all name parts are empty.
 * @param carpeta - the raw carpeta record.
 * @returns the composed debtor name, or `carpeta.nombre` as a fallback.
 */
function composeDeudorNombre( carpeta: IntCarpeta ): string {
  if ( !carpeta.deudor ) {
    return carpeta.nombre;
  }

  const parts = [
    carpeta.deudor.primerNombre,
    carpeta.deudor.segundoNombre,
    carpeta.deudor.primerApellido,
    carpeta.deudor.segundoApellido,
  ].filter( ( part ): part is string => {
    return !!part && part.trim().length > 0;
  } );

  return parts.length > 0
    ? parts.join( ' ' )
    : carpeta.nombre;
}

/**
 * Maps a raw `IntCarpeta` domain record into the trimmed `CarpetaLookup` DTO, extracting
 * juzgado/radicado fields with null fallbacks and normalizing tipoProceso/llaveProceso.
 * Used by `getCarpetasLookup`.
 * @param carpeta - the raw carpeta record from the domain layer.
 * @returns the lookup DTO for client-side autofill.
 */
export function toCarpetaLookup( carpeta: IntCarpeta ): CarpetaLookup {
  return {
    numero      : carpeta.numero,
    nombre      : carpeta.nombre,
    deudorNombre: composeDeudorNombre( carpeta ),
    juzgado     : {
      tipo  : carpeta.juzgado?.tipo ?? null,
      ciudad: carpeta.juzgado?.ciudad ?? null,
      numero: carpeta.juzgado?.id ?? null,
    },
    radicado    : parseRadicado( carpeta.demanda?.radicado ),
    tipoProceso : carpeta.demanda?.tipoProceso ?? carpeta.tipoProceso ?? null,
    llaveProceso: carpeta.llaveProceso || null,
  };
}
