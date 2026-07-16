/**
 * uvr-amortizacion-core.ts
 * ------------------------------------------------------------------
 * Cálculo puro de un plan de amortización de crédito hipotecario denominado
 * en UVR (sistema francés: cuota constante en UVR). Sin dependencias de
 * Excel — seguro para importar desde componentes cliente.
 *
 * Soporta:
 *   - Tasa única para todo el plazo.
 *   - Tasa escalonada (varios tramos), p. ej. 4,30 % subsidiado y luego 8,30 %,
 *     recalculando la cuota sobre el saldo restante en cada cambio de tasa.
 *
 * Los "campos amarillos" (editables) son exactamente los de `EntradaAmortizacion`.
 * ------------------------------------------------------------------
 */

// ===================================================================
// Tipos
// ===================================================================

/** Un cambio de tasa: a partir de `desdeCuota` (1-based) aplica `tasaEA`. */
export interface CambioTasa {
  /** Número de cuota (1..n) desde la cual rige la nueva tasa. */
  desdeCuota: number;
  /** Tasa efectiva anual en fracción (0,083 = 8,30 %). */
  tasaEA    : number;
}

/** Campos amarillos / editables que recibe el módulo. */
export interface EntradaAmortizacion {
  /** Monto del crédito en UVR (S0). */
  montoUVR         : number;
  /** Tasa efectiva anual base, en fracción (0,083 = 8,30 %). */
  tasaEA           : number;
  /** Número de cuotas mensuales (p. ej. 360). */
  numeroCuotas     : number;
  /** Fecha de pago de la primera cuota. */
  fechaPrimeraCuota: Date;
  /** Opcional: cuota esperada en UVR, solo para refrendamiento. */
  cuotaEsperadaUVR?: number;
  /**
   * Opcional: cambios de tasa posteriores a la primera cuota.
   * No incluyas el tramo base (cuota 1): ese lo define `tasaEA`.
   * Ej. subsidio que expira: [{ desdeCuota: 38, tasaEA: 0.083 }].
   */
  cambiosTasa?     : CambioTasa[];
}

/** Una fila del plan de amortización. */
export interface FilaAmortizacion {
  numero      : number;
  fecha       : Date;
  tasaEA      : number;
  saldoInicial: number;
  cuota       : number;
  interes     : number;
  abonoCapital: number;
  saldoFinal  : number;
}

/** Un tramo homogéneo de tasa dentro del plan. */
export interface Tramo {
  desdeCuota: number;
  tasaEA    : number;
  /** Tasa efectiva mensual equivalente. */
  im        : number;
  /** Cuota constante (UVR) del tramo. */
  cuota     : number;
}

/** Resultado completo del cálculo. */
export interface PlanAmortizacion {
  filas         : FilaAmortizacion[];
  tramos        : Tramo[];
  totalPagado   : number;
  totalIntereses: number;
  totalCapital  : number;
}

// ===================================================================
// Utilidades numéricas y de fecha
// ===================================================================

/** Tasa efectiva mensual equivalente a partir de la E.A. */
export function tasaMensualEquivalente( tasaEA: number ): number {
  return Math.pow(
    1 + tasaEA, 1 / 12
  ) - 1;
}

/**
 * Cuota constante del sistema francés: C = S · i / (1 − (1 + i)^(−n)).
 * @param saldo saldo sobre el que se amortiza
 * @param im tasa efectiva mensual
 * @param nCuotas número de cuotas restantes
 */
export function cuotaFrancesa(
  saldo: number, im: number, nCuotas: number
): number {
  if ( im === 0 ) {
    return saldo / nCuotas;
  }

  return ( saldo * im ) / ( 1 - Math.pow(
    1 + im, -nCuotas
  ) );
}

/** Suma `meses` a una fecha conservando el día (equivalente a EDATE de Excel). */
export function agregarMeses(
  fecha: Date, meses: number
): Date {
  const anio = fecha.getFullYear();
  const mes = fecha.getMonth();
  const dia = fecha.getDate();
  const destino = new Date(
    anio, mes + meses, 1
  );
  const ultimoDia = new Date(
    destino.getFullYear(), destino.getMonth() + 1, 0
  )
    .getDate();
  destino.setDate( Math.min(
    dia, ultimoDia
  ) );

  return destino;
}

