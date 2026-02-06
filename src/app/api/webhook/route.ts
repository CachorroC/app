/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import webpush from 'web-push';// Importing the mock DB
import clientPromise from '#@/lib/connection/mongodb';
import type { PushSubscription as WebPushSubscription } from 'web-push';
import { Collection } from 'mongodb';
interface SubscriptionDoc extends WebPushSubscription {
  _id: string; // MongoDB always adds an _id
}


webpush.setVapidDetails(
  'mailto:juankpato87@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);


export async function POST(
  request: Request
) {
  const body = await request.json();
  const {
    title,
    body: msgBody,
    icon,
    data,
    actions
  } = body;

  // 1. Prepare Payload ONCE (Logic Fix: Don't re-stringify inside the loop)
  const payload = JSON.stringify(
    {
      title,
      body: msgBody,
      icon,
      data,
      actions
    }
  );

  const client = await clientPromise;
  const db = client.db(
    'Actuaciones'
  );
  const collection = db.collection<SubscriptionDoc>(
    'push_subscriptions'
  );

  // 2. CRITICAL FIX: Targeted vs Broadcast
  // Currently, your code sends this notification to EVERY user in the DB.
  // If this notification is for a specific user (e.g. "Your order is ready"),
  // you MUST filter by userId here.
  // const cursor = collection.find({ userId: data.userId }); <--- Recommended

  // If you genuinely intend to Broadcast to ALL users, use a cursor:
  const cursor = collection.find(
    {}
  );

  // 3. Batch Processing (Prevents Memory Hoarding)
  const BATCH_SIZE = 50;
  let batch = [];

  // Iterate using 'for await' to stream docs instead of loading all (.toArray)
  for await ( const sub of cursor ) {
    // Add to current batch
    batch.push(
      sub
    );

    // If batch is full, process it
    if ( batch.length >= BATCH_SIZE ) {
      await processBatch(
        batch, payload, collection
      );
      batch = []; // Clear memory
    }
  }

  // Process any remaining subscriptions
  if ( batch.length > 0 ) {
    await processBatch(
      batch, payload, collection
    );
  }

  return NextResponse.json(
    {
      message: 'Notifications sent'
    }
  );
}

// Helper function to handle sending and cleanup
async function processBatch(
  subscriptions: SubscriptionDoc[], payload: string, collection: Collection<SubscriptionDoc>
) {
  const promises = subscriptions.map(
    async (
      sub
    ) => {
      try {
        await webpush.sendNotification(
          sub, payload
        );
      } catch ( error: any ) {

        if ( error.statusCode === 410 || error.statusCode === 404 ) {
          // Use ObjectId for deletion if your _id is an ObjectId
          await collection.deleteOne(
            {
              _id: sub._id
            }
          );
          console.log(
            `Cleaned up invalid sub: ${ sub.endpoint }`
          );
        }

        // 4. Cleanup Invalid Subscriptions

      }
    }
  );

  // Wait for this specific batch to finish before moving to the next
  await Promise.all(
    promises
  );
}