'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { addNota } from '#@/lib/project/notas';
import { NotaBuilder, intNota } from '#@/lib/types/notas';
import prisma from '#@/lib/connection/connectDB';
import { Nota } from '@prisma/client';

export async function createNota(
            formData: FormData 
) {
  try {
    const formDataMap = new Map();

    for ( const [
            key,
            value
    ] of formData ) {
      formDataMap.set(
                  key, value 
      );
    }

    const obj = Object.fromEntries(
                formDataMap 
    );
    console.log(
                obj 
    );

    const nota = await prisma.nota.create(
                {
                                data: {
                                                ...obj,
                                },
                } 
    );
    revalidateTag(
                'notas' 
    );

    return {
                    message: `Success! id: ${ nota.id }`,
    };
  } catch ( e ) {
    console.log(
                `there was an error: ${ JSON.stringify(
                            e 
                ) }` 
    );

    return {
                    message: `There was an error. ${ JSON.stringify(
                                e 
                    ) }`,
    };
  }
}

export async function editNota(
            Nota: Nota 
) {
  try {
    const nota = await prisma.nota.update(
                {
                                where: {
                                                id: Nota.id,
                                },
                                data: Nota,
                } 
    );
    revalidateTag(
                'notas' 
    );

    return {
                    message: `Success! id: ${ nota.id }`,
    };
  } catch ( e ) {
    console.log(
                `there was an error: ${ JSON.stringify(
                            e 
                ) }` 
    );

    return {
                    message: `There was an error. ${ JSON.stringify(
                                e 
                    ) }`,
    };
  }
}

export async function deleteNota(
            id: number 
) {
  try {
    prisma.nota.delete(
                {
                                where: {
                                                id: id,
                                },
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
