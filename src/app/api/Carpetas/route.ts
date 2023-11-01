import { carpetasCollection } from '#@/lib/connection/mongodb';
import { carpetaConvert } from '#@/lib/types/carpetas';
import { NextResponse } from 'next/server';


export async function GET () {
  try {

    const collection = await carpetasCollection();

    const carpetasRaw = await collection.find(
      {}
    )
      .toArray();

    const carpetas = carpetaConvert.toMonCarpetas(
      carpetasRaw
    );

    return NextResponse.json(
      carpetas
    );
  } catch ( error ) {
    console.log(
      `error en Api/Carpetas: ${ error }`
    );
    return NextResponse.json(
      []
    );
  }
}
