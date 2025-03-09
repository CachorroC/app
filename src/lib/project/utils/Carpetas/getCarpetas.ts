import { prisma } from '#@/lib/connection/prisma';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { cache } from 'react';

export const getCarpetas = cache( async () => {
  const rawCarpetas = await prisma.carpeta.findMany( {
    include: {
      ultimaActuacion: true,
      juzgado        : true,
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
        nulls: 'last',
      },
    },
  } );

  return rawCarpetas.map( ( carpeta ) => {
    return {
      ...carpeta,
    } as unknown as IntCarpeta;
  } );
} );
