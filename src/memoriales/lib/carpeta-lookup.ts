import type { IntCarpeta } from '#@/lib/types/carpetas';

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
  tipoProceso: string | null;
}

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
    radicado   : parseRadicado( carpeta.demanda?.radicado ),
    tipoProceso: carpeta.demanda?.tipoProceso ?? carpeta.tipoProceso ?? null,
  };
}
