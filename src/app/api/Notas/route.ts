import 'server-only';
import { notasCollection } from '#@/lib/connection/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import getNotas from '#@/lib/project/getNotas';

export async function GET() {
  const notas = await getNotas();

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

export async function POST(
  request: NextRequest
) {
  const incomingRequest = await request.json();

  const collection = await notasCollection();

  const outgoingRequest = await collection.insertOne(
    incomingRequest
  );

  if ( !outgoingRequest ) {
    return new NextResponse(
      null, {
        status: 404,
      }
    );
  }

  return new NextResponse(
    JSON.stringify(
      outgoingRequest
    ), {
      status : 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}

export async function PUT(
  Request: NextRequest
) {
  const collection = await notasCollection();

  const updatedNote = await Request.json();

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

    const result = await collection.updateOne(
      query, {
        $set: updatedNote,
      }
    );

    if ( result.acknowledged ) {
      return new NextResponse(
        `Successfully updated game with id ${ id }`, {
          status : 200,
          headers: {
            'content-type': 'text/html',
          },
        }
      );
    }

    return new NextResponse(
      `the result was ${
        result.acknowledged
          ? 'true'
          : 'false'
      } with ${ result.modifiedCount.toString() }`,
      {
        status : 200,
        headers: {
          'content-type': 'text/html',
        },
      },
    );
  }

  return new NextResponse(
    null, {
      status: 404,
    }
  );
}

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
      status: 405
    }
  );
}
