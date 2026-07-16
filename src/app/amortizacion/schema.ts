import { z } from 'zod';

export const cambioTasaInputSchema = z.object( {
  desdeCuota: z.number()
    .int()
    .gt( 1 ),
  tasaEAPct: z.number()
    .min( 0 )
    .max( 100 ),
} );

export const amortizacionInputSchema = z
  .object( {
    montoUVR: z.number()
      .positive(),
    tasaEAPct: z.number()
      .min( 0 )
      .max( 100 ),
    numeroCuotas: z.number()
      .int()
      .min( 1 )
      .max( 600 ),
    fechaPrimeraCuota: z.iso.date(),
    cuotaEsperadaUVR : z.number()
      .positive()
      .optional(),
    cambiosTasa: z.array( cambioTasaInputSchema )
      .default( [] ),
  } )
  .superRefine( (
    data, ctx
  ) => {
    data.cambiosTasa.forEach( (
      c, i
    ) => {
      if ( c.desdeCuota > data.numeroCuotas ) {
        ctx.addIssue( {
          code: 'custom',
          path: [
            'cambiosTasa',
            i,
            'desdeCuota' 
          ],
          message: `Debe ser menor o igual al número de cuotas (${ data.numeroCuotas }).`,
        } );
      }
    } );
  } );

export type CambioTasaInput = z.infer<typeof cambioTasaInputSchema>;

export type AmortizacionInput = z.infer<typeof amortizacionInputSchema>;
