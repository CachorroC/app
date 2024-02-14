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

      if ( !carpeta ) {
        return null;
      }

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
