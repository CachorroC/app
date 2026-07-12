/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '#@/lib/connection/prisma';
import { NextResponse } from 'next/server';

// TODO(schema-cleanup): generic delegate proxy has no allowlist; requests with
// model=user|task|notificacion|medidasCautelares|notifier|factura|emisorDeFactura
// will 404 (GET/POST, guarded below) or 500 (PATCH, unguarded but caught) now that
// these models are removed — consider an explicit allowlist if this route is still in use.
// Helper function to safely get the right Prisma delegate (e.g., prisma.user)
const getDelegate = ( modelName: string ) => {
  // Prisma delegates are always lowercase (e.g., model User -> prisma.user)
  const delegateName = modelName.charAt( 0 )
    .toLowerCase() + modelName.slice( 1 );

  return ( prisma as any )[ delegateName ];
};

// FETCH DATA (GET)
export async function GET(
  request: Request,
  {
    params 
  }: { params: Promise<{ model: string }> },
) {
  const {
    model 
  } = await params;
  const delegate = getDelegate( model );

  if ( !delegate ) {
    return NextResponse.json(
      {
        error: `Table ${ model } not found`,
      },
      {
        status: 404,
      },
    );
  }

  try {
    const data = await delegate.findMany();

    return NextResponse.json( {
      data,
    } );
  } catch ( error: any ) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// CREATE RECORD (POST)
export async function POST(
  request: Request,
  {
    params 
  }: { params: Promise<{ model: string }> },
) {
  const {
    model 
  } = await params;
  const delegate = getDelegate( model );

  if ( !delegate ) {
    return NextResponse.json(
      {
        error: `Table ${ model } not found`,
      },
      {
        status: 404,
      },
    );
  }

  try {
    const body = await request.json();

    // Prisma .create() expects the data wrapped in a "data" property
    const newData = await delegate.create( {
      data: body,
    } );

    return NextResponse.json( {
      data: newData,
    } );
  } catch ( error: any ) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      },
    );
  }
}

export async function PATCH(
  request: Request,
  {
    params 
  }: { params: Promise<{ model: string }> },
) {
  // Await the params object (Required in Next.js 15+)
  const {
    model: modelName 
  } = await params;

  try {
    const body = await request.json();

    // Destructure our new dynamic payload
    const {
      idField, idValue, data 
    } = body;

    // Dynamically call prisma.[modelName].update
    const updatedRecord = await ( prisma as any )[ modelName ].update( {
      where: {
        // Use brackets to dynamically set the key name (e.g., numero: 123)
        [ idField ]: idValue,
      },
      data: data,
    } );

    return NextResponse.json( {
      success: true,
      record : updatedRecord,
    } );
  } catch ( error ) {
    console.error(
      'PRISMA PATCH ERROR:', error 
    );

    return NextResponse.json(
      {
        error: 'Failed to update record',
      },
      {
        status: 500,
      },
    );
  }
}
