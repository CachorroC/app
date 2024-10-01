import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { getNotas } from '#@/lib/project/utils/Notas/getNotas';
import clientPromise from '#@/lib/connection/mongodb';
import { IntNota } from '#@/lib/types/notas';

export async function GET( request: NextRequest ) {
  try {
    let notas;

    const {
      searchParams 
    } = new URL( request.url );

    const carpetaNumero = searchParams.get( 'carpetaNumero' );

    if ( carpetaNumero ) {
      notas = await getNotas( Number( carpetaNumero ) );
    } else {
      notas = await getNotas();
    }

    return NextResponse.json( notas );
  } catch ( error ) {
    return NextResponse.json( null );
  }
}

export async function POST( request: NextRequest ) {
  try {
    const incomingNote = ( await request.json() ) as IntNota;

    const client = await clientPromise;

    if ( !client ) {
      throw new Error( 'no hay cliente mongólico' );
    }

    const db = client.db( 'RyS' );

    const collection = db.collection<IntNota>( 'Notas' );

    const updatedNote = await collection.insertOne( incomingNote );

    if ( !updatedNote ) {
      throw new Error( 'no se actualizó la notas' );
    }

    const json = JSON.stringify(
      updatedNote, null, 2 
    );

    console.log( `POST en api/Notas es ${ json }` );

    return NextResponse.json( updatedNote );
  } catch ( error ) {
    console.log( `POST en api/Notas arrojó un error ${ JSON.stringify(
      error, null, 2 
    ) }`, );

    return NextResponse.json(
      error, {
        status: 300,
      } 
    );
  }
}

export async function PUT( request: NextRequest ) {
  try {
    const incomingNote = ( await request.json() ) as IntNota;

    const client = await clientPromise;

    if ( !client ) {
      throw new Error( 'no hay cliente mongólico' );
    }

    const db = client.db( 'RyS' );

    const collection = db.collection<IntNota>( 'Notas' );

    const updatedNote = await collection.findOneAndUpdate(
      {
        id: incomingNote.id,
      },
      {
        $set: incomingNote,
      },
      {
        upsert        : true,
        returnDocument: 'after',
      },
    );

    if ( !updatedNote ) {
      throw new Error( 'no se actualizó la notas' );
    }

    const json = JSON.stringify(
      updatedNote, null, 2 
    );

    console.log( `PUT en api/Notas es ${ json }` );

    return new NextResponse(
      JSON.stringify( updatedNote ), {
        status : 200,
        headers: {
          'Content-Type': 'application/json',
        },
      } 
    );
  } catch ( error ) {
    console.log( `PUT en api/Notas arrojó un error ${ JSON.stringify(
      error, null, 2 
    ) }`, );

    return NextResponse.json(
      error, {
        status: 300,
      } 
    );
  }
}
