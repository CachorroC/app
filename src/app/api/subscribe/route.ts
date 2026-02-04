import clientPromise from '#@/lib/connection/mongodb';
import { NextResponse } from 'next/server';

// In a real app, replace this variable with a database (Postgres, Mongo, etc.)
// You must store every user's subscription object.

export async function POST ( request: Request ) {
  const subscription = await request.json();

  if ( !subscription || !subscription.endpoint ) {
    return NextResponse.json(
      {
        error: 'Invalid subscription'
      }, {
        status: 400
      }
    );
  }

  const client = await clientPromise;
  const db = client.db( 'Actuaciones' ); // Replace with your DB name
  const collection = db.collection( 'push_subscriptions' );

  // We use the 'endpoint' URL as the unique ID for the device
  await collection.updateOne(
    {
      endpoint: subscription.endpoint
    },
    {
      $set: subscription
    },
    {
      upsert: true
    }
  );


  return NextResponse.json( {
    success: true
  } );
}