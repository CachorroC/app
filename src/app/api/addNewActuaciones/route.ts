// app/api/addUser/route.ts
import prisma from '#@/lib/connection/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 2. Parse the incoming JSON body
    const body = await request.json();

    // Optional: Add basic validation here
    if (!body.carpetaNumero || !body.llaveProceso) {
      return NextResponse.json(
        {
          error: 'Missing required fields: carpetaNumero, llaveProceso',
        },
        {
          status: 400,
        },
      );
    }

    // 3. Insert the document into the database
    const result = await prisma.actuacion.create({
      data: body,
    });

    // 4. Return the result
    return NextResponse.json(
      {
        message: 'User created successfully',
        result,
      },
      {
        status: 201,
      },
    );
  } catch (e) {
    console.error(e);

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
