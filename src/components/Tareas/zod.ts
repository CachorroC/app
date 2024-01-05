import * as z from 'zod';

export const ZodTaskElementSchema = z.object(
  {
    text: z.coerce.string(),
    done: z.optional(
      z.coerce.boolean() 
    ),
    content: z.array(
      z.coerce.string()
    ),
    dueDate: z.union(
      [ z.coerce.date(), z.null() ]
    ),
    createdAt: z.union(
      [ z.coerce.date(), z.null() ]
    )
          .optional(),
    updatedAt: z.union(
      [ z.coerce.date(), z.null() ]
    )
          .optional(),
    carpetaNumero: z.union(
      [ z.coerce.number(), z.null() ]
    ),
    id: z.union(
      [ z.coerce.number(), z.null() ]
    )
          .optional(),
  }
);

export type ZodTaskElement = z.infer<typeof ZodTaskElementSchema>;
