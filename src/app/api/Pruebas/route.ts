import prisma from '#@/lib/connection/prisma';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { NextRequest, NextResponse } from 'next/server';
import 'server-only';

//? aqui van las peticiones a todas las carpetas y colleccion carpetas
export async function GET(Request: NextRequest) {
  const { searchParams } = new URL(Request.url);

  const llaveProceso = searchParams.get('llaveProceso');

  if (llaveProceso) {
    const carpetas = await prisma.carpeta.findMany({
      where: {
        llaveProceso,
      },
    });

    return new NextResponse(JSON.stringify(carpetas), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  const idProceso = searchParams.get('idProceso');

  if (idProceso) {
    const carpetas = await prisma.carpeta.findMany({
      where: {
        llaveProceso: idProceso,
      },
    });

    return new NextResponse(JSON.stringify(carpetas), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  const _id = searchParams.get('_id');

  if (_id) {
    const carpeta = await prisma.carpeta.findUnique({
      where: {
        numero: Number(_id),
      },
    });

    return new NextResponse(JSON.stringify(carpeta ? [carpeta] : []), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  const carpetas = await prisma.carpeta.findMany();

  return new NextResponse(JSON.stringify(carpetas), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function POST(request: NextRequest) {
  const incomingCarpeta = (await request.json()) as IntCarpeta;

  const carpeta = await prisma.carpeta.upsert({
    where: {
      numero: incomingCarpeta.numero,
    },
    update: incomingCarpeta,
    create: incomingCarpeta,
  });

  if (!carpeta) {
    return new NextResponse(null, {
      status: 404,
    });
  }

  return NextResponse.json(carpeta);
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get('_id');

  try {
    if (!id) {
      throw new Error(
        'no se proporcionó un id con la accion, quiso decir POST? ',
      );
    }

    const updatedCarpeta = (await request.json()) as IntCarpeta;

    const result = await prisma.carpeta.update({
      where: {
        numero: Number(id),
      },
      data: updatedCarpeta,
    });

    if (result) {
      return new NextResponse(JSON.stringify(result), {
        status: 200,
        statusText: `Successfully updated game with id ${id}`,
        headers: {
          'Content-type': 'application/json',
        },
      });
    }

    return new NextResponse(null, {
      status: 304,
      statusText: `Game with id: ${id} not updated`,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`error en api/Pruebas: ${error.message}`);

      return new NextResponse(
        JSON.stringify({
          error: error.name,
          message: error.message,
        }),
        {
          status: 400,
          statusText: error.message,
        },
      );
    }

    return new NextResponse(null, {
      status: 400,
    });
  }
}
