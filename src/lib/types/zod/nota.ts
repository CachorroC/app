import * as z from 'zod';

export const ZodNotaElementSchema = z.object(
  {
    cod          : z.coerce.number(),
    text         : z.coerce.string(),
    date         : z.coerce.date(),
    pathname     : z.coerce.string(),
    carpetaNumero: z.coerce.number()
      .optional(),
  }
);

export type ZodNotaElement = z.infer<typeof ZodNotaElementSchema>;
