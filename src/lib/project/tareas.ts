import { cache } from 'react';
import { prisma } from '../connection/prisma';

export const getTareas = cache(
  async () => {
            const tareas = prisma.task.findMany(
              {
                include: {
                  carpeta: true,
                },
              } 
            );

            return tareas;
  } 
);
