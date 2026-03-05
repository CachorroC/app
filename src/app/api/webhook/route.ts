/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import webpush from 'web-push'; // Importing the mock DB
import prisma from '#@/lib/connection/prisma';
import type { PushSubscription as WebPushSubscription } from 'web-push';

interface SubscriptionDoc extends WebPushSubscription {
  id: string;
  endpoint: string;
  data: any;
}

webpush.setVapidDetails(
  'mailto:juankpato87@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

async function aggregateNotificationToDatabase(notification: any) {
  try {
    // Use raw SQL to store notifications (you may need to create a NotificationHistory model)
    await prisma.$executeRawUnsafe(
      `INSERT INTO notification_history (data) VALUES ($1)`,
      JSON.stringify(notification),
    );

    console.log(`inserted notification to database`);
  } catch (error) {
    console.log(
      `failed inserting the notification to the database: ${JSON.stringify(
        error,
        null,
        2,
      )}`,
    );
    console.error(
      `failed inserting the notification to the database: ${JSON.stringify(
        error,
        null,
        2,
      )}`,
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, body: msgBody, icon, data, actions } = body;

  // 1. Prepare Payload ONCE (Logic Fix: Don't re-stringify inside the loop)
  const payload = JSON.stringify({
    title,
    body: msgBody,
    icon,
    data,
    actions,
  });
  await aggregateNotificationToDatabase(body);

  // 2. Get all push subscriptions from Prisma
  // Note: Uses raw SQL since we don't have a specific model yet
  const subscriptions = await prisma.$queryRawUnsafe<SubscriptionDoc[]>(
    `SELECT * FROM push_subscriptions`,
  );

  // 3. Batch Processing (Prevents Memory Hoarding)
  const BATCH_SIZE = 50;
  let batch = [];

  for (const sub of subscriptions) {
    // Parse the data if it's stored as JSON string
    const subscription = typeof sub.data === 'string' ? JSON.parse(sub.data) : sub;

    batch.push(subscription);

    // If batch is full, process it
    if (batch.length >= BATCH_SIZE) {
      await processBatch(batch, payload);
      batch = []; // Clear memory
    }
  }

  // Process any remaining subscriptions
  if (batch.length > 0) {
    await processBatch(batch, payload);
  }

  return NextResponse.json({
    message: 'Notifications sent',
  });
}

// Helper function to handle sending and cleanup
async function processBatch(
  subscriptions: any[],
  payload: string,
) {
  const promises = subscriptions.map(async (sub) => {
    try {
      await webpush.sendNotification(sub, payload);
    } catch (error: any) {
      if (error.statusCode === 410 || error.statusCode === 404) {
        // Clean up invalid subscription
        await prisma.$executeRawUnsafe(
          `DELETE FROM push_subscriptions WHERE endpoint = $1`,
          sub.endpoint,
        );
        console.log(`Cleaned up invalid sub: ${sub.endpoint}`);
      }

      // 4. Cleanup Invalid Subscriptions
    }
  });

  // Wait for this specific batch to finish before moving to the next
  await Promise.all(promises);
}
