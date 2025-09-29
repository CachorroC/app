import { prisma } from '#@/lib/connection/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const tasks = await prisma.task.findMany(
    {} 
  );

  return NextResponse.json(
    tasks 
  );
}
