'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import prisma from '#@/lib/connection/connectDB';
import { Nota } from '@prisma/client';
import { ZodNotaElementSchema } from '#@/lib/types/zod/nota';

export async function createNota(
  formData: FormData
) {
  try {
    const formDataMap = new Map();

    for ( const [
              key,
              value
    ] of formData ) {
      if ( key === 'date' ) {
        formDataMap.set(
          key, new Date(
            value.toString()
          )
        );

        continue;
      }

      if ( key === 'done' ) {
        const isOn = value === 'on'
          ? true
          : false;
        formDataMap.set(
          key, isOn
        );

        continue;
      }
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

    const newNota = {
      ...obj,
      done: obj.done ?? false
    };
    console.log(
      newNota
    );

    const nota = await prisma.nota.create(
      {
        data: {
          ...newNota,
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


export async function editNota(
  formData: FormData
) {
  try {
    const parsed = ZodNotaElementSchema.safeParse(
      {
        id: formData.get(
          'id'
        ),
        text: formData.get(
          'text'
        ),
        date: formData.get(
          'date'
        ),
        done: formData.get(
          'done'
        ),
        pathname: formData.get(
          'pathname'
        ),
        llaveProceso: formData.get(
          'llaveProceso'
        )

      }
    );

    const {
      success
    } = parsed;

    if ( !success ) {
      throw new Error(
        `hubo un error en la consulta: ${ parsed.error }`
      );
    }

    const {
      data
    } = parsed;

    const nota = await prisma.nota.upsert(
      {
        where : data,
        update: data,
        create: data
      }
    );

    return {
      message: 'success',
      data   : nota
    };
  } catch ( errorSubmitNota ) {
    console.log(
      JSON.stringify(
        errorSubmitNota
      )
    );

    if ( errorSubmitNota instanceof Error ) {
      return {
        message: errorSubmitNota.message,
        data   : null
      };
    }

    return {
      message: `error: ${ errorSubmitNota }`,
      data   : null
    };
  }
}