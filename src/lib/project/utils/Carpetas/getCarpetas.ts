import prisma from '#@/lib/connection/prisma';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { cacheLife } from 'next/cache';

export const getCarpetas = async () => {
  'use cache';
  cacheLife( 'hours' );
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
  } );

  return rawCarpetas.map( ( carpeta ) => {
    return {
      ...carpeta,
      demanda: {
        ...carpeta.demanda,
        avaluo: carpeta.demanda?.avaluo
          ? Number( carpeta.demanda.avaluo )
          : 0,
        capitalAdeudado: carpeta.demanda?.capitalAdeudado
          ? Number( carpeta.demanda.capitalAdeudado )
          : 0,
        liquidacion: carpeta.demanda?.liquidacion
          ? Number( carpeta.demanda.liquidacion )
          : 0,
      },
    } as IntCarpeta;
  } );
};
