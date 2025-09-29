import * as z from 'zod';

export const ZodNotaElementSchema = z.object(
  {
    id     : z.coerce.string(),
    text   : z.coerce.string(),
    content: z.coerce.string()
      .array(),
    dueDate : z.coerce.date(),
    pathname: z.union(
      [
        z.null(),
        z.coerce.string()
      ] 
    ),
    carpetaNumero: z.union(
      [
        z.coerce.number(),
        z.null()
      ] 
    ),
    carpetaId: z.union(
      [
        z.coerce.number(),
        z.null()
      ] 
    ),
  } 
);

export type ZodNotaElement = z.infer<typeof ZodNotaElementSchema>;
