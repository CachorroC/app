import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { getNotas } from '#@/lib/project/utils/Notas/getNotas';
import prisma from '#@/lib/connection/prisma';
import { IntNota } from '#@/lib/types/notas';

export async function GET(request: NextRequest) {
  try {
    let notas;

    const { searchParams } = new URL(request.url);

    const carpetaNumero = searchParams.get('carpetaNumero');

    if (carpetaNumero) {
      notas = await getNotas(Number(carpetaNumero));
    } else {
      notas = await getNotas();
    }

    return NextResponse.json(notas);
  } catch (error) {
    return NextResponse.json(null);
  }
}

export async function POST(request: NextRequest) {
  try {
    const incomingNote = (await request.json()) as IntNota;

    const updatedNote = await prisma.nota.create({
      data: {
        id: incomingNote.id,
        text: incomingNote.text || '',
        content: Array.isArray(incomingNote.content) ? incomingNote.content : [],
        dueDate: incomingNote.dueDate ? new Date(incomingNote.dueDate) : null,
        pathname: incomingNote.pathname || null,
        carpetaNumero: incomingNote.carpetaNumero || null,
      },
    });

    if (!updatedNote) {
      throw new Error('no se pudo crear la nota');
    }

    const json = JSON.stringify(updatedNote, null, 2);

    console.log(`POST en api/Notas es ${json}`);

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.log(
      `POST en api/Notas arrojó un error ${JSON.stringify(error, null, 2)}`,
    );

    return NextResponse.json(error, {
      status: 300,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const incomingNote = (await request.json()) as IntNota;

    const updatedNote = await prisma.nota.upsert({
      where: {
        id: incomingNote.id,
      },
      update: {
        text: incomingNote.text || '',
        content: Array.isArray(incomingNote.content) ? incomingNote.content : [],
        dueDate: incomingNote.dueDate ? new Date(incomingNote.dueDate) : null,
        pathname: incomingNote.pathname || null,
        carpetaNumero: incomingNote.carpetaNumero || null,
      },
      create: {
        id: incomingNote.id,
        text: incomingNote.text || '',
        content: Array.isArray(incomingNote.content) ? incomingNote.content : [],
        dueDate: incomingNote.dueDate ? new Date(incomingNote.dueDate) : null,
        pathname: incomingNote.pathname || null,
        carpetaNumero: incomingNote.carpetaNumero || null,
      },
    });

    if (!updatedNote) {
      throw new Error('no se actualizó la nota');
    }

    const json = JSON.stringify(updatedNote, null, 2);

    console.log(`PUT en api/Notas es ${json}`);

    return new NextResponse(JSON.stringify(updatedNote), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(
      `PUT en api/Notas arrojó un error ${JSON.stringify(error, null, 2)}`,
    );

    return NextResponse.json(error, {
      status: 300,
    });
  }
}
