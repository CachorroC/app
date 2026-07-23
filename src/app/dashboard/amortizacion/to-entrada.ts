import type { EntradaAmortizacion } from '#@/lib/amortizacion/uvr-amortizacion-core';
import type { AmortizacionInput } from './schema';

/**
 * Convierte la entrada validada del formulario (porcentajes, fecha ISO) a la
 * forma que espera el módulo de cálculo (fracción, `Date`). Compartido entre
 * la server action y el cálculo en vivo del cliente para no duplicar la
 * conversión — sin dependencia de `xlsx`, seguro para el bundle del cliente.
 */
export function toEntradaAmortizacion( data: AmortizacionInput ): EntradaAmortizacion {
  return {
    montoUVR         : data.montoUVR,
    tasaEA           : data.tasaEAPct / 100,
    numeroCuotas     : data.numeroCuotas,
    fechaPrimeraCuota: new Date( `${ data.fechaPrimeraCuota }T00:00:00` ),
    ...( data.cuotaEsperadaUVR != null
      ? {
          cuotaEsperadaUVR: data.cuotaEsperadaUVR,
        }
      : {} ),
    ...( data.cambiosTasa.length
      ? {
          cambiosTasa: data.cambiosTasa.map( ( c ) => {
            return {
              desdeCuota: c.desdeCuota,
              tasaEA    : c.tasaEAPct / 100,
            };
          } ),
        }
      : {} ),
  };
}
