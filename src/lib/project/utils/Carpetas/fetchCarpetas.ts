import { prisma } from '#@/lib/connection/prisma';

export async function fetchCarpetas () {
      const rawCarpetas =  await prisma.carpeta.findMany(
        {
          include: {
            ultimaActuacion: true,
            deudor         : true,
            codeudor       : true,
            notas          : true,
            demanda        : {
              include: {
                notificacion     : true,
                medidasCautelares: true
              }
            },
            procesos: {
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

      return rawCarpetas.map(
        (
          carpeta
        ) => {
                  const {
                    demanda
                  } = carpeta;
                  let newDemanda;

                  if ( demanda ) {
                    newDemanda = {
                      ...demanda,
                      capitalAdeudado: demanda.capitalAdeudado
                        ? demanda.capitalAdeudado.toString()
                        : null
                    };
                  } else {
                    newDemanda = null;
                  }

                  return {
                    ...carpeta,
                    demanda: newDemanda
                  };
        }
      );

}