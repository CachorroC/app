import { cache } from 'react';
import { prisma } from '#@/lib/connection/prisma';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { carpetasCollection } from '#@/lib/connection/collections';

export const getCarpetasByllaveProceso = cache(
  async (
    llaveProceso: string
  ) => {
            const prismaCarpetas = await prisma.carpeta.findMany(
              {
                where: {
                  llaveProceso: llaveProceso,
                },
                include: {
                  tareas         : true,
                  ultimaActuacion: true,
                  notas          : true,
                  procesos       : {
                    include: {
                      juzgado: true,
                    },
                  },
                },
              }
            );

            const collection = await carpetasCollection();

            const mongoCarpetas = await collection.find()
                  .toArray();

            const mergedArray = mongoCarpetas.map(
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
                          ...matchedObject,
                        };
              }
            );
            return mergedArray;
  }
);

export const getCarpetaByllaveProceso = cache(
  async (
    llaveProceso: string
  ) => {
            const prismaCarpeta = await prisma.carpeta.findFirst(
              {
                where: {
                  llaveProceso: llaveProceso,
                },
                include: {
                  ultimaActuacion: true,
                  deudor         : true,
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
                  notas   : true,
                  procesos: {
                    include: {
                      juzgado: true,
                    },
                  },
                },
              }
            );

            if ( prismaCarpeta ) {
              return {
                ...prismaCarpeta,
                demanda: {
                  ...prismaCarpeta.demanda,
                  capitalAdeudado:
          prismaCarpeta.demanda?.capitalAdeudado.toString() ?? null,
                },
              };
            }

            return null;
  }
);

export const getCarpetabyNumero = cache(
  async (
    numero: number
  ) => {
            const demanda = await prisma.demanda.findFirstOrThrow(
              {
                where: {
                  id: numero
                },
                include: {
                  notificacion: {
                    include: {
                      notifiers: true,
                    },
                  },
                  medidasCautelares: true,
                }
              }
            );

            const carpeta = await prisma.carpeta.findFirstOrThrow(
              {
                where: {
                  numero: numero,
                },
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

            const newCarp: IntCarpeta =  {
              ...carpeta,
              demanda: {
                ...demanda,
                capitalAdeudado: demanda.capitalAdeudado
                  ? demanda.capitalAdeudado.toNumber()
                  : null,
                liquidacion: demanda?.liquidacion
                  ? demanda.liquidacion.toNumber()
                  : null,
                avaluo: demanda?.avaluo
                  ? demanda.avaluo.toNumber()
                  : null,
                departamento: demanda?.departamento
                  ? demanda.departamento
                  : null
              }
            };
            return newCarp;
  }
);

export const getCarpetaByidProceso = cache(
  async (
    idProceso: number
  ) => {
            return await prisma.carpeta.findFirstOrThrow(
              {
                where: {
                  idProcesos: {
                    has: idProceso
                  }
                },
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
                  }
                }
              }
            );
  }
);
