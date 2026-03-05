'use server';

import { revalidateTag } from 'next/cache';
import { ZodNotaElementSchema } from '#@/lib/types/zod/nota';
import prisma from '#@/lib/connection/prisma';

export async function create( formData: FormData ) {
  try {
    const parsed = ZodNotaElementSchema.safeParse({
      id: formData.get('id'),
      title: formData.get('title'),
      content: formData.get('content'),
      dueDate: formData.get('dueDate'),
      pathname: formData.get('pathname'),
      carpetaId: formData.get('carpetaId'),
      carpetaNumero: formData.get('carpetaNumero'),
    });

    console.log(`createNota parsed schema: ${parsed}`);

    if (!parsed.success) {
      throw new Error(
        'No pudimos validar la nota que ingresaste. Por favor intenta nuevamente.',
      );
    }

    const { data } = parsed;

    // Convert carpetaNumero to Int if present
    const carpetaNumero = data.carpetaNumero
      ? parseInt(String(data.carpetaNumero), 10)
      : null;

    const nota = await prisma.nota.upsert({
      where: {
        id: data.id,
      },
      update: {
        text: data.text || '',
        content: data.content || [],
        dueDate: data.dueDate || null,
        pathname: data.pathname || null,
        carpetaNumero,
      },
      create: {
        id: data.id,
        text: data.text || '',
        content: data.content || [],
        dueDate: data.dueDate || null,
        pathname: data.pathname || null,
        carpetaNumero,
      },
    });

    if (!nota) {
      throw new Error('No pudimos actualizar o guardar la nota');
    }

    revalidateTag('notas', 'max');

    return { success: true };
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
}
