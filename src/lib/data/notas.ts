import  prisma  from '../connection/prisma';

export async function notasCount() {
  const notasCount = await prisma.nota.count();

  const nextCount = notasCount + 1;

  return nextCount;
}
