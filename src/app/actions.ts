'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { addNota } from '#@/lib/project/notas';
import { NotaBuilder, intNota } from '#@/lib/types/notas';

export async function createNota (
  formData: FormData
) {
  try {
    const llaveProceso = formData.get(
      'llaveProceso'
    ) ?? '';

    const nota = formData.get(
      'nota'
    )?? '';

    const fecha = formData.get(
      'fecha'
    ) ?? '';

    const pathname= formData.get(
      'pathname'
    ) ?? '';

    const tareas = formData.get(
      'tareas'
    );

    const newNota = new NotaBuilder(
      {
        llaveProceso: llaveProceso.toString(),
        nota        : nota.toString(),
        fecha       : fecha.toString(),
        pathname    : pathname.toString(),
        tareas      : []
      }
    );

    const id = await addNota(
      newNota
    );
    revalidateTag(
      'posts'
    );

    return {
      message: id
    };
  } catch ( e ) {
    return {
      message: 'There was an error.'
    };
  }
}
