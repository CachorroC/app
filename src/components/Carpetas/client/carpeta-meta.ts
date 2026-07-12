import { MonCarpeta } from '#@/lib/types/carpetas';
import { EstadoTag, getEstadoTags } from '#@/app/Hooks/useCarpetasreducer';

export type CategoryColor =
  'primary' | 'tertiary' | 'secondary' | 'error' | 'success' | 'neutral';

export type CategoryMeta = {
  label: string;
  color: CategoryColor;
};

const CATEGORY_META: Record<string, CategoryMeta> = {
  Bancolombia: {
    label: 'Bancolombia',
    color: 'tertiary',
  },
  Reintegra: {
    label: 'Reintegra',
    color: 'primary',
  },
  Insolvencia: {
    label: 'Insolvencia',
    color: 'error',
  },
  LiosJuridicos: {
    label: 'Líos Jurídicos',
    color: 'secondary',
  },
  Terminados: {
    label: 'Terminados',
    color: 'success',
  },
  SinTercero: {
    label: 'Sin tercero',
    color: 'neutral',
  },
  SinEspecificar: {
    label: 'Sin especificar',
    color: 'neutral',
  },
};

export function getCategoryMeta( category: string ): CategoryMeta {
  return CATEGORY_META[ category ] ?? CATEGORY_META.SinEspecificar;
}

export const ESTADO_COLOR: Record<EstadoTag, CategoryColor> = {
  Activo   : 'tertiary',
  Terminado: 'success',
  Revisado : 'primary',
  Pendiente: 'neutral',
};

export function getEstadoBadges( carpeta: MonCarpeta, ): { label: EstadoTag; color: CategoryColor }[] {
  return getEstadoTags( carpeta )
    .map( ( tag ) => {
      return {
        label: tag,
        color: ESTADO_COLOR[ tag ],
      };
    } );
}

export function clean( value: string | null | undefined ): string | null {
  if ( value === null || value === undefined ) {
    return null;
  }

  const trimmed = value.trim();

  if (
    !trimmed
    || trimmed === 'N/A'
    || trimmed === 'undefined'
    || trimmed === 'null'
  ) {
    return null;
  }

  return trimmed;
}

export function deudorNombre( carpeta: MonCarpeta ): string | null {
  const {
    deudor 
  } = carpeta;

  if ( !deudor ) {
    return null;
  }

  const parts = [
    deudor.primerNombre,
    deudor.segundoNombre,
    deudor.primerApellido,
    deudor.segundoApellido,
  ]
    .map( clean )
    .filter( ( value ): value is string => {
      return Boolean( value );
    } );

  return parts.length
    ? parts.join( ' ' )
    : null;
}

export function fmtDate( date: Date | string | null | undefined ): string | null {
  if ( !date ) {
    return null;
  }

  const parsed = date instanceof Date
    ? date
    : new Date( date );

  if ( Number.isNaN( parsed.getTime() ) ) {
    return null;
  }

  return parsed.toLocaleDateString(
    'es-CO', {
      day  : '2-digit',
      month: 'short',
      year : 'numeric',
    } 
  );
}

export function fmtMoney( value: number | null | undefined ): string | null {
  if ( value === null || value === undefined ) {
    return null;
  }

  const rounded = Math.round( value );

  if ( !rounded || Number.isNaN( rounded ) ) {
    return null;
  }

  return `$ ${ rounded.toLocaleString( 'es-CO' ) }`;
}

export function juzgadoText( carpeta: MonCarpeta ): string {
  const tipo = clean( carpeta.juzgado?.tipo ?? carpeta.juzgadoTipo );
  const ciudad = clean( carpeta.juzgado?.ciudad ?? carpeta.juzgadoCiudad ?? carpeta.ciudad, );
  const parts = [
    tipo,
    ciudad
  ].filter( ( value ): value is string => {
    return Boolean( value );
  } );

  return parts.length
    ? parts.join( ' · ' )
    : 'Sin juzgado';
}

export function ultimaActuacionText( carpeta: MonCarpeta ): {
  text: string;
  date: string | null;
} {
  const actuacion = carpeta.ultimaActuacion;
  const text = actuacion
    ? ( clean( actuacion.actuacion ) ?? 'Sin actuación registrada' )
    : 'Sin actuación registrada';
  const date = actuacion
    ? fmtDate( actuacion.fechaActuacion )
    : null;

  return {
    text,
    date,
  };
}
