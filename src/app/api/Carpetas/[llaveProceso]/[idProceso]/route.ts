import { carpetasCollection } from '#@/lib/connection/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
            request: NextRequest,
            {
              params 
            }: { params: { llaveProceso: string; idProceso: string } },
) {
  const collection = await carpetasCollection();

  const deleteOne = await collection.deleteOne(
    {
      idProceso: Number(
        params.idProceso 
      ),
    } 
  );

  if ( deleteOne.deletedCount > 0 ) {
    return new NextResponse(
      JSON.stringify(
        deleteOne 
      ), {
        status : 201,
        headers: {
          'Content-Type': 'application/json',
        },
      } 
    );
  }

  return new NextResponse(
    null, {
      status: 403,
    } 
  );
}
