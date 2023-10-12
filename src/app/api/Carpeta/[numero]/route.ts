import { carpetasCollection } from '#@/lib/connection/mongodb';
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest, context: { params: {numero: string} }
) {
  const {
    params
  } = context;

  const {
    numero
  } = params;

  try {
    const carpeta = await getCarpetabyNumero(
      Number(
        numero
      )
    );

    if ( !carpeta ) {
      throw new Error(
        'Noexiste nionguna carpeta con este número asociado'
      );

    }

    return new NextResponse(
      JSON.stringify(
        carpeta
      ), {
        status : 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch ( error ) {
    return new NextResponse(
      null, {
        status: 400
      }
    );
  }
}

export async function PUT(
  request: NextRequest, context: { params: {numero: string} }
) {
  const {
    params
  } = context;

  const {
    numero
  } = params;

  try {
    const incomingCarpeta = ( await request.json() ) as MonCarpeta;

    const collection = await carpetasCollection();


    const requestUpdate = await collection.findOneAndUpdate(
      {
        numero: Number(
          numero
        )
      }, {
        $set: incomingCarpeta
      }, {
        upsert        : true,
        returnDocument: 'after'
      }
    );

    if ( !requestUpdate ) {
      throw new Error(
        'la actualizacion respondio null'
      );

    }

    return new NextResponse(
      JSON.stringify(
        requestUpdate
      ), {
        status : 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch ( error ) {
    return new NextResponse(
      JSON.stringify(
        error
      ), {
        status: 400,
      }
    );
  }
}