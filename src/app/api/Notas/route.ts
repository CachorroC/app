import 'server-only';
import { notasCollection } from '#@/lib/connection/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '#@/lib/connection/prisma';
import { Nota } from '@prisma/client';
/*
export async function GET () {
  const collection = await notasCollection();

  const notasRaw = await collection.find()
    .sort(
      {
        cod: 1
      }
    )
    .toArray();

  const notas = notasConvert.toMonNotas(
    notasRaw
  );

  return new NextResponse(
    JSON.stringify(
      notas
    ), {
      status : 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}
*/

export async function GET () {
  const notas = await prisma.nota.findMany();
  return NextResponse.json(
    notas
  );
}

export async function POST (
  request: NextRequest
) {
  try {


    const incomingNote = ( await request.json() ) as Nota;




    const collection = await notasCollection();

    const updatedNote = await collection.insertOne(
      incomingNote
    );

    if ( !updatedNote ) {
      throw new Error(
        'no se actualizó la notas'
      );
    }

    const json = JSON.stringify(
      updatedNote
    );
    console.log(
      json
    );
    return NextResponse.json(
      updatedNote
    );

  } catch ( error ) {
    console.log(
      error
    );
    return NextResponse.json(
      error, {
        status: 300
      }
    );
  }
}

export async function PUT (
  request: NextRequest
) {
  try {


    const incomingNote = ( await request.json() ) as Nota;




    const collection = await notasCollection();

    const updatedNote = await collection.findOneAndUpdate(
      {
        id: incomingNote.id
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
      throw new Error(
        'no se actualizó la notas'
      );
    }

    const json = JSON.stringify(
      updatedNote
    );
    console.log(
      json
    );
    return new NextResponse(
      JSON.stringify(
        updatedNote
      ), {
        status : 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch ( error ) {
    console.log(
      error
    );
    return NextResponse.json(
      error, {
        status: 300
      }
    );
  }
}
/*
export async function DELETE(
  Request: NextRequest
) {
  const notas = await notasCollection();

  const {
    searchParams
  } = new URL(
    Request.url
  );

  const id = searchParams.get(
    'id'
  );

  if ( id ) {
    const query = {
      _id: new ObjectId(
        id
      ),
    };

    const Result = await notas.deleteOne(
      query
    );

    if ( Result.acknowledged ) {
      const count = Result.deletedCount;

      const response = {
        isOk        : true,
        deletedCount: count,
        deletedId   : id,
      };

      return new NextResponse(
        JSON.stringify(
          response
        ), {
          status : 202,
          headers: {
            'content-type': 'application/json',
          },
        }
      );
    }

    if ( !Result.acknowledged ) {
      throw new Error(
        'no pudimos eliminar esta nota, inténtalo de nuevo'
      );
    }

    return new NextResponse(
      JSON.stringify(
        Result
      ), {
        status: 200,
      }
    );
  }

  return new NextResponse(
    null, {
      status: 405,
    }
  );
} */