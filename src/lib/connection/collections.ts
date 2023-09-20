import { cache } from 'react';
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
