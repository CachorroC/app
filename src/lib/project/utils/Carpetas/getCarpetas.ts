
import prisma from '#@/lib/connection/prisma';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { connection } from 'next/server';

export const getCarpetas = async () => {
  await connection();
  const rawCarpetas = await prisma.carpeta.findMany( {
    include: {
      ultimaActuacion: true,
      juzgado        : true,
      deudor         : true,
      codeudor       : true,
      notas          : true,
      demanda        : true,
      procesos       : {
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

// Build-time only: used by generateStaticParams, which runs outside any
// request scope and therefore cannot call connection().
export const getCarpetasNumeros = async () => {
  return prisma.carpeta.findMany( {
    select: {
      numero  : true,
      procesos: {
        select: {
          idProceso: true,
          esPrivado: true,
        },
      },
    },
  } );
};
