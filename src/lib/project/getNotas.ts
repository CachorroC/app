import { cache } from 'react';
import clientPromise from '../connection/mongodb';
import { IntCarpeta, carpetaConvert } from 'types/carpetas';
import { intNota, notaConvert } from '../types/notas';

async function getNotas() {
  const client = await clientPromise;

  if ( !client ) {
    throw new Error(
      'no hay cliente mongólico'
    );
  }

  const db = client.db(
    'RyS'
  );

  const collection = db.collection<intNota>(
    'Notas'
  );

  const carpetasRaw = await collection.find(
    {}
  )
        .toArray();

  const carpetas = notaConvert.toMonNotas(
    carpetasRaw
  );

  return carpetas;
}

export default cache(
  getNotas
);
