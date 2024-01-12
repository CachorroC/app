import { carpetasCollection } from '#@/lib/connection/collections';
import clientPromise from '#@/lib/connection/mongodb';
import { prisma } from '#@/lib/connection/prisma';
import { IntCarpeta, carpetaConvert } from '#@/lib/types/carpetas';

export async function fetchCarpetaByNumero(
  numero: number
) {
      const carpeta = await prisma.carpeta.findFirst(
        {
          where: {
            numero: numero,
          },
          include: {
            ultimaActuacion: true,
            notas          : true,
            deudor         : true,
            codeudor       : true,
            tareas         : true,
            demanda        : {
              include: {
                medidasCautelares: true,
                notificacion     : {
                  include: {
                    notifiers: true,
                  },
                },
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

      if ( carpeta ) {
        return {
          ...carpeta,
          demanda: {
            ...carpeta.demanda,
            medidasCautelares: carpeta.demanda?.medidasCautelares
              ? carpeta.demanda.medidasCautelares.toString()
              : null,
          },
        };
      }

      return null;
}

export async function fetcherCarpetaByidProceso(
  idProceso: number
) {
      const client = await clientPromise;

      if ( !client ) {
        throw new Error(
          'no hay cliente mongólico'
        );
      }

      const db = client.db(
        'RyS'
      );

      const collection = db.collection<IntCarpeta>(
        'Carpetas'
      );

      const carpeta = await collection.findOne(
        {
          idProcesos: idProceso,
        },
        {
          sort: {
            fecha: 1,
          },
        },
      );

      if ( !carpeta ) {
        return null;
      }

      const Carpeta = carpetaConvert.toMonCarpeta(
        carpeta
      );

      return Carpeta;
}

export async function fetchCarpetasByllaveProceso(
  llaveProceso: string
) {
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

export async function fetchCarpetaByllaveProceso(
  llaveProceso: string
) {
      const prismaCarpeta = await prisma.carpeta.findFirst(
        {
          where: {
            llaveProceso: llaveProceso,
          },
          include: {
            ultimaActuacion: true,
            tareas         : true,
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

      const Moncarpeta = await collection.findOne(
        {
          llaveProceso: llaveProceso,
        }
      );

      if ( Moncarpeta ) {
        return {
          ...Moncarpeta,
          ...prismaCarpeta,
        };
      }

      return null;
}
