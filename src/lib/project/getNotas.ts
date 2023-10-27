import { cache } from 'react';
import { prisma } from '#@/lib/connection/prisma';

export const dynamic = 'force-dynamic';

export const dynamicParams = true;

async function getNotas () {
  try {

    const prismaNotas = await prisma.nota.findMany();

    return prismaNotas;
  } catch ( error ) {
    return [];
  }
}

export default cache(
  getNotas
);
