import clientPromise from '#@/lib/connection/mongodb';
import { prisma } from '#@/lib/connection/prisma';
import { IntCarpeta, carpetaConvert } from '#@/lib/types/carpetas';

export async function fetchCarpetaByNumero(
  numero: number
) {
      return prisma.carpeta.findFirst(
        {
          where: {
            numero: numero
          },
          include: {
            demanda        : true,
            deudor         : true,
            ultimaActuacion: true,
            procesos       : true,
            notas          : true,
            juzgados       : true,
            tareas         : {
              include: {
                subTareas: true
              }
            },
          }
        }
      );
}

export async function fetcherCarpetaByidProceso (
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
          idProceso: idProceso,
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


export async function fetchCarpetasByllaveProceso (
  llaveProceso: string
) {
      return prisma.carpeta.findMany(
        {
          where: {
            llaveProceso: llaveProceso
          },
          include: {
            demanda        : true,
            deudor         : true,
            ultimaActuacion: true,
            procesos       : true,
            notas          : true,
            juzgados       : true,
            tareas         : {
              include: {
                subTareas: true
              }
            },
          }
        }
      );
}

export async function fetchCarpetaByllaveProceso (
  llaveProceso: string
) {
      return prisma.carpeta.findFirst(
        {
          where: {
            llaveProceso: llaveProceso
          },
          include: {
            demanda        : true,
            deudor         : true,
            ultimaActuacion: true,
            procesos       : true,
            notas          : true,
            juzgados       : true,
            tareas         : {
              include: {
                subTareas: true
              }
            },
          }
        }
      );
}