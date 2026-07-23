'use server';

import { amortizacionInputSchema } from './schema';
import { toEntradaAmortizacion } from './to-entrada';
import { generarXlsxUint8 } from '#@/lib/amortizacion/uvr-amortizacion-xlsx';

export type GenerarAmortizacionResult =
  | { ok: true; filename: string; base64: string }
  | { ok: false; error: string };

export async function generarAmortizacionXlsx( raw: unknown ): Promise<GenerarAmortizacionResult> {
  const parsed = amortizacionInputSchema.safeParse( raw );

  if ( !parsed.success ) {
    return {
      ok   : false,
      error: 'Revise los datos ingresados.',
    };
  }

  const {
    numeroCuotas,
    fechaPrimeraCuota,
  } = parsed.data;
  const entrada = toEntradaAmortizacion( parsed.data );

  try {
    const bytes = generarXlsxUint8( entrada );
    const filename = `amortizacion-uvr-${ numeroCuotas }c-${ fechaPrimeraCuota }.xlsx`;

    return {
      ok    : true,
      filename,
      base64: Buffer.from( bytes )
        .toString( 'base64' ),
    };
  } catch ( e ) {
    return {
      ok   : false,
      error: e instanceof Error
        ? e.message
        : 'No se pudo generar el archivo Excel.',
    };
  }
}
