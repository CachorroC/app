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

            const stringified =  JSON.stringify(
              carpeta
            );
            return JSON.parse(
              stringified
            ) as IntCarpeta;
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
