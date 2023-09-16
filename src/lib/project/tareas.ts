import { cache } from 'react';
import prisma from '#@/lib/connection/connectDB';
import { Tarea } from '../types/tareas';
import { tareasCollection } from '../connection/mongodb';

export const getTareas = cache(
  async () => {
    const collection = await tareasCollection();

    const tareas = await collection.find()
          .toArray();

    return tareas;
  } 
);
