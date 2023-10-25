import { notasCollection } from '#@/lib/connection/mongodb';
import { Nota } from '#@/lib/types/notas';
import {  NextRequest, NextResponse } from 'next/server';
import prisma from '#@/lib/connection/prisma';

export async function GET () {

  const collection = await notasCollection();

  let notasSize = await collection.countDocuments();

  const newNota = new Nota(
    'nueva nota', '/', notasSize++,
  );
  return NextResponse.json(
    newNota
  );

}


export async function POST (
  request: NextRequest
) {
  try {


    const incomingNote =  await request.json();

    const {

      // eslint-disable-next-line no-unused-vars
      id, ...note
    } = incomingNote;

    const inserterPrisma = await prisma.nota.create(
      {
        data: note
      }
    );
    console.log(
      JSON.stringify(
        inserterPrisma, null, 2
      )
    );


    return NextResponse.json(
      inserterPrisma, {
        status: 200
      }
    );

  } catch ( error ) {
    console.log(
      error
    );
    return NextResponse.json(
      error as Error, {
        status: 300
      }
    );
  }
}