import { prisma } from '#@/lib/connection/prisma';
import { PrismaCarpeta } from '#@/lib/types/prisma/carpetas';

export async function fetchCarpetas () {
      return await prisma.carpeta.findMany(
        {
          include: {
            deudor         : true,
            ultimaActuacion: true,
            codeudor       : true,
            juzgados       : true,
            notas          : true,
            notificacion   : {
              include: {
                notifiers: true
              }
            },
            demandas: {
              include: {
                juzgado          : true,
                medidasCautelares: true
              }
            },
            tareas: {
              include: {
                subTareas: true
              }
            }
          }
        }
      ) as PrismaCarpeta[];
}