import * as XLSX from 'xlsx';
import * as fs from 'fs';

export interface ParametrosCredito {
  nombreDeudor       : string;
  montoCreditoUVR    : number;
  tasaInteresEA      : number;
  plazoMeses         : number;
  fechaPrimeraCuota  : Date;
  valorUVRProyectado?: number; // Opcional, para la columna en COP
}

export function generarPlanAmortizacionUVR( params: ParametrosCredito ): void {
  const {
    nombreDeudor,
    montoCreditoUVR,
    tasaInteresEA,
    plazoMeses,
    fechaPrimeraCuota,
    valorUVRProyectado = 285.00 // Valor por defecto si no se provee
  } = params;

  // Construcción dinámica de la ruta de salida (reemplazando espacios por guiones bajos)
  const nombreArchivoLimpio = nombreDeudor.replace(
    /\s+/g, '_'
  );
  const rutaSalida = `Plan_Amortizacion_UVR_${ nombreArchivoLimpio }.xlsx`;

  // 1. Cálculo de Tasa Efectiva Mensual (i_m)
  const tasaEM = Math.pow(
    1 + tasaInteresEA, 1 / 12
  ) - 1;

  // 2. Cálculo de Cuota Constante en UVR
  const cuotaUVR = ( montoCreditoUVR * tasaEM ) / ( 1 - Math.pow(
    1 + tasaEM, -plazoMeses
  ) );

  // --- HOJA 1: PARÁMETROS ---
  const datosParametros = [
    [
      'Parámetro',
      'Valor',
      'Unidad'
    ],
    [
      'Nombre del deudor',
      nombreDeudor,
      'texto'
    ],
    [
      'Monto del crédito',
      montoCreditoUVR,
      'UVR'
    ],
    [
      'Tasa de interés remuneratorio (E.A.)',
      tasaInteresEA,
      'E.A.'
    ],
    [
      'Número de cuotas (Plazo)',
      plazoMeses,
      'meses'
    ],
    [
      'Fecha de pago primera cuota',
      fechaPrimeraCuota,
      'fecha'
    ],
    [
      'Tasa efectiva mensual (i_m)',
      tasaEM,
      'E.M.'
    ],
    [
      'Cuota constante (UVR)',
      cuotaUVR,
      'UVR'
    ],
    [
      'Valor UVR (COP/UVR) - Proyección',
      valorUVRProyectado,
      'COP'
    ]
  ];

  const wsParametros = XLSX.utils.aoa_to_sheet( datosParametros );

  // Formatear celdas de parámetros
  if ( wsParametros[ 'B3' ] ) {
    wsParametros[ 'B3' ].z = '#,##0.0000';
  }

  if ( wsParametros[ 'B4' ] ) {
    wsParametros[ 'B4' ].z = '0.0000%';
  }

  if ( wsParametros[ 'B6' ] ) {
    wsParametros[ 'B6' ].z = 'dd/mm/yyyy';
  }

  if ( wsParametros[ 'B7' ] ) {
    wsParametros[ 'B7' ].z = '0.0000%';
  }

  if ( wsParametros[ 'B8' ] ) {
    wsParametros[ 'B8' ].z = '#,##0.0000';
  }

  if ( wsParametros[ 'B9' ] ) {
    wsParametros[ 'B9' ].z = '#,##0.00';
  }

  // --- HOJA 2: AMORTIZACIÓN ---
  const datosAmortizacion = [];
  let saldoInicial = montoCreditoUVR;
  let acumuladoIntereses = 0;
  let acumuladoCapital = 0;

  for ( let cuotaActual = 1; cuotaActual <= plazoMeses; cuotaActual++ ) {
    // Calcular la fecha manteniendo el mismo día (26) para los meses subsiguientes
    const fechaPago = new Date( fechaPrimeraCuota );
    fechaPago.setMonth( fechaPago.getMonth() + ( cuotaActual - 1 ) );

    const interes = saldoInicial * tasaEM;

    // Ajuste estricto en la última cuota para que el saldo final sea exactamente 0.0000
    const abonoCapital = ( cuotaActual === plazoMeses )
      ? saldoInicial
      : ( cuotaUVR - interes );
    const cuotaTotal = abonoCapital + interes;
    const saldoFinal = saldoInicial - abonoCapital;
    const cuotaCOP = cuotaTotal * valorUVRProyectado;

    datosAmortizacion.push( {
      'N° de cuota'                : cuotaActual,
      'Fecha de pago'              : fechaPago,
      'Saldo inicial (UVR)'        : saldoInicial,
      'Cuota total (UVR)'          : cuotaTotal,
      'Interés remuneratorio (UVR)': interes,
      'Abono a capital (UVR)'      : abonoCapital,
      'Saldo final (UVR)'          : Math.abs( saldoFinal ) < 1e-10
        ? 0
        : saldoFinal, // Limpieza de flotantes negativos -0
      'Valor UVR (COP/UVR)' : valorUVRProyectado,
      'Cuota Estimada (COP)': cuotaCOP
    } );

    acumuladoIntereses += interes;
    acumuladoCapital += abonoCapital;
    saldoInicial = saldoFinal;
  }

  // Fila de totales
  datosAmortizacion.push( {
    'N° de cuota'                : 'TOTALES',
    'Fecha de pago'              : '',
    'Saldo inicial (UVR)'        : '',
    'Cuota total (UVR)'          : acumuladoCapital + acumuladoIntereses,
    'Interés remuneratorio (UVR)': acumuladoIntereses,
    'Abono a capital (UVR)'      : acumuladoCapital,
    'Saldo final (UVR)'          : '',
    'Valor UVR (COP/UVR)'        : '',
    'Cuota Estimada (COP)'       : ''
  } );

  const wsAmortizacion = XLSX.utils.json_to_sheet( datosAmortizacion );

  // Aplicar formato de columnas a la hoja de amortización iterando sobre las celdas generadas
  const range = XLSX.utils.decode_range( wsAmortizacion[ '!ref' ] || 'A1:I1' );

  for ( let R = range.s.r; R <= range.e.r; ++R ) {
    for ( let C = range.s.c; C <= range.e.c; ++C ) {
      const cellAddress = {
        c: C,
        r: R
      };
      const cellRef = XLSX.utils.encode_cell( cellAddress );
      const cell = wsAmortizacion[ cellRef ];

      if ( !cell || R === 0 ) {
        continue;
      } // Saltar si la celda está vacía o es el header

      // Columna B: Fecha
      if ( C === 1 && typeof cell.v === 'number' ) {
        cell.z = 'dd/mm/yyyy';
      }

      // Columnas C a G: UVR (4 decimales)
      if ( C >= 2 && C <= 6 ) {
        cell.z = '#,##0.0000';
      }

      // Columna H: UVR a COP
      if ( C === 7 ) {
        cell.z = '#,##0.00';
      }

      // Columna I: Cuota COP
      if ( C === 8 ) {
        cell.z = '"$ "#,##0.00';
      }
    }
  }

  // Ajustar anchos de columnas
  wsAmortizacion[ '!cols' ] = [
    {
      wch: 12
    },
    {
      wch: 15
    },
    {
      wch: 20
    },
    {
      wch: 20
    },
    {
      wch: 25
    },
    {
      wch: 22
    },
    {
      wch: 20
    },
    {
      wch: 22
    },
    {
      wch: 22
    }
  ];
  wsParametros[ '!cols' ] = [
    {
      wch: 45
    },
    {
      wch: 25
    },
    {
      wch: 15
    }
  ];

  // Congelar paneles (Fila superior inmovilizada en amortización)
  wsAmortizacion[ '!freeze' ] = {
    xSplit     : 0,
    ySplit     : 1,
    topLeftCell: 'A2',
    activePane : 'bottomLeft',
    state      : 'frozen'
  };

  // --- ENSAMBLE DEL LIBRO ---
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    wb, wsParametros, 'Parámetros'
  );
  XLSX.utils.book_append_sheet(
    wb, wsAmortizacion, 'Amortización'
  );

  // --- ESCRITURA ---
  XLSX.writeFile(
    wb, rutaSalida
  );
  console.log( `✅ Plan de amortización generado exitosamente en: ${ rutaSalida }` );
}