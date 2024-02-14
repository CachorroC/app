import { prisma } from '#@/lib/connection/prisma';
import { IntCarpeta } from '#@/lib/types/carpetas';

export default async function getCarpetas() {
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
                    notifiers: true,
                  },
                },
                medidasCautelares: true,
              },
            },
            procesos: {
              include: {
                juzgado: true,
              },
            },
          },
        } 
      );
      return rawCarpetas
            .map(
              (
                carpeta 
              ) => {
                        return {
                          ...carpeta,
                          demanda: {
                            ...carpeta.demanda,
                            capitalAdeudado: carpeta.demanda?.capitalAdeudado.toNumber() ?? null,
                            avaluo         : carpeta.demanda?.avaluo.toNumber() ?? null,
                            liquidacion    : carpeta.demanda?.liquidacion.toNumber() ?? null,
                          },
                        } as IntCarpeta;
              } 
            )
            .sort(
              (
                a, b 
              ) => {
                        if (
                          !a.fecha
        || a.fecha === undefined
        || a.fecha.toString() === 'Invalid Date'
                        ) {
                          return 1;
                        }

                        if (
                          !b.fecha
        || b.fecha === undefined
        || b.fecha.toString() === 'Invalid Date'
                        ) {
                          return -1;
                        }

                        const x = a.fecha;

                        const y = b.fecha;

                        if ( x < y ) {
                          return 1;
                        }

                        if ( x > y ) {
                          return -1;
                        }

                        return 0;
              } 
            );
}
