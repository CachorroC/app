import { NextResponse } from 'next/server';
import webpush from 'web-push';// Importing the mock DB
import clientPromise from '#@/lib/connection/mongodb';
import type { PushSubscription as WebPushSubscription } from 'web-push';
import { newActuacionWehookResponse } from '#@/lib/types/actuaciones';

interface SubscriptionDoc extends WebPushSubscription {
  _id: string; // MongoDB always adds an _id
}


webpush.setVapidDetails(
  'mailto:juankpato87@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);



export async function POST( request: Request ) {
  const body = await request.json() as newActuacionWehookResponse;
  const notificationPayload = JSON.stringify( {
    ...body,
    title: 'Update Received',
    body : {
      ...body
    }
  } );

  const client = await clientPromise;
  const db = client.db( 'Actuaciones' );
  const collection = db.collection<SubscriptionDoc>( 'push_subscriptions' );

  // 1. Fetch all subscriptions
  const subscriptions = await collection.find( {} )
    .toArray();
  // 2. Send notifications in parallel
  const sendPromises = subscriptions.map( async ( sub ) => {
    try {

      await webpush.sendNotification(
        sub, notificationPayload
      );
    } catch ( error: any ) {
      // 3. CLEANUP: If the subscription is invalid (410 Gone or 404 Not Found), delete it
      if ( error.statusCode === 410 || error.statusCode === 404 ) {
        console.log(
          'Subscription expired/invalid, deleting from DB:', sub.endpoint
        );
        await collection.deleteOne( {
          _id: sub._id
        } );
      } else {
        console.error(
          'Error sending notification:', error
        );
      }
    }
  } );

  await Promise.all( sendPromises );

  return NextResponse.json( {
    message: 'Notification sent'
  } );
}