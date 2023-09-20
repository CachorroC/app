import { cache } from 'react';
import { notasCollection } from '../connection/mongodb';
import { intNota } from 'types/notas';
import prisma from '#@/lib/connection/connectDB';

export const getNotasByllaveProceso = cache(
            async (
                {
                                llaveProceso
                }: { llaveProceso: string }
            ) => {
                  const notas = await prisma.nota.findMany(
                              {
                                              where: {
                                                              llaveProceso: llaveProceso,
                                              },
                              }
                  );

                  return notas;
            },
);

export const getNotaById = cache(
            async (
                {
                                id
                }: { id: number }
            ) => {
                  const nota = await prisma.nota.findUnique(
                              {
                                              where: {
                                                              id: id,
                                              },
                              }
                  );

                  return nota;
            }
);

export async function addNota(
            nota: intNota
) {
  const collection = await notasCollection();

  const insertOne = await collection.insertOne(
              nota
  );

  if ( !insertOne.acknowledged ) {
    throw new Error(
                'no pudimos agregar la nota a la base de datos, vuelve a intentarlo.',
    );
  }

  const id = insertOne.insertedId.toString();

  return id;
}
