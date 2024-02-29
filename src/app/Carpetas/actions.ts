'use server';

import { prisma } from '#@/lib/connection/prisma';
import { IntCarpeta } from '#@/lib/types/carpetas';


export async function resetCarpetas () {


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
          orderBy: {
            fecha: {
              sort : 'desc',
              nulls: 'last'
            },
          }
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
            );
}

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
