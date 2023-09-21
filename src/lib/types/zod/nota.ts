import { z } from 'zod';

export const TareaSchema = z.object(
  {
    tarea  : z.coerce.string(),
    isDone : z.coerce.boolean(),
    dueDate: z.coerce.string(),
  }
);

export type Tarea = z.infer<typeof TareaSchema>;

export const ZodNotaElementSchema = z.object(
  {
    'text'        : z.coerce.string(),
    'id'          : z.coerce.number(),
    'date'        : z.coerce.date(),
    'done'        : z.coerce.boolean(),
    'pathname'    : z.coerce.string(),
    'llaveProceso': z.union(
      [
                z.null(),
                z.coerce.string()
      ]
    ),
  }
);

export type ZodNotaElement = z.infer<typeof ZodNotaElementSchema>;
