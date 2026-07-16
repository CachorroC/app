/**
 * uvr-amortizacion.ts
 * ------------------------------------------------------------------
 * Genera un plan de amortización de crédito hipotecario denominado en UVR
 * (sistema francés: cuota constante en UVR) y lo exporta a un archivo .xlsx
 * con fórmulas vivas y refrendamientos (validaciones), usando SheetJS.
 *
 * Soporta:
 *   - Tasa única para todo el plazo.
 *   - Tasa escalonada (varios tramos), p. ej. 4,30 % subsidiado y luego 8,30 %,
 *     recalculando la cuota sobre el saldo restante en cada cambio de tasa.
 *
 * Los "campos amarillos" (editables) son exactamente los de `EntradaAmortizacion`.
 *
 * Nota sobre estilos: la edición comunitaria de `xlsx` NO aplica rellenos ni
 * fuentes (solo formatos numéricos vía `z`). Si necesitas el resaltado amarillo
 * y los colores, reemplaza el import por el fork `xlsx-js-style` (API idéntica);
 * este módulo ya adjunta objetos `s` que ese fork sí honra.
 * ------------------------------------------------------------------
 */

import * as XLSX from 'xlsx';

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
  saldo: number,
  im: number,
  nCuotas: number,
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
    destino.getFullYear(),
    destino.getMonth() + 1,
    0,
  )
    .getDate();
  destino.setDate( Math.min(
    dia, ultimoDia 
  ) );

  return destino;
}

/** Convierte una fecha JS al número de serie de Excel (base 1899-12-30). */
function fechaAExcelSerial( fecha: Date ): number {
  const utc = Date.UTC(
    fecha.getFullYear(), fecha.getMonth(), fecha.getDate() 
  );
  const base = Date.UTC(
    1899, 11, 30 
  );

  return Math.round( ( utc - base ) / 86_400_000 );
}

// ===================================================================
// Cálculo del plan (fuente de verdad, independiente de Excel)
// ===================================================================

