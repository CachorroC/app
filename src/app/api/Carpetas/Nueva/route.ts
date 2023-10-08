import { carpetasCollection } from '#@/lib/connection/mongodb';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (
  request: NextRequest
) {
  const galletas = request.cookies.getAll();

  const {
    searchParams, pathname
  } = request.nextUrl;

  console.log(
    JSON.stringify(
      galletas
    )
  );
  console.log(
    JSON.stringify(
      searchParams
    )
  );
  console.log(
    JSON.stringify(
      pathname
    )
  );

  const json = ( await request.json() ) as IntCarpeta;

  const collection = await carpetasCollection();

  const insertCarpeta = await collection.insertOne(
    json
  );

  if ( !insertCarpeta.acknowledged ) {
    return new NextResponse(
      null, {
        status    : 301,
        statusText: 'No se pudo isertar la carpeta'
      }
    );
  }

  return redirect(
    `/Carpetas/id/${ insertCarpeta.insertedId }`
  );
  /*  return new NextResponse(
    JSON.stringify(
      insertCarpeta.insertedId
    ), {
      status: 200,
    }
  ); */
}