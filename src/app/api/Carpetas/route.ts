import { carpetasCollection } from '#@/lib/connection/mongodb';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { NextRequest, NextResponse } from 'next/server';
import 'server-only';

//? aqui van las peticiones a todas las carpetas y colleccion carpetas
export async function GET(
            Request: NextRequest
) {
  const {
                  searchParams
  } = new URL(
              Request.url
  );

  const collection = await carpetasCollection();

  const carpetas = await collection.find(
              {}
  )
        .toArray();

  const llaveProceso = searchParams.get(
              'llaveProceso'
  );

  if ( llaveProceso ) {
    const Demandados = carpetas.filter(
                (
                    carpeta
                ) => {
                      return carpeta.llaveProceso === llaveProceso;
                }
    );

    return new NextResponse(
                JSON.stringify(
                            Demandados
                ), {
                                status : 200,
                                headers: {
                                                'content-type': 'application/json',
                                },
                }
    );
  }

  const idProceso = searchParams.get(
              'idProceso'
  );

  if ( idProceso ) {
    const Demandados = carpetas.filter(
                (
                    carpeta
                ) => {
                      return carpeta.llaveProceso === llaveProceso;
                }
    );

    return new NextResponse(
                JSON.stringify(
                            Demandados
                ), {
                                status : 200,
                                headers: {
                                                'content-type': 'application/json',
                                },
                }
    );
  }

  const _id = searchParams.get(
              '_id'
  );

  if ( _id ) {
    const Carpeta = carpetas.filter(
                (
                    carpeta
                ) => {
                      return carpeta._id.toString() === _id;
                }
    );

    return new NextResponse(
                JSON.stringify(
                            Carpeta
                ), {
                                status : 200,
                                headers: {
                                                'content-type': 'application/json',
                                },
                }
    );
  }

  return new NextResponse(
              JSON.stringify(
                          carpetas
              ), {
                              status : 200,
                              headers: {
                                              'content-type': 'application/json',
                              },
              }
  );
}

export async function POST(
            request: NextRequest
) {
  const incomingCarpeta = ( await request.json() ) as IntCarpeta;

  const collection = await carpetasCollection();

  const updateOne = await collection.findOneAndUpdate(
              {
                              $or: [
                                      {
                                                      numero: incomingCarpeta.numero,
                                      },
                                      {
                                                      idProceso: incomingCarpeta.idProceso,
                                      },
                                      {
                                                      'deudor.cedula': incomingCarpeta.deudor.cedula,
                                      },
                              ],
              },
              {
                              $set: incomingCarpeta,
              },
              {
                              upsert        : true,
                              returnDocument: 'after',
              },
  );

  if ( !updateOne ) {
    return new NextResponse(
                null, {
                                status: 404,
                }
    );
  }

  return NextResponse.json(
              updateOne
  );
}
