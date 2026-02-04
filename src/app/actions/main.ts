'use server';

import { revalidateTag } from 'next/cache';
import { ZodNotaElementSchema } from '#@/lib/types/zod/nota';
import { DeleteResult } from 'mongodb';
import { NotaEditorAction, IntNota } from '#@/lib/types/notas';
import clientPromise from '#@/lib/connection/mongodb';

export async function createNota( formData: FormData ) {
  try {
    const parsed = ZodNotaElementSchema.safeParse( {
      id           : formData.get( 'id' ),
      title        : formData.get( 'title' ),
      content      : formData.get( 'content' ),
      dueDate      : formData.get( 'dueDate' ),
      pathname     : formData.get( 'pathname' ),
      carpetaId    : formData.get( 'carpetaId' ),
      carpetaNumero: formData.get( 'carpetaNumero' ),
    } );

    console.log( `createNota parsed schema: ${ parsed }` );

    if ( !parsed.success ) {
      throw new Error( 'no pudimos parsear con zodla nota que ingresaste. Intentalo nuevamente', );
    }

    const {
      data
    } = parsed;

    const client = await clientPromise;

    if ( !client ) {
      throw new Error( 'no hay cliente mongólico' );
    }

    const db = client.db( 'RyS' );

    const collection = db.collection<IntNota>( 'Notas' );

    const nota = await collection.findOneAndUpdate(
      {
        id: data.id,
      },
      {
        $set: data,
      },
      {
        upsert        : true,
        returnDocument: 'after',
      },
    );

    if ( !nota ) {
      throw new Error( 'no pudimos actyualizar o insertar esa nota' );
    }

    revalidateTag(
      'notas', 'max' 
    );

    return;
  } catch ( e ) {
    console.log( `there was an error at createNota: ${ JSON.stringify( e ) }` );

    return;
  }
}

export async function deleteNota( {
  id
}: { id: string } ) {
  try {
    const client = await clientPromise;

    if ( !client ) {
      throw new Error( 'no hay cliente mongólico' );
    }

    const db = client.db( 'RyS' );

    const collection = db.collection<IntNota>( 'Notas' );

    const deleter = await collection.deleteOne( {
      id: id,
    } );

    if ( !deleter.acknowledged ) {
      throw new Error( 'deleter not acknowledged' );
    }

    console.log( `deleNota: se borraron ${ deleter.deletedCount } notas` );

    return deleter;
  } catch ( error ) {
    if ( error instanceof Error ) {
      console.log( `surgió una instancia de error en deleteNota: ${ error.message }`, );
    }

    console.log( `error deleteNota: ${ JSON.stringify(
      error, null, 2
    ) }` );

    const deleteRes: DeleteResult = {
      acknowledged: false,
      deletedCount: 0,
    };

    return deleteRes;
  }
}

export async function editNota(
  initialFormState: NotaEditorAction,
  formData: FormData,
) {
  try {
    const parsed = ZodNotaElementSchema.safeParse( {
      id           : formData.get( 'id' ),
      text         : formData.get( 'text' ),
      date         : formData.get( 'date' ),
      pathname     : formData.get( 'pathname' ),
      carpetaNumero: formData.get( 'carpetaNumero' ),
    } );

    const {
      success
    } = parsed;

    if ( !success ) {
      throw new Error( `hubo un error en la consulta: ${ parsed.error }` );
    }

    const {
      data
    } = parsed;

    const client = await clientPromise;

    if ( !client ) {
      throw new Error( 'no hay cliente mongólico' );
    }

    const db = client.db( 'RyS' );

    const collection = db.collection<IntNota>( 'Notas' );

    const nota = await collection.findOneAndUpdate(
      {
        id: data.id,
      },
      {
        $set: data,
      },
      {
        upsert: true,
      },
    );

    if ( !nota ) {
      throw new Error( 'nota not acknlowledged' );
    }

    const notaSerialized = {
      ...nota,
      _id: nota._id.toString(),
    };

    const notaActionReturn: NotaEditorAction = {
      message: `success: ${ notaSerialized._id }`,
      data   : notaSerialized,
      error  : false,
    };

    return notaActionReturn;
  } catch ( errorSubmitNota ) {
    console.log( `se ha producido un error en editNota: ${ JSON.stringify( errorSubmitNota ) }`, );

    if ( errorSubmitNota instanceof Error ) {
      const notaActionReturn: NotaEditorAction = {
        message: errorSubmitNota.message,
        data   : null,
        error  : true,
      };

      return notaActionReturn;
    }

    const notaActionReturn: NotaEditorAction = {
      message: `error: ${ errorSubmitNota }`,
      data   : null,
      error  : true,
    };

    return notaActionReturn;
  }
}
