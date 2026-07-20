const FORMATO_CO = new Intl.DateTimeFormat(
  'es-CO', {
    day     : '2-digit',
    month   : '2-digit',
    year    : 'numeric',
    timeZone: 'America/Bogota',
  } 
);

/**
 * Formatea una fecha como DD/MM/AAAA en la zona horaria de Bogotá.
 * Único punto de formateo de fechas de la app — no usar toLocaleDateString().
 */
export function formatoFechaCO( fecha: Date | string | null | undefined ): string | null {
  if ( !fecha ) {
    return null;
  }

  const valor = typeof fecha === 'string'
    ? new Date( fecha )
    : fecha;

  return FORMATO_CO.format( valor );
}

// Colombia usa UTC-5 todo el año (sin horario de verano), así que un
// desplazamiento fijo es correcto — no hace falta una base de datos de
// zonas horarias para calcular los límites de "hoy"/"esta semana".
const BOGOTA_OFFSET_HORAS = -5;

function aRelojBogota( fecha: Date ): Date {
  return new Date( fecha.getTime() + BOGOTA_OFFSET_HORAS * 60 * 60 * 1000 );
}

function relojBogotaAUtc( relojBogota: Date ): Date {
  return new Date( relojBogota.getTime() - BOGOTA_OFFSET_HORAS * 60 * 60 * 1000 );
}

export type LimitesBogota = {
  inicioHoy: Date;
  finHoy   : Date;
  finSemana: Date;
};

/**
 * Calcula, en hora de Bogotá, el inicio de hoy, el inicio de mañana
 * (fin de "hoy") y el fin de "esta semana" (domingo a medianoche).
 * Todos los Date devueltos son instantes UTC comparables directamente
 * contra `tareas.fechaLimite`.
 */
export function limitesBogota( ahora: Date = new Date() ): LimitesBogota {
  const reloj = aRelojBogota( ahora );
  const inicioHoyReloj = new Date( Date.UTC(
    reloj.getUTCFullYear(),
    reloj.getUTCMonth(),
    reloj.getUTCDate(),
  ) );
  const inicioHoy = relojBogotaAUtc( inicioHoyReloj );
  const finHoy = new Date( inicioHoy.getTime() + 24 * 60 * 60 * 1000 );

  const diaSemana = reloj.getUTCDay();
  const diasHastaFinSemana = ( 7 - diaSemana ) % 7;
  const finSemana = new Date( finHoy.getTime() + diasHastaFinSemana * 24 * 60 * 60 * 1000 );

  return {
    inicioHoy,
    finHoy,
    finSemana,
  };
}
