
import { prisma } from '#@/lib/connection/prisma';

export async function fetchCarpetas () {

      const rawCarpetas = await prisma.carpeta.findMany(
        {
          include: {
            ultimaActuacion: true,
            deudor         : true,
            codeudor       : true,
            notas          : true,
            tareas         : true,
            demanda        : {
              include: {
                notificacion: {
                  include: {
                    notifiers: true
                  }
                },
                medidasCautelares: true
              }
            },
            procesos: {
              include: {
                juzgado: true
              }
            },
          }
        }
      );

      const returner = JSON.stringify(
        rawCarpetas
      );
      return returner;
}
