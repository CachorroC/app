import { outActuacion } from '#@/lib/types/actuaciones';
import { prisma } from '#@/lib/connection/prisma';

export async function updateUltimaActuacionInPrisma(
  incomingActuacion: outActuacion,
) {
      try {
        const {
          fechaActuacion, idProceso, idRegActuacion
        } = incomingActuacion;

        const carpeta = await prisma.carpeta.findFirstOrThrow(
          {
            where: {
              idProcesos: {
                has: idProceso,
              },
            },
          }
        );

        const {
          fecha: savedDate, idRegUltimaAct, numero
        } = carpeta;

        const incomingDate = new Date(
          fechaActuacion
        );

        if (
          !savedDate
      || savedDate.toString() === 'Invalid Date'
      || savedDate < incomingDate
        ) {
          if ( idRegUltimaAct ) {
            await fixOldActuacion(
              idRegUltimaAct
            );
          }

          try {
            await prisma.carpeta.update(
              {
                where: {
                  numero: numero,
                },
                data: {
                  fecha          : incomingDate,
                  revisado       : false,
                  ultimaActuacion: {
                    connectOrCreate: {
                      where: {
                        idRegActuacion: idRegActuacion,
                      },
                      create: {
                        ...incomingActuacion,
                        fechaActuacion: new Date(
                          incomingActuacion.fechaActuacion
                        ),
                        fechaRegistro: new Date(
                          incomingActuacion.fechaRegistro
                        ),
                        fechaFinal: incomingActuacion.fechaFinal
                          ? new Date(
                            incomingActuacion.fechaFinal
                          )
                          : null,
                        fechaInicial: incomingActuacion.fechaInicial
                          ? new Date(
                            incomingActuacion.fechaInicial
                          )
                          : null,
                        isUltimaAct: incomingActuacion.cant === incomingActuacion.consActuacion
                          ? true
                          : false

                      },
                    },
                  },
                },
              }
            );
          } catch ( error ) {
            console.log(
              error
            );
          }
        }
      } catch ( error ) {
        console.log(
          error
        );
      }
}

export async function fixOldActuacion(
  idRegUltimaAct: number
) {
      try {
        await prisma.actuacion.update(
          {
            where: {
              idRegActuacion: idRegUltimaAct,
            },
            data: {
              isUltimaAct: false,
            },
          }
        );
      } catch ( error ) {
        console.log(
          error
        );
      }
}
