'use server';

import { revalidateTag } from 'next/cache';
import { ZodNotaElementSchema } from '#@/lib/types/zod/nota';
import { NotaEditorAction, IntNota } from '#@/lib/types/notas';
import prisma from '#@/lib/connection/prisma';

export async function createNota(formData: FormData) {
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

    const nota = await prisma.nota.upsert({
      where: {
        id: data.id,
      },
      update: {
        text: data.text,
        content: data.content,
        dueDate: new Date(data.dueDate),
        pathname: data.pathname,
        carpetaNumero: data.carpetaNumero ? Number(data.carpetaNumero) : null,
      },
      create: {
        id: data.id,
        text: data.text,
        content: data.content,
        dueDate: new Date(data.dueDate),
        pathname: data.pathname,
        carpetaNumero: data.carpetaNumero ? Number(data.carpetaNumero) : null,
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

export async function deleteNota({ id }: { id: string }) {
  try {
    const deleter = await prisma.nota.delete({
      where: {
        id: id,
      },
    });

    if (!deleter) {
      throw new Error('Fallo al eliminar la nota');
    }

    console.log(`deleteNota: se borró la nota con id ${id}`);

    return { acknowledged: true, deletedCount: 1 };
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
}

export async function editNota(
  initialFormState: NotaEditorAction,
  formData: FormData,
) {
  try {
    const parsed = ZodNotaElementSchema.safeParse({
      id: formData.get('id'),
      text: formData.get('text'),
      date: formData.get('date'),
      pathname: formData.get('pathname'),
      carpetaNumero: formData.get('carpetaNumero'),
    });

    const { success } = parsed;

    if (!success) {
      throw new Error(`Error al validar los datos de la nota: ${parsed.error}`);
    }

    const { data } = parsed;

    const nota = await prisma.nota.upsert({
      where: {
        id: data.id,
      },
      update: {
        text: data.text,
        dueDate: new Date(data.dueDate),
        pathname: data.pathname,
        carpetaNumero: data.carpetaNumero ? Number(data.carpetaNumero) : null,
      },
      create: {
        id: data.id,
        text: data.text,
        content: [],
        dueDate: new Date(data.dueDate),
        pathname: data.pathname,
        carpetaNumero: data.carpetaNumero ? Number(data.carpetaNumero) : null,
      },
    });

    if (!nota) {
      throw new Error('No se pudo actualizar la nota');
    }

    const notaActionReturn: NotaEditorAction = {
      message: `success: ${nota.id}`,
      data: nota as IntNota,
      error: false,
    };

    return notaActionReturn;
  } catch (errorSubmitNota) {
    console.error('Error editing note:', errorSubmitNota);

    if (errorSubmitNota instanceof Error) {
      return {
        message: errorSubmitNota.message,
        data: null,
        error: true,
      };
    }

    return {
      message: `Error: ${errorSubmitNota}`,
      data: null,
      error: true,
    };
  }
}
