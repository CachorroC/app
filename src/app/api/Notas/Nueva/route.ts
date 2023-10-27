import { notasCollection } from '#@/lib/connection/mongodb';
import {  NextRequest, NextResponse } from 'next/server';
import { prisma } from '#@/lib/connection/prisma';
import { NewNota } from '#@/lib/types/notas';
import { Nota, Prisma } from '@prisma/client';


export async function GET () {

  const collection = await notasCollection();

  let notasSize = await collection.countDocuments();

  const newNota = new NewNota(
    'nueva nota', '/', notasSize,
  );
  return NextResponse.json(
    newNota
  );

}


export async function POST (
  request: NextRequest
) {
  try {


    const incomingNote =  ( await request.json() ) as Nota;

    const {
      // eslint-disable-next-line no-unused-vars
      id, carpetaNumero, ...note
    } = incomingNote;
    let nota: Prisma.NotaCreateInput;

    if ( incomingNote.carpetaNumero ) {
      nota = {
        ...note,
        carpeta: {
          connect: {
            id: incomingNote.carpetaNumero
          },
        },
      };
    } else {
      nota = {
        ...note
      };
    }

    // Pass 'user' object into query
    const inserterPrisma = await prisma.nota.create(
      {
        data: nota
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

export async function PUT (
  request: NextRequest
) {
  try {


    const incomingNote = ( await request.json() ) as Nota;

    const {

      // eslint-disable-next-line no-unused-vars
      id, ...note
    } = incomingNote;

    const inserterPrisma = await prisma.nota.upsert(
      {
        where: {
          id: incomingNote.id
        },
        update: incomingNote,
        create: note
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