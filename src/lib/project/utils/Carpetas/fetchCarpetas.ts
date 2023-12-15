import { carpetasCollection } from '#@/lib/connection/collections';
import { prisma } from '#@/lib/connection/prisma';
import { MonCarpeta } from '#@/lib/types/carpetas';

export async function fetchCarpetas () {
      const collection = await carpetasCollection();

      const prismaCarpetas = await prisma.carpeta.findMany(
        {
          include: {
            ultimaActuacion: true,
            notas          : true,
            procesos       : {
              include: {
                juzgado: true
              }
            },
            tareas: {
              include: {
                subTareas: true
              }
            }
          }
        }
      );

      const mongoCarpetas = await collection.find()
            .toArray();

      const mergedArray:MonCarpeta[] = mongoCarpetas.map(
        (
          item
        ) => {
                  const matchedObject = prismaCarpetas.find(
                    (
                      obj
                    ) => {
                              return obj.numero === item.numero;
                    }
                  );
                  return {
                    ...item,
                    ...matchedObject
                  };
        }
      );
      return mergedArray ;

}