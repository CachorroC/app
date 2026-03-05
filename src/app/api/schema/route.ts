import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // process.cwd() is the safest way to get to the project root in Next.js API routes
    const dmmfPath = path.join(
      process.cwd(), 'prisma', 'dmmf.json' 
    );
    const fileContents = fs.readFileSync(
      dmmfPath, 'utf8' 
    );
    const dmmf = JSON.parse( fileContents );

    return NextResponse.json( {
      models: dmmf.models 
    } );
  } catch ( error ) {
    console.error(
      'Failed to read DMMF:', error 
    );

    return NextResponse.json(
      {
        error: 'Failed to load schema data' 
      }, {
        status: 500 
      } 
    );
  }
}