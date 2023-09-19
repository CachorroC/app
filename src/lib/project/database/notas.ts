import { cache } from 'react';
import prisma from '#@/lib/connection/connectDB';

export const createNota = cache(
  async (
    rawNota: {
    text: string;
    date: string | null;
    done: boolean | null;
    pathname: string | null;
    llaveProceso: string | null;
  } 
  ) => {
    const newNota = await prisma.nota.create(
      {
        data: rawNota,
      } 
    );

    return newNota;
  },
);
