import prisma from '#@/lib/connection/prisma';
import { NextResponse } from 'next/server';

// In a real app, replace this variable with a database (Postgres, Mongo, etc.)
// You must store every user's subscription object.

export async function POST(request: Request) {
  const subscription = await request.json();

  if (!subscription || !subscription.endpoint) {
    return NextResponse.json(
      {
        error: 'Invalid subscription',
      },
      {
        status: 400,
      },
    );
  }

  // Store push subscription in Prisma
  // Note: You'll need to create a PushSubscription model in your Prisma schema
  await prisma.$executeRawUnsafe(
    `INSERT INTO push_subscriptions (endpoint, data) VALUES ($1, $2)
     ON CONFLICT (endpoint) DO UPDATE SET data = $2`,
    subscription.endpoint,
    JSON.stringify(subscription),
  );

  return NextResponse.json({
    success: true,
  });
}
