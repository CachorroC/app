import { cache } from 'react';
import {  notasConvert } from '../types/notas';
import { notasCollection } from '../connection/mongodb';

async function getNotas () {
  try {
    const collection = await notasCollection();

    const notasRaw = await collection.find()
      .toArray();

    const notas = notasConvert.toMonNotas(
      notasRaw
    );

    return notas;
  } catch ( error ) {
    return [];
  }
}

export default cache(
  getNotas
);
