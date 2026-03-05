'use server';

import { ZodNotaElementSchema } from '#@/lib/types/zod/nota';
import { NotaEditorAction } from '#@/lib/types/notas';
import prisma from '#@/lib/connection/prisma';

export async function update(
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
        dueDate: data.dueDate || null,
        pathname: data.pathname || null,
        carpetaNumero,
      },
      create: {
        id: data.id,
        text: data.text || '',
        content: [],
        dueDate: data.dueDate || null,
        pathname: data.pathname || null,
        carpetaNumero,
      },
    });

    if (!nota) {
      throw new Error('No se pudo actualizar la nota');
    }

    const notaActionReturn: NotaEditorAction = {
      message: `success: ${nota.id}`,
      data: {
        ...nota,
        _id: nota.id,
      },
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
