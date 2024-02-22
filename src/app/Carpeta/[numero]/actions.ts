'use server';

import { prisma } from '#@/lib/connection/prisma';
import { intDemanda } from '#@/lib/types/carpetas';
import { Prisma } from '@prisma/client';


export async function editDemandaInPrisma (
  incomingDemanda: intDemanda
) {
      const {
        carpetaNumero,
        medidasCautelares, notificacion, ...restDemanda
      } = incomingDemanda;
      console.log(
        carpetaNumero
      );


      const {
        notifiers, ...restNotificacion
      } = notificacion ?? {
        notifiers     : [],
        autoNotificado: new Date(),
        certimail     : null,
        fisico        : null,
        id            : incomingDemanda.id
      };

      console.log(
        notifiers
      );

      try {
        const editor = await prisma.demanda.update(
          {
            where: {
              id: incomingDemanda.id
            },
            include: {
              notificacion: {
                include: {
                  notifiers: true
                }
              },
              medidasCautelares: true
            },
            data: {
              ...restDemanda,
              avaluo: incomingDemanda.avaluo
                ? new Prisma.Decimal(
                  incomingDemanda.avaluo
                )
                : undefined,
              liquidacion: incomingDemanda.liquidacion
                ? new Prisma.Decimal(
                  incomingDemanda.liquidacion
                )
                : undefined,
              capitalAdeudado: incomingDemanda.capitalAdeudado
                ? new Prisma.Decimal(
                  incomingDemanda.capitalAdeudado
                )
                : undefined,
              medidasCautelares: {
                upsert: {
                  where: {
                    id: restDemanda.id,
                  },
                  create: {
                    ...medidasCautelares,
                    id: incomingDemanda.id,
                  },
                  update: {
                    fechaOrdenaMedida: medidasCautelares?.fechaOrdenaMedida
                      ? new Date(
                        medidasCautelares.fechaOrdenaMedida
                      )
                      : null,
                    medidaSolicitada: medidasCautelares?.medidaSolicitada
                      ? String(
                        medidasCautelares.medidaSolicitada
                      )
                      : null
                  }
                }
              },
              notificacion: {
                upsert: {
                  where: {
                    id: incomingDemanda.id
                  },
                  update: {
                    ...restNotificacion
                  },
                  create: {
                    ...restNotificacion,
                  }
                }
              }
            }
          }
        );
        console.log(
          editor
        );
        return {
          success: true,
          data   : JSON.stringify(
            editor, null, 2
          )
        };
      } catch ( error ) {
        console.log(
          error
        );
        return {
          success: false,
          data   : JSON.stringify(
            error, null, 2
          )
        };
      }
}



export async function editllaveProceso (
  numero: number, newKey: string
) {
      await new Promise(
        (
          res
        ) => {
                  return setTimeout(
                    res, 10000
                  );
        }
      );

      try {
        const lookForData = await prisma.carpeta.update(
          {
            where: {
              numero: numero
            },
            data: {
              llaveProceso: newKey
            }
          }
        );
        return {
          success     : true,
          llaveProceso: lookForData.llaveProceso
        };
      } catch ( error ) {
        return {
          success     : false,
          llaveProceso: JSON.stringify(
            error
          )
        };
      }
}