// ===================================================================
// Cálculo del plan (fuente de verdad, independiente de Excel)
// ===================================================================

/** Normaliza las entradas en una lista de tramos ordenada por `desdeCuota`. */
function construirTramosBase( entrada: EntradaAmortizacion ): Array<{ desdeCuota: number; tasaEA: number; im: number }> {
  const crudos: CambioTasa[] = [
    {
      desdeCuota: 1,
      tasaEA    : entrada.tasaEA
    },
    ...( entrada.cambiosTasa ?? [] ),
  ];
  const vistos = new Map<number, number>();

  for ( const t of crudos ) {
    vistos.set(
      t.desdeCuota, t.tasaEA
    );
  } // último gana si se repite

  return [
    ...vistos.entries()
  ]
    .map( ( [
      desdeCuota,
      tasaEA
    ] ) => {
      return {
        desdeCuota,
        tasaEA,
        im: tasaMensualEquivalente( tasaEA )
      };
    } )
    .sort( (
      a, b
    ) => {
      return a.desdeCuota - b.desdeCuota;
    } );
}

/**
 * Calcula el plan de amortización completo.
 * La última cuota se ajusta para que el saldo final quede exactamente en 0.
 */
export function calcularPlanAmortizacion( entrada: EntradaAmortizacion ): PlanAmortizacion {
  const {
    montoUVR, numeroCuotas: n, fechaPrimeraCuota
  } = entrada;

  if ( montoUVR <= 0 ) {
    throw new Error( 'El monto debe ser mayor que 0.' );
  }

  if ( !Number.isInteger( n ) || n <= 0 ) {
    throw new Error( 'El número de cuotas debe ser un entero positivo.' );
  }

  const base = construirTramosBase( entrada );

  const tramoDe = ( t: number ) => {
    return base[ [
      ...base
    ].reverse()
      .findIndex( ( s ) => {
        return s.desdeCuota <= t;
      } ) === -1
      ? 0
      : base.length - 1 - [
        ...base
      ].reverse()
        .findIndex( ( s ) => {
          return s.desdeCuota <= t;
        } ) ];
  };

  const filas: FilaAmortizacion[] = [];
  const tramos: Tramo[] = [];
  let saldo = montoUVR;
  let cuotaActual = 0;

  for ( let t = 1; t <= n; t++ ) {
    const seg = tramoDe( t );

    // ¿Empieza un tramo nuevo en esta cuota? Recalcular la cuota.
    if ( t === seg.desdeCuota ) {
      const restantes = n - t + 1;
      cuotaActual = cuotaFrancesa(
        saldo, seg.im, restantes
      );
      tramos.push( {
        desdeCuota: seg.desdeCuota,
        tasaEA    : seg.tasaEA,
        im        : seg.im,
        cuota     : cuotaActual
      } );
    }

    const saldoInicial = saldo;
    const interes = saldoInicial * seg.im;
    let cuota: number;
    let abonoCapital: number;

    if ( t === n ) {
      // Ajuste de la última cuota: cancela el saldo restante.
      abonoCapital = saldoInicial;
      cuota = interes + abonoCapital;
    } else {
      cuota = cuotaActual;
      abonoCapital = cuota - interes;
    }

    const saldoFinal = saldoInicial - abonoCapital;
    filas.push( {
      numero: t,
      fecha : agregarMeses(
        fechaPrimeraCuota, t - 1
      ),
      tasaEA: seg.tasaEA,
      saldoInicial,
      cuota,
      interes,
      abonoCapital,
      saldoFinal,
    } );
    saldo = saldoFinal;
  }

  const totalPagado = filas.reduce(
    (
      a, f
    ) => {
      return a + f.cuota;
    }, 0
  );
  const totalIntereses = filas.reduce(
    (
      a, f
    ) => {
      return a + f.interes;
    }, 0
  );
  const totalCapital = filas.reduce(
    (
      a, f
    ) => {
      return a + f.abonoCapital;
    }, 0
  );

  return {
    filas,
    tramos,
    totalPagado,
    totalIntereses,
    totalCapital
  };
}
