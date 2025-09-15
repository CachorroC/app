import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '#@/lib/connection/prisma';
import { Nota, Prisma } from '@prisma/client';

export async function POST( request: NextRequest ) {
  try {
    const incomingNote = ( await request.json() ) as Nota;

    let nota: Prisma.NotaCreateInput;

    if ( incomingNote.carpetaNumero ) {
      nota = {
        ...incomingNote,
        carpeta: {
          connect: {
            numero: incomingNote.carpetaNumero,
          },
        },
      };
    } else {
      nota = {
        ...incomingNote,
      };
    }

    // Pass 'user' object into query
    const inserterPrisma = await prisma.nota.create( {
      data: nota,
    } );

    console.log( `POST en api/Notas/Nueva es ${ JSON.stringify(
      inserterPrisma, null, 2 
    ) }`, );

    return NextResponse.json(
      inserterPrisma, {
        status: 200,
      } 
    );
  } catch ( error ) {
    console.log( `POST en api/Notas/Nueva arrojó un error ${ error }` );

    return NextResponse.error();
  }
}
