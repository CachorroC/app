import { cache } from 'react';
import clientPromise from '../connection/mongodb';
import { IntCarpeta, carpetaConvert } from 'types/carpetas';

async function getCarpetas() {
  const client = await clientPromise;

  if ( !client ) {
    throw new Error(
      'no hay cliente mongólico'
    );
  }

  const db = client.db(
    'RyS'
  );

  const collection = db.collection<IntCarpeta>(
    'Pruebas'
  );

  const carpetasRaw = await collection
    .find(
      {}
    )
    .sort(
      {
        fecha: 1
      }
    )
    .allowDiskUse()
    .toArray();

  const carpetas = carpetaConvert.toMonCarpetas(
    carpetasRaw
  );

  return carpetas;
}

export default cache(
  getCarpetas
);
