import { z } from 'zod';

export const TareaSchema = z.object(
  {
    tarea  : z.coerce.string(),
    isDone : z.coerce.boolean(),
    dueDate: z.coerce.string(),
  } 
);

export type Tarea = z.infer<typeof TareaSchema>;

export const InputNotaElementSchema = z.object(
  {
    nota  : z.coerce.string(),
    tareas: z.array(
      TareaSchema 
    ),
    llaveProceso: z.coerce.string(),
    pathname    : z.coerce.string(),
    fecha       : z.coerce.string(),
  } 
);

export type InputNotaElement = z.infer<typeof InputNotaElementSchema>;
