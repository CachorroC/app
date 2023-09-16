import { cache } from 'react';
import { IntCarpeta } from 'types/carpetas';
import { intNota } from 'types/notas';
import { intTarea } from 'types/tareas';
import clientPromise from './mongodb';

export const tareasCollection = cache(
  async () => {
    const client = await clientPromise;

    if ( !client ) {
      throw new Error(
        'no hay cliente mongólico' 
      );
    }

    const db = client.db(
      'RyS' 
    );

    const carpetas = db.collection<intTarea>(
      'Tareas' 
    );

    return carpetas;
  } 
);

export const carpetasCollection = cache(
  async () => {
    const client = await clientPromise;

    if ( !client ) {
      throw new Error(
        'no hay cliente mongólico' 
      );
    }

    const db = client.db(
      'RyS' 
    );

    const rawCarpetas = await db
          .collection<IntCarpeta>(
            'Carpetas' 
          )
          .find()
          .toArray();

    for ( const {
      _id,
      demanda,
      category,
      categoryTag,
      deudor,
      numero,
      llaveProceso,
      tipoProceso,
      nombre,
      idProceso,
      fecha,
      ultimaActuacion,
    } of rawCarpetas ) {
    }
  } 
);

export const notasCollection = async () => {
  const client = await clientPromise;

  if ( !client ) {
    throw new Error(
      'no hay cliente mongólico' 
    );
  }

  const db = client.db(
    'RyS' 
  );

  const notas = db.collection<intNota>(
    'Notas' 
  );

  return notas;
};
