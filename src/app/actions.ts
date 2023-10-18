'use server';

import { revalidateTag } from 'next/cache';
import { ZodNotaElementSchema } from '#@/lib/types/zod/nota';
import { notasCollection } from '#@/lib/connection/mongodb';
import { DeleteResult, ObjectId } from 'mongodb';
import { notasConvert } from '#@/lib/types/notas';

export async function createNota(
  formData: FormData
) {
  try {
    const parsed = ZodNotaElementSchema.safeParse(
      {
        cod: formData.get(
          'cod'
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
        ),
      }
    );
    console.log(
      `createNota parsed schema: ${ parsed }`
    );

    if ( !parsed.success ) {
      throw new Error(
        'no pudimos parsear con zodla nota que ingresaste. Intentalo nuevamente',
      );
    }

    const {
      data
    } = parsed;

    const collection = await notasCollection();

    const nota = await collection.insertOne(
      {
        ...data,
      }
    );

    revalidateTag(
      'carpetas'
    );

    return {
      message: `success: ${ nota.insertedId }`,
      id     : nota.insertedId.toString(),
    };
  } catch ( e ) {
    console.log(
      `there was an error at createNota: ${ JSON.stringify(
        e
      ) }`
    );

    return {
      message: `there was an error in createNota: ${ JSON.stringify(
        e
      ) }`,
      id: null,
    };
  }
}

export async function deleteNota(
  {
    id
  }: { id: string }
) {
  try {
    const collection = await notasCollection();

    const deleter = await collection.deleteOne(
      {
        _id: new ObjectId(
          id
        ),
      }
    );

    if ( !deleter.acknowledged ) {
      throw new Error(
        'deleter not acknowledged'
      );
    }

    console.log(
      `deleNota: se borraron ${ deleter.deletedCount } notas`
    );
    return deleter;
  } catch ( error ) {
    if ( error instanceof Error ) {
      console.log(
        `surgió una instancia de error en deleteNota: ${ error.message }`
      );
    }

    console.log(
      `error deleteNota: ${ JSON.stringify(
        error, null, 2
      ) }`
    );

    const deleteRes: DeleteResult = {
      acknowledged: false,
      deletedCount: 0,
    };
    return deleteRes;
  }
}

export async function editNota(
  formData: FormData
) {
  try {
    const parsed = ZodNotaElementSchema.safeParse(
      {
        cod: formData.get(
          'cod'
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
        ),
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

    const collection = await notasCollection();

    const nota = await collection.findOneAndUpdate(
      {
        cod: data.cod,
      },
      {
        $set: data,
      },
      {
        upsert: true,
      },
    );

    if ( !nota ) {
      throw new Error(
        'nota not acknlowledged'
      );
    }

    const notaSerialized = notasConvert.toMonNota(
      nota
    );

    return {
      message: `success: ${ notaSerialized._id }`,
      data   : notaSerialized,
    };
  } catch ( errorSubmitNota ) {
    console.log(
      `se ha producido un error en editNota: ${ JSON.stringify(
        errorSubmitNota
      ) }`
    );

    if ( errorSubmitNota instanceof Error ) {
      return {
        message: errorSubmitNota.message,
        data   : null,
      };
    }

    return {
      message: `error: ${ errorSubmitNota }`,
      data   : null,
    };
  }
}
