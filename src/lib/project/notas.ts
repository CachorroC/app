import { cache } from 'react';
import { notasCollection } from '../connection/mongodb';
import { notasConvert } from '../types/notas';
import { prisma } from '#@/lib/connection/prisma';


export const getNotaById = cache(
  async (
    {
      id
    }: { id: number}
  ) => {

    const nota = await prisma.nota.findFirst(
      {
        where: {
          id: Number(
            id
          ),
        }
      }
    );

    return nota;
  }
);

export const getNotasByPathname = cache(
  async (
    {
      path
    }:{ path : string}
  ) => {
    const collection = await notasCollection();

    const rawNotas = await collection.find(
      {
        pathname: path,
      }
    )
      .sort(
        {
          cod: 1
        }
      )
      .toArray();

    const notas = notasConvert.toMonNotas(
      rawNotas
    );

    return notas;
  }
);
