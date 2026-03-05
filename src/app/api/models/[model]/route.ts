/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '#@/lib/connection/prisma';
import { NextResponse } from 'next/server';

// Helper function to safely get the right Prisma delegate (e.g., prisma.user)
const getDelegate = (modelName: string) => {
  // Prisma delegates are always lowercase (e.g., model User -> prisma.user)
  const delegateName = modelName.charAt(0).toLowerCase() + modelName.slice(1);

  return (prisma as any)[delegateName];
};

// FETCH DATA (GET)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ numero: string }> },
) {
  const { model } = await params;
  const delegate = getDelegate(model);

  if (!delegate) {
    return NextResponse.json(
      {
        error: `Table ${model} not found`,
      },
      {
        status: 404,
      },
    );
  }

  try {
    const data = await delegate.findMany();

    return NextResponse.json({
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// CREATE RECORD (POST)
export async function POST(
  request: Request,
  { params }: { params: { model: string } },
) {
  const delegate = getDelegate(params.model);

  if (!delegate) {
    return NextResponse.json(
      {
        error: `Table ${params.model} not found`,
      },
      {
        status: 404,
      },
    );
  }

  try {
    const body = await request.json();

    // Prisma .create() expects the data wrapped in a "data" property
    const newData = await delegate.create({
      data: body,
    });

    return NextResponse.json({
      data: newData,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      },
    );
  }
}
