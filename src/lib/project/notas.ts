import { cache } from 'react';
import { notasCollection } from '../connection/mongodb';
import { intNota, notaConvert } from 'types/notas';
import { ObjectId } from 'mongodb';

export async function getNotasByllaveProceso(
  {
    llaveProceso,
  }: {
  llaveProceso: string;
}
) {
  const collection = await notasCollection();

  const Notas = await collection
        .find(
          {
            llaveProceso: llaveProceso,
          }
        )
        .sort(
          {
            fecha: 1,
          }
        )
        .toArray();

  const convert = notaConvert.toMonNotas(
    Notas
  );

  return convert;
}

export const getNotaById = cache(
  async (
    {
      id
    }: {id: string }
  ) => {
    const collection = await notasCollection();

    const rawNotas = await collection.findOne(
      {
        _id: new ObjectId(
          id
        )
      }
    );

    if ( !rawNotas ) {
      return null;
    }

    const nota = notaConvert.toMonNota(
      rawNotas
    );



    return nota;
  }
);



export async function addNota (
  nota: intNota
) {
  const collection = await notasCollection();

  const insertOne = await collection.insertOne(
    nota
  );

  if ( !insertOne.acknowledged ) {
    throw new Error(
      'no pudimos agregar la nota a la base de datos, vuelve a intentarlo.'
    );
  }

  const id = insertOne.insertedId.toString();

  return id;
}