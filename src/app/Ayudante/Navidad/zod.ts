import * as z from 'zod';


export const ZodTaskElementSchema = z.object(
  {
    'text'     : z.coerce.string(),
    'done'     : z.coerce.boolean(),
    'updatedAt': z.union(
      [
        z.coerce.date(),
        z.null()
      ]
    )
          .optional(),
    'carpetaNumero': z.union(
      [
        z.coerce.number(),
        z.null()
      ]
    )
          .optional(),
    'id': z.union(
      [
        z.coerce.number(),
        z.null()
      ]
    )
          .optional(),
  }
);

export type ZodTaskElement = z.infer<typeof ZodTaskElementSchema>;
