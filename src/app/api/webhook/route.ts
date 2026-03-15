/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import webpush from 'web-push';
import clientPromise from '#@/lib/connection/mongodb';
import type { PushSubscription as WebPushSubscription } from 'web-push';
import { Collection, Document, OptionalId } from 'mongodb';
interface SubscriptionDoc {
  _id         : string;
  endpoint    : string;
  userId      : string;
  subscription: WebPushSubscription; // The actual web-push object is nested here!
  updatedAt   : Date;
}
webpush.setVapidDetails(
  'mailto:juankpato87@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

async function aggregateNotificationToDatabase( notification: OptionalId<Document> ) {
  try {
    const client = await clientPromise;
    const db = client.db( 'Actuaciones' );
    const collection = db.collection( 'notification_history' );
    const insertNotification = await collection.insertOne( notification );

    if ( !insertNotification.acknowledged ) {
      throw new Error( 'Failed to insert notification into DB' );
    }

    console.log( `Notification logged with ID: ${ insertNotification.insertedId }` );
  } catch ( error ) {
    // We only log here so a DB logging failure doesn't stop the push notifications
    console.error(
      'Failed inserting the notification to the database:', error
    );
  }
}

export async function POST( request: Request ) {
  try {
    const body = await request.json();
    const {
      title, body: msgBody, icon, data, actions
    } = body;

    const payload = JSON.stringify( {
      title,
      body: msgBody,
      icon,
      data,
      actions,
    } );

    // Fire and forget (or await if you want to strictly require it)
    await aggregateNotificationToDatabase( body );

    const client = await clientPromise;
    const db = client.db( 'Actuaciones' );
    const collection = db.collection<SubscriptionDoc>( 'push_subscriptions' );

    const cursor = collection.find( {} );
    const BATCH_SIZE = 50;
    let batch: SubscriptionDoc[] = [];

    for await ( const sub of cursor ) {
      batch.push( sub );

      if ( batch.length >= BATCH_SIZE ) {
        await processBatch(
          batch, payload, collection
        );
        batch = [];
      }
    }

    if ( batch.length > 0 ) {
      await processBatch(
        batch, payload, collection
      );
    }

    return NextResponse.json(
      {
        message: 'Notifications processing completed'
      }, {
        status: 200
      }
    );

  } catch ( error ) {
    console.error(
      'Fatal error in POST route:', error
    );

    return NextResponse.json(
      {
        error: 'Internal Server Error processing notifications'
      },
      {
        status: 500
      }
    );
  }
}

async function processBatch(
  subscriptions: SubscriptionDoc[],
  payload: string,
  collection: Collection<SubscriptionDoc>,
) {
  const promises = subscriptions.map( async ( sub ) => {

    // 1. Target the nested subscription object for the self-healing check
    const pushSub = sub.subscription;

    if ( !pushSub || !pushSub.keys || !pushSub.keys.auth || !pushSub.keys.p256dh ) {
      console.warn( `Deleting malformed subscription: ${ sub.endpoint }` );

      try {
        await collection.deleteOne( {
          _id: sub._id
        } );
      } catch ( dbError ) {
        console.error(
          `Failed to delete malformed sub ${ sub._id }:`, dbError
        );
      }

      return;
    }

    try {
      // 2. THE FIX: Pass the nested 'pushSub' object, NOT the whole DB document
      await webpush.sendNotification(
        pushSub, payload
      );
    } catch ( error: any ) {
      const statusCode = error instanceof webpush.WebPushError
        ? error.statusCode
        : error?.statusCode;

      if ( statusCode === 410 || statusCode === 404 ) {
        try {
          await collection.deleteOne( {
            _id: sub._id
          } );
          console.log( `Cleaned up invalid sub: ${ sub.endpoint }` );
        } catch ( dbError ) {
          console.error(
            `Failed to delete invalid sub ${ sub._id }:`, dbError
          );

          throw dbError;
        }
      } else {
        console.error(
          `Failed to send push to ${ sub.endpoint }:`, error.body || error.message
        );
      }
    }
  } );

  await Promise.allSettled( promises );
}