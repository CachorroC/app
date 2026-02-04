// app/api/addUser/route.ts
import clientPromise from '#@/lib/connection/mongodb';
import { NextResponse } from 'next/server';

export async function POST( request: Request ) {
  try {
    // 1. Connect to the database
    const client = await clientPromise;
    const db = client.db( 'Actuaciones' ); // Replace with your DB name

    // 2. Parse the incoming JSON body
    const body = await request.json();

    // Optional: Add basic validation here
    if ( !body.carpetaNumero || !body.llaveProceso ) {
      return NextResponse.json(
        {
          error: 'Missing required fields: carpetaNumero, llaveProceso'
        },
        {
          status: 400
        }
      );
    }

    // 3. Insert the document into a collection
    // 'users' is the name of the collection
    const result = await db.collection( 'Actuaciones' )
      .insertOne( body );

    // 4. Return the result
    return NextResponse.json(
      {
        message: 'User created successfully',
        result
      },
      {
        status: 201
      }
    );

  } catch ( e ) {
    console.error( e );

    return NextResponse.json(
      {
        error: 'Internal Server Error'
      },
      {
        status: 500
      }
    );
  }
}