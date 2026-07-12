import clientPromise from '#@/lib/connection/mongodb';
import { NextResponse } from 'next/server';

export async function POST( request: Request ) {
  try {
    const subscription = await request.json();

    if ( !subscription || !subscription.endpoint ) {
      return NextResponse.json(
        {
          error: 'Invalid subscription object. Missing endpoint.',
        },
        {
          status: 400,
        },
      );
    }

    const client = await clientPromise;
    const db = client.db( 'Actuaciones' );
    const collection = db.collection( 'push_subscriptions' );

    // Delete the subscription from MongoDB using the unique endpoint
    const result = await collection.deleteOne( {
      endpoint: subscription.endpoint,
    } );

    if ( result.deletedCount === 0 ) {
      // not found in DB; already deleted
    }

    return NextResponse.json( {
      success: true,
    } );
  } catch ( error ) {
    console.error(
      'Error handling unsubscribe request:', error 
    );

    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      {
        status: 500,
      },
    );
  }
}
