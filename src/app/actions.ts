'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { addNota } from '#@/lib/project/notas';
import { NotaBuilder, intNota } from '#@/lib/types/notas';
import prisma from '#@/lib/connection/connectDB';

export async function createNota (
  formData: FormData
) {
  try {
    const llaveProceso = formData.get(
      'llaveProceso'
    ) ;

    const text = formData.get(
      'text'
    ) ?? '';

    const date = formData.get(
      'date'
    ) ;

    const pathname= formData.get(
      'pathname'
    );

    const done = formData.get(
      'done'
    ) === 'true'
      ? true
      : false;

    const newNota = {
      llaveProceso: llaveProceso?.toString(),
      text        : text.toString(),
      date        : date?.toString(),
      pathname    : pathname?.toString(),
      done        : done
    };


    const nota = await prisma.nota.create(
      {
        data: newNota
      }
    );
    revalidateTag(
      'notas'
    );

    return JSON.stringify(
      nota 
    );

  } catch ( e ) {
    console.log(
      `there was an error: ${ JSON.stringify(
        e
      ) }`
    );

    return null;
  }
}

export async function deleteNota (
  id: number
) {
  try {
    prisma.nota.delete(
      {
        where: {
          id: id
        }
      }
    );
    revalidateTag(
      'notas'
    );
    redirect(
      '/Notas'
    );
  } catch ( error ) {
    console.log(
      `error, ${ JSON.stringify(
        error
      ) }`
    );
  }
}