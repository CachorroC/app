import clientPromise from '#@/lib/connection/mongodb';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { NextRequest, NextResponse } from 'next/server';

export async function GET( Request: NextRequest ) {
  const {
    searchParams 
  } = new URL( Request.url );

  const carpetas = await getCarpetas();

  const llaveProceso = searchParams.get( 'llaveProceso' );

  if ( llaveProceso ) {
    const Demandados = [
      ...carpetas
    ].filter( ( carpeta ) => {
      return carpeta.llaveProceso === llaveProceso;
    } );

    return NextResponse.json( Demandados );
  }

  const idProceso = searchParams.get( 'idProceso' );

  if ( idProceso ) {
    const Demandados = carpetas.filter( ( carpeta ) => {
      return carpeta.llaveProceso === llaveProceso;
    } );

    return NextResponse.json( Demandados );
  }

  const _id = searchParams.get( '_id' );

  if ( _id ) {
    const Carpeta = carpetas.filter( ( carpeta ) => {
      return carpeta.id.toString() === _id;
    } );

    return NextResponse.json( Carpeta );
  }

  return NextResponse.json( carpetas );
}

export async function POST( request: NextRequest ) {
  const incomingCarpeta = ( await request.json() ) as IntCarpeta;

  const client = await clientPromise;

  if ( !client ) {
    throw new Error( 'no hay cliente mongólico' );
  }

  const db = client.db( 'RyS' );

  const collection = db.collection<IntCarpeta>( 'Carpetas' );

  const updateOne = await collection.findOneAndUpdate(
    {
      $or: [
        {
          numero: incomingCarpeta.numero,
        },
        {
          llaveProceso: incomingCarpeta.llaveProceso,
        },
      ],
    },
    {
      $set: incomingCarpeta,
    },
    {
      upsert        : true,
      returnDocument: 'after',
    },
  );

  if ( !updateOne ) {
    return NextResponse.error();
  }

  return NextResponse.json( updateOne );
}

export async function PUT( request: Request ) {
  const {
    searchParams 
  } = new URL( request.url );

  const id = searchParams.get( '_id' );

  const client = await clientPromise;

  if ( !client ) {
    throw new Error( 'no hay cliente mongólico' );
  }

  const db = client.db( 'RyS' );

  const collection = db.collection<IntCarpeta>( 'Carpetas' );

  try {
    if ( !id ) {
      throw new Error( 'no se proporcionó un id con la accion, quiso decir POST? ', );
    }

    const query = {
      numero: Number( id ),
    };

    const updatedCarpeta = ( await request.json() ) as IntCarpeta;

    const result = await collection.updateOne(
      query, {
        $set: updatedCarpeta,
      } 
    );

    if ( result ) {
      return NextResponse.json( result );
    }

    return NextResponse.error();
  } catch ( error ) {
    if ( error instanceof Error ) {
      console.error( `error en api/Carpetas: ${ error.message }` );

      return NextResponse.error();
    }

    return new NextResponse(
      null, {
        status: 400,
      } 
    );
  }
}
