import { DatabaseActuacionType } from '#@/lib/types/actuaciones';
import type { ActuacionCardProps } from './actuacion-card';

/** Compact `dd mmm yyyy` formatter matching the design's fmtDate(). */
export function formatCompactDate( value: string | Date | null | undefined, ): string | null {
  if ( !value ) {
    return null;
  }

  const date = value instanceof Date
    ? value
    : new Date( value );

  if ( Number.isNaN( date.getTime() ) ) {
    return null;
  }

  return new Intl.DateTimeFormat(
    'es-CO', {
      day  : '2-digit',
      month: 'short',
      year : 'numeric',
    } 
  )
    .format( date );
}

export function mapDbActuacionToCardProps( actuacion: DatabaseActuacionType, ): ActuacionCardProps {
  return {
    actuacion     : actuacion.actuacion,
    fechaActuacion: actuacion.fechaActuacion,
    anotacion     : actuacion.anotacion,
    fechaInicial  : actuacion.fechaInicial,
    fechaFinal    : actuacion.fechaFinal,
    fechaRegistro : actuacion.fechaRegistro,
    codRegla      : actuacion.codRegla,
    conDocumentos : actuacion.conDocumentos,
    cant          : actuacion.cant,
    llaveProceso  : actuacion.llaveProceso,
    consActuacion : actuacion.consActuacion,
    isUltimaAct   : actuacion.isUltimaAct,
    carpetaNumero : actuacion.carpetaNumero,
    idProceso     : actuacion.idProceso,
    createdAt     : actuacion.createdAt,
  };
}
