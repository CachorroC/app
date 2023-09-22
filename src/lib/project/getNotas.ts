import { cache } from 'react';
import { notasCollection } from '../connection/mongodb';
import { notasConvert } from '../types/notas';

async function getNotas () {
  const collection = await notasCollection();

  const rawNotas = await collection.find()
    .toArray();


  const notas = notasConvert.toMonNotas(
    rawNotas
  );

  return notas;
}

export default cache(
  getNotas
);