/** Normaliza las entradas en una lista de tramos ordenada por `desdeCuota`. */
function construirTramosBase( entrada: EntradaAmortizacion, ): Array<{ desdeCuota: number; tasaEA: number; im: number }> {
  const crudos: CambioTasa[] = [
    {
      desdeCuota: 1,
      tasaEA    : entrada.tasaEA,
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
        im: tasaMensualEquivalente( tasaEA ),
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
export function calcularPlanAmortizacion( entrada: EntradaAmortizacion, ): PlanAmortizacion {
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
    return base[
      [
        ...base
      ].reverse()
        .findIndex( ( s ) => {
          return s.desdeCuota <= t;
        } ) === -1
        ? 0
        : base.length
          - 1
          - [
            ...base
          ].reverse()
            .findIndex( ( s ) => {
              return s.desdeCuota <= t;
            } )
    ];
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
        cuota     : cuotaActual,
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
    totalCapital,
  };
}

// ===================================================================
// Construcción del libro XLSX (con fórmulas vivas)
// ===================================================================

const FMT_UVR = '[$-240A]#,##0.0000';
const FMT_UVR0 = '[$-240A]#,##0.0000;[$-240A]-#,##0.0000;"-"';
const FMT_PCT = '[$-240A]0.0000%';
const FMT_FECHA = '[$-240A]dd/mm/yyyy';
const FMT_ENT = '[$-240A]#,##0';

// Estilos (ignorados por `xlsx` comunitario; honrados por `xlsx-js-style`).
const S_TITULO = {
  font: {
    bold : true,
    sz   : 13,
    color: {
      rgb: '1F3864',
    },
    name: 'Arial',
  },
};
const S_HDR = {
  font: {
    bold : true,
    color: {
      rgb: 'FFFFFF',
    },
    name: 'Arial',
  },
  fill: {
    fgColor: {
      rgb: '1F3864',
    },
  },
  alignment: {
    horizontal: 'center',
    vertical  : 'center',
    wrapText  : true,
  },
};
const S_INPUT = {
  font: {
    color: {
      rgb: '0000FF',
    },
    name: 'Arial',
  },
  fill: {
    fgColor: {
      rgb: 'FFF2CC',
    },
  },
};
const S_CALC = {
  font: {
    name: 'Arial',
  },
};
const S_BOLD = {
  font: {
    bold: true,
    name: 'Arial',
  },
};
const S_TOT = {
  font: {
    bold: true,
    name: 'Arial',
  },
  fill: {
    fgColor: {
      rgb: 'E2EFDA',
    },
  },
};

type Celda = XLSX.CellObject & { z?: string; s?: unknown };

function fijar(
  ws: XLSX.WorkSheet,
  fila: number,
  col: number,
  celda: Celda,
): void {
  ws[
    XLSX.utils.encode_cell( {
      r: fila,
      c: col,
    } )
  ] = celda;
}

function num(
  v: number, z: string, s?: unknown 
): Celda {
  return {
    t: 'n',
    v,
    z,
    s,
  };
}

function txt(
  v: string, s?: unknown 
): Celda {
  return {
    t: 's',
    v,
    s,
  };
}

function formulaNum(
  f: string, cache: number, z: string, s?: unknown 
): Celda {
  return {
    t: 'n',
    f,
    v: cache,
    z,
    s,
  };
}

function formulaFecha(
  f: string, cacheSerial: number, s?: unknown 
): Celda {
  return {
    t: 'n',
    f,
    v: cacheSerial,
    z: FMT_FECHA,
    s,
  };
}

function formulaTxt(
  f: string, cache: string, s?: unknown 
): Celda {
  return {
    t: 's',
    f,
    v: cache,
    s,
  };
}

/** Construye el `WorkBook` con hojas "Parámetros" y "Amortización". */
export function construirLibroAmortizacion( entrada: EntradaAmortizacion, ): XLSX.WorkBook {
  const plan = calcularPlanAmortizacion( entrada );
  const HP = 'Parámetros';
  const HA = 'Amortización';

  // ---------- Hoja Parámetros ----------
  const wp: XLSX.WorkSheet = {};
  fijar(
    wp, 0, 0, txt(
      'Crédito hipotecario en UVR — Parámetros', S_TITULO 
    ) 
  );

  // Campos amarillos (editables)
  fijar(
    wp, 2, 0, txt(
      'Monto del crédito (UVR)', S_BOLD 
    ) 
  );
  fijar(
    wp, 2, 1, num(
      entrada.montoUVR, FMT_UVR, S_INPUT 
    ) 
  );
  fijar(
    wp, 3, 0, txt(
      'Tasa base E.A.', S_BOLD 
    ) 
  );
  fijar(
    wp, 3, 1, num(
      entrada.tasaEA, FMT_PCT, S_INPUT 
    ) 
  );
  fijar(
    wp, 4, 0, txt(
      'Número de cuotas', S_BOLD 
    ) 
  );
  fijar(
    wp, 4, 1, num(
      entrada.numeroCuotas, FMT_ENT, S_INPUT 
    ) 
  );
  fijar(
    wp, 5, 0, txt(
      'Fecha primera cuota', S_BOLD 
    ) 
  );
  fijar(
    wp, 5, 1, {
      t: 'n',
      v: fechaAExcelSerial( entrada.fechaPrimeraCuota ),
      z: FMT_FECHA,
      s: S_INPUT,
    } 
  );
  fijar(
    wp, 6, 0, txt(
      'Cuota esperada (UVR) — validación', S_BOLD 
    ) 
  );
  fijar(
    wp,
    6,
    1,
    entrada.cuotaEsperadaUVR != null
      ? num(
          entrada.cuotaEsperadaUVR, FMT_UVR, S_INPUT 
        )
      : txt(
          '—', S_INPUT 
        ),
  );

  // Tabla de tramos de tasa (una fila por tramo). Cabecera en la fila 9 (índice 8).
  const filaHdrTramos = 8;
  fijar(
    wp, filaHdrTramos - 1, 0, txt(
      'Tramos de tasa', S_BOLD 
    ) 
  );
  [
    'Desde cuota',
    'Tasa E.A.',
    'i_m mensual',
    'Cuota del tramo (UVR)'
  ].forEach( (
    h, i 
  ) => {
    return fijar(
      wp, filaHdrTramos, i, txt(
        h, S_HDR 
      ) 
    );
  }, );
  const filaTramo0 = filaHdrTramos + 1; // primera fila de datos de tramos
  const nTramos = plan.tramos.length;
  const filaCabeceraAmort = 3; // (fila 4 en Excel) cabecera de la tabla de amortización
  const filaDato0Amort = filaCabeceraAmort + 1; // primera fila de datos

  plan.tramos.forEach( (
    tr, i 
  ) => {
    const r = filaTramo0 + i;
    const rx = r + 1; // fila Excel (1-based)
    // Fila (en Amortización) donde empieza este tramo -> su saldo inicial (col C)
    const filaInicioAmortExcel = filaDato0Amort + ( tr.desdeCuota - 1 ) + 1;
    const saldoInicioRef = `'${ HA }'!$C$${ filaInicioAmortExcel }`;
    fijar(
      wp, r, 0, num(
        tr.desdeCuota, FMT_ENT, S_CALC 
      ) 
    );
    fijar(
      wp, r, 1, num(
        tr.tasaEA, FMT_PCT, S_CALC 
      ) 
    );
    // i_m = (1 + tasa)^(1/12) − 1
    fijar(
      wp, r, 2, formulaNum(
        `(1+B${ rx })^(1/12)-1`, tr.im, FMT_PCT, S_CALC 
      ) 
    );
    // Cuota del tramo = saldoInicio · i_m / (1 − (1 + i_m)^(−(n − desde + 1)))
    const cuotaF = `${ saldoInicioRef }*C${ rx }/(1-(1+C${ rx })^(-($B$5-A${ rx }+1)))`;
    fijar(
      wp, r, 3, formulaNum(
        cuotaF, tr.cuota, FMT_UVR, S_BOLD 
      ) 
    );
  } );
  const filaTramoN = filaTramo0 + nTramos - 1; // última fila de tramos (0-based)
  const rangoDesde = `$A$${ filaTramo0 + 1 }:$A$${ filaTramoN + 1 }`;
  const rangoIm = `$C$${ filaTramo0 + 1 }:$C$${ filaTramoN + 1 }`;
  const rangoCuota = `$D$${ filaTramo0 + 1 }:$D$${ filaTramoN + 1 }`;

  // Refrendamientos en Parámetros
  const filaRef = filaTramoN + 3;
  fijar(
    wp, filaRef - 1, 0, txt(
      'Refrendamientos', S_BOLD 
    ) 
  );
  const cuotaTramo1Excel = filaTramo0 + 1; // fila Excel de la cuota del primer tramo (col D)
  fijar(
    wp, filaRef, 0, txt(
      'Diferencia cuota 1er tramo vs esperada', S_CALC 
    ) 
  );
  const difF = `IF(ISNUMBER($B$7),D${ cuotaTramo1Excel }-$B$7,"(sin referencia)")`;
  fijar(
    wp,
    filaRef,
    1,
    plan.tramos.length && entrada.cuotaEsperadaUVR != null
      ? formulaNum(
          difF,
          plan.tramos[ 0 ].cuota - entrada.cuotaEsperadaUVR,
          FMT_UVR,
          S_BOLD,
        )
      : formulaTxt(
          difF, '(sin referencia)', S_BOLD 
        ),
  );
  fijar(
    wp, filaRef + 1, 0, txt(
      '¿Cuota coincide (± 0,0001)?', S_CALC 
    ) 
  );
  const okF = `IF(NOT(ISNUMBER($B$7)),"(sin ref.)",IF(ABS(D${ cuotaTramo1Excel }-$B$7)<=0.0001,"OK","REVISAR"))`;
  const okCache
    = entrada.cuotaEsperadaUVR != null
      ? Math.abs( plan.tramos[ 0 ].cuota - entrada.cuotaEsperadaUVR ) <= 0.0001
        ? 'OK'
        : 'REVISAR'
      : '(sin ref.)';
  fijar(
    wp, filaRef + 1, 1, formulaTxt(
      okF, okCache, S_BOLD 
    ) 
  );

  wp[ '!ref' ] = XLSX.utils.encode_range( {
    s: {
      r: 0,
      c: 0,
    },
    e: {
      r: filaRef + 2,
      c: 3,
    },
  } );
  wp[ '!cols' ] = [
    {
      wch: 38,
    },
    {
      wch: 20,
    },
    {
      wch: 16,
    },
    {
      wch: 22,
    },
  ];

  // ---------- Hoja Amortización ----------
  const wa: XLSX.WorkSheet = {};
  fijar(
    wa,
    0,
    0,
    txt(
      'Plan de amortización — cuota constante en UVR (sistema francés)',
      S_TITULO,
    ),
  );
  const cabeceras = [
    'N° cuota',
    'Fecha de pago',
    'Saldo inicial (UVR)',
    'Cuota total (UVR)',
    'Interés remuneratorio (UVR)',
    'Abono a capital (UVR)',
    'Saldo final (UVR)',
  ];
  cabeceras.forEach( (
    h, c 
  ) => {
    return fijar(
      wa, filaCabeceraAmort, c, txt(
        h, S_HDR 
      ) 
    );
  } );

  const n = plan.filas.length;
  plan.filas.forEach( (
    f, i 
  ) => {
    const r = filaDato0Amort + i; // 0-based
    const rx = r + 1; // 1-based (Excel)
    const esUltima = f.numero === n;
    // N°
    fijar(
      wa, r, 0, num(
        f.numero, FMT_ENT, S_CALC 
      ) 
    );
    // Fecha: EDATE(primera, N-1)
    fijar(
      wa,
      r,
      1,
      formulaFecha(
        `EDATE('${ HP }'!$B$6,A${ rx }-1)`,
        fechaAExcelSerial( f.fecha ),
        S_CALC,
      ),
    );
    // Saldo inicial
    fijar(
      wa,
      r,
      2,
      i === 0
        ? formulaNum(
            `'${ HP }'!$B$3`, f.saldoInicial, FMT_UVR, S_CALC 
          )
        : formulaNum(
            `G${ rx - 1 }`, f.saldoInicial, FMT_UVR, S_CALC 
          ),
    );
    // Interés = saldo · i_m(tramo aplicable)   [LOOKUP en tabla de tramos]
    const imLookup = `LOOKUP(A${ rx },'${ HP }'!${ rangoDesde },'${ HP }'!${ rangoIm })`;
    fijar(
      wa,
      r,
      4,
      formulaNum(
        `C${ rx }*${ imLookup }`, f.interes, FMT_UVR, S_CALC 
      ),
    );

    // Cuota y abono
    if ( esUltima ) {
      fijar(
        wa, r, 5, formulaNum(
          `C${ rx }`, f.abonoCapital, FMT_UVR, S_CALC 
        ) 
      ); // abono = saldo
      fijar(
        wa, r, 3, formulaNum(
          `E${ rx }+F${ rx }`, f.cuota, FMT_UVR, S_CALC 
        ) 
      ); // cuota = interés + abono
    } else {
      const cuotaLookup = `LOOKUP(A${ rx },'${ HP }'!${ rangoDesde },'${ HP }'!${ rangoCuota })`;
      fijar(
        wa, r, 3, formulaNum(
          cuotaLookup, f.cuota, FMT_UVR, S_CALC 
        ) 
      );
      fijar(
        wa,
        r,
        5,
        formulaNum(
          `D${ rx }-E${ rx }`, f.abonoCapital, FMT_UVR, S_CALC 
        ),
      );
    }

    // Saldo final
    fijar(
      wa,
      r,
      6,
      formulaNum(
        `C${ rx }-F${ rx }`, f.saldoFinal, FMT_UVR0, S_CALC 
      ),
    );
  } );

  const filaUlt = filaDato0Amort + n - 1;
  const rxIni = filaDato0Amort + 1;
  const rxFin = filaUlt + 1;
  // Totales
  const filaTot = filaUlt + 2;
  const totales: Array<[string, string, number]> = [
    [
      'Total pagado (UVR)',
      `SUM(D${ rxIni }:D${ rxFin })`,
      plan.totalPagado
    ],
    [
      'Total intereses (UVR)',
      `SUM(E${ rxIni }:E${ rxFin })`,
      plan.totalIntereses
    ],
    [
      'Total capital amortizado (UVR)',
      `SUM(F${ rxIni }:F${ rxFin })`,
      plan.totalCapital,
    ],
  ];
  totales.forEach( (
    [
      lab,
      f,
      cache
    ], i 
  ) => {
    fijar(
      wa, filaTot + i, 1, txt(
        lab, S_TOT 
      ) 
    );
    fijar(
      wa, filaTot + i, 3, formulaNum(
        f, cache, FMT_UVR, S_TOT 
      ) 
    );
  } );
  // Refrendamientos
  const filaChk = filaTot + 4;
  fijar(
    wa,
    filaChk - 1,
    1,
    txt(
      'Refrendamientos (criterios de aceptación)', S_BOLD 
    ),
  );
  const {
    saldoFinal 
  } = plan.filas[ n - 1 ];
  fijar(
    wa, filaChk, 1, txt(
      'Saldo final última cuota = 0', S_CALC 
    ) 
  );
  fijar(
    wa,
    filaChk,
    3,
    formulaTxt(
      `IF(ABS(G${ rxFin })<=0.0001,"OK","REVISAR")`,
      Math.abs( saldoFinal ) <= 0.0001
        ? 'OK'
        : 'REVISAR',
      S_BOLD,
    ),
  );
  fijar(
    wa, filaChk + 1, 1, txt(
      'Capital amortizado = monto', S_CALC 
    ) 
  );
  fijar(
    wa,
    filaChk + 1,
    3,
    formulaTxt(
      `IF(ABS(D${ filaTot + 3 }-'${ HP }'!$B$3)<=0.0001,"OK","REVISAR")`,
      Math.abs( plan.totalCapital - entrada.montoUVR ) <= 0.0001
        ? 'OK'
        : 'REVISAR',
      S_BOLD,
    ),
  );

  wa[ '!ref' ] = XLSX.utils.encode_range( {
    s: {
      r: 0,
      c: 0,
    },
    e: {
      r: filaChk + 2,
      c: 6,
    },
  } );
  wa[ '!cols' ] = [
    {
      wch: 10,
    },
    {
      wch: 15,
    },
    {
      wch: 20,
    },
    {
      wch: 20,
    },
    {
      wch: 22,
    },
    {
      wch: 20,
    },
    {
      wch: 20,
    },
  ];
  wa[ '!freeze' ] = {
    xSplit: 0,
    ySplit: filaDato0Amort,
  };

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    wb, wp, HP 
  );
  XLSX.utils.book_append_sheet(
    wb, wa, HA 
  );

  return wb;
}

// ===================================================================
// Salidas
// ===================================================================

/** Devuelve el .xlsx como Uint8Array (útil en API routes / server actions). */
export function generarXlsxUint8( entrada: EntradaAmortizacion ): Uint8Array {
  const wb = construirLibroAmortizacion( entrada );

  return XLSX.write(
    wb, {
      bookType: 'xlsx',
      type    : 'array',
    } 
  ) as Uint8Array;
}

/** Node: escribe el archivo en disco. */
export function generarXlsxArchivo(
  entrada: EntradaAmortizacion,
  ruta: string,
): void {
  XLSX.writeFile(
    construirLibroAmortizacion( entrada ), ruta 
  );
}

/** Navegador: dispara la descarga del archivo. */
export function descargarXlsxEnNavegador(
  entrada: EntradaAmortizacion,
  nombre = 'amortizacion-uvr.xlsx',
): void {
  XLSX.writeFile(
    construirLibroAmortizacion( entrada ), nombre 
  );
}
