import { cache } from 'react';
import { fetchCarpetaByllaveProceso,
  fetchCarpetasByllaveProceso,
  fetcherCarpetaByidProceso, } from './fetcher';
import { prisma } from '#@/lib/connection/prisma';

export const getCarpetasByllaveProceso = cache(
  async (
    llaveProceso: string
  ) => {
            return await fetchCarpetasByllaveProceso(
              llaveProceso
            );
  }
);

export const getCarpetaByllaveProceso = cache(
  async (
    llaveProceso: string
  ) => {
            return await fetchCarpetaByllaveProceso(
              llaveProceso
            );
  }
);

export async function getCarpetabyNumero(
  numero: number
) {
      const carpeta = await prisma.carpeta.findUniqueOrThrow(
        {
          where: {
            numero: numero
          },
          include: {
            ultimaActuacion: true,
            deudor         : true,
            codeudor       : true,
            Task           : true,
            notas          : true,
            demanda        : {
              include: {
                medidasCautelares: true,
                notificacion     : {
                  include: {
                    notifiers: true
                  }
                }
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
      return carpeta;
}

export const getCarpetaByidProceso = cache(
  async (
    idProceso: number
  ) => {
            return fetcherCarpetaByidProceso(
              idProceso
            );
  }
);
