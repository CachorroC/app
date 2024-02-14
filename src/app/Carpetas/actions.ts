'use server';

import { prisma } from '#@/lib/connection/prisma';

export async function updateRevisadoState(
  prevState: {
    revisado: boolean;
    numero: number;
  } 
) {
      try {
        const updater = await prisma.carpeta.update(
          {
            where: {
              numero: prevState.numero,
            },
            data: {
              revisado: prevState.revisado,
            },
          } 
        );
        return {
          revisado: updater.revisado,
          numero  : updater.numero,
        };
      } catch ( error ) {
        console.log(
          error 
        );
        return prevState;
      }
}
