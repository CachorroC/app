import { limitesBogota } from '#@/lib/compartido/fecha';

export const GRUPOS_VENCIMIENTO = [
  'VENCIDAS',
  'HOY',
  'ESTA_SEMANA',
  'MAS_ADELANTE',
  'SIN_FECHA' 
] as const;

export type GrupoVencimiento = ( typeof GRUPOS_VENCIMIENTO )[number];

export const GRUPO_LABEL: Record<GrupoVencimiento, string> = {
  VENCIDAS    : 'Vencidas',
  HOY         : 'Hoy',
  ESTA_SEMANA : 'Esta semana',
  MAS_ADELANTE: 'Más adelante',
  SIN_FECHA   : 'Sin fecha',
};

/**
 * Agrupa por fecha límite en hora de Bogotá — nunca con el reloj del
 * navegador. Independiente del estado de la tarea: una tarea con fecha
 * pasada cae en "Vencidas" aunque ya esté atendida.
 */
export function grupoDeVencimiento(
  fechaLimite: Date | null, ahora: Date = new Date() 
): GrupoVencimiento {
  if ( !fechaLimite ) {
    return 'SIN_FECHA';
  }

  const {
    inicioHoy, finHoy, finSemana 
  } = limitesBogota( ahora );

  if ( fechaLimite < inicioHoy ) {
    return 'VENCIDAS';
  }

  if ( fechaLimite < finHoy ) {
    return 'HOY';
  }

  if ( fechaLimite < finSemana ) {
    return 'ESTA_SEMANA';
  }

  return 'MAS_ADELANTE';
}
