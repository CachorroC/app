import { cache } from 'react';
import prisma from '#@/lib/connection/connectDB';
import { Nota } from '@prisma/client';

async function getNotas() {
  const notas: Nota[] = await prisma.nota.findMany();

  return notas;
}

export default cache(
  getNotas 
);
