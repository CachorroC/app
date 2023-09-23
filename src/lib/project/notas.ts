import { cache } from 'react';
import { notasCollection } from '../connection/mongodb';
import { ObjectId } from 'mongodb';
import { notasConvert } from '../types/notas';

export const getNotasByllaveProceso = cache(
  async (
    {
      llaveProceso
    }: { llaveProceso: string }
  ) => {
    const collection = await notasCollection();

    const rawNotas = await collection.find(
      {
        llaveProceso: llaveProceso
      }
    )
      .toArray();

    const notas = notasConvert.toMonNotas(
      rawNotas
    );

    return notas;
  },
);

export const getNotaById = cache(
  async (
    {
      id
    }: { id: string }
  ) => {
    if ( id === 'Nueva' ) {
      return null;
    }

    const collection = await notasCollection();

    const rawNota = await collection.findOne(
      {
        _id: new ObjectId(
          id
        )
      }
    );

    if ( rawNota === null ) {
      return rawNota;
    }

    const nota = notasConvert.toMonNota(
      rawNota
    );

    return nota;

  }
);
