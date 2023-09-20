import { notasCollection } from '#@/lib/connection/mongodb';
import { intNota } from '#@/lib/types/notas';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
            request: NextRequest,
) {


  const json = ( await request.json() ) as intNota;
  console.log(
              json
  );

  const collection = await notasCollection();

  const insertNewNota = await collection.insertOne(
              json
  );

  if ( insertNewNota.acknowledged ) {
    console.log(
                insertNewNota.insertedId
    );
  }
}

export async function PUT(
            request: NextRequest
) {
  const json = ( await request.json() ) as intNota;
  console.log(
              json
  );

  const {
                  searchParams
  } = new URL(
              request.url
  );

  const _id = searchParams.get(
              '_id'
  );

  if ( _id ) {
    const query = {
                    _id: new ObjectId(
                                _id
                    ),
    };

    const collection = await notasCollection();

    const update = await collection.findOneAndUpdate(
                query,
                {
                                $set: json,
                },
                {
                                upsert        : true,
                                returnDocument: 'after',
                },
    );

    if ( update ) {
      return new NextResponse(
                  JSON.stringify(
                              update
                  ), {
                                  status : 200,
                                  headers: {
                                                  'content-type': 'application/json',
                                  },
                  }
      );
    }

    return new NextResponse(
                null, {
                                status: 404,
                }
    );
  }

  const collection = await notasCollection();

  const update = await collection.insertOne(
              json
  );

  if ( update.acknowledged ) {
    return new NextResponse(
                JSON.stringify(
                            update.insertedId
                ), {
                                status : 201,
                                headers: {
                                                'content-type': 'application/json',
                                },
                }
    );
  }

  return new NextResponse(
              null, {
                              status: 304,
              }
  );
}

export async function DELETE(
            request: NextRequest
) {
  const {
                  searchParams
  } = new URL(
              request.url
  );

  const _id = searchParams.get(
              '_id'
  );

  if ( _id ) {
    const collection = await notasCollection();

    const query = {
                    _id: new ObjectId(
                                _id
                    ),
    };

    const deleteOne = await collection.deleteOne(
                query
    );

    if ( deleteOne.deletedCount > 1 ) {
      return new NextResponse(
                  JSON.stringify(
                              deleteOne
                  ), {
                                  status : 200,
                                  headers: {
                                                  'Content-Type': 'application/json',
                                  },
                  }
      );
    }

    return new NextResponse(
                null, {
                                status: 301,
                }
    );
  }

  return new NextResponse(
              null, {
                              status: 304,
              }
  );
}
