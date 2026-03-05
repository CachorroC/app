'use server';

import prisma from '#@/lib/connection/prisma';

export async function remove( { id }: { id: string } ) {
  try {
    const nota = await prisma.nota.delete({
      where: {
        id,
      },
    });

    if (!nota) {
      throw new Error('Fallo al eliminar la nota');
    }

    console.log(`deleteNota: se borró la nota con id ${id}`);

    return { acknowledged: true, deletedCount: 1 };
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
}
