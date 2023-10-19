import { cache } from 'react';
import { monNota } from '../types/notas';

async function getNotas () {
  try {

    const request = await fetch(
      '/api/Notas', {
        next: {
          tags: [
            'notas'
          ]
        }
      }
    );

    if ( !request.ok ) {
      throw new Error(
        'no pudimos acceder a las notas a través del api, vuelve a intentarlo'
      );

    }

    const notas = ( await request.json() ) as monNota[];


    return notas;
  } catch ( error ) {
    return [];
  }
}

export default cache(
  getNotas
);
