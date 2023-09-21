import prisma from '#@/lib/connection/connectDB';
import { Tarea } from '#@/lib/types/tareas';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest
) {

  const rawTarea = ( await request.json() ) as Tarea;

  const insertTarea = await prisma.tarea.create(
    {
      data: {
        done: rawTarea.done,
        text: rawTarea.text,
        date: new Date(
          rawTarea.date
        ),
        abogado: rawTarea.abogado,
      },
    }
  );

  return NextResponse.json(
    insertTarea
  );
}

export async function PUT(
  req: Request
) {
  const {
    id, text, done, date, abogado
  } = await req.json();

  const exists = await prisma.tarea.findUnique(
    {
      where: {
        id,
      },
    }
  );

  if ( exists ) {
    return Response.json(
      JSON.stringify(
        exists
      ), {
        status : 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }

  const user = await prisma.tarea.create(
    {
      data: {
        text,
        done,
        date,
        abogado,
      },
    }
  );

  return Response.json(
    user
  );
}
