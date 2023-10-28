import { cache } from 'react';
import { prisma } from '#@/lib/connection/prisma';
import { Nota } from '@prisma/client';

export const getNotas = cache(
  async (
    carpetaId?: number
  ) => {
    try {
      let notas: Nota[];

      if ( carpetaId ) {
        notas = await prisma.nota.findMany(
          {
            where: {
              carpetaNumero: carpetaId,
            },
          }
        );
      } else {
        notas = await prisma.nota.findMany();
      }

      return notas;
    } catch ( error ) {
      console.log(
        JSON.stringify(
          error, null, 2
        )
      );
      return [];
    }
  }
);
