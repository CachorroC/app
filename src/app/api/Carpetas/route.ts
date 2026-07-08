import prisma from '#@/lib/connection/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const carpetas = await prisma.carpeta.findMany( {
      include: {
        ultimaActuacion: true,
        deudor         : true,
        codeudor       : true,
        notas          : true,
        demanda        : true,
        procesos       : {
          include: {
            juzgado: true,
          },
        },
      },
      orderBy: {
        fecha: {
          sort : 'desc',
          nulls: 'last',
        },
      },
    } );

    return NextResponse.json( carpetas );
  } catch ( error ) {
    console.log( `error en Api/Carpetas: ${ error }` );

    return NextResponse.json( [] );
  }
}
