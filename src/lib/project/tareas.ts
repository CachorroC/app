import { cache } from 'react';
import { tareasCollection } from '../connection/mongodb';

export const getTareas = cache(
  async () => {
    const collection = await tareasCollection();

    const tareas = await collection.find()
      .toArray();

    return tareas;
  }
);
