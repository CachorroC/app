
import { carpetasCollection } from '#@/lib/connection/collections';
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
              idProcesos: incomingCarpeta.idProcesos,
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

export async function PUT(
  request: Request
) {
      const {
        searchParams
      } = new URL(
        request.url
      );

      const id = searchParams.get(
        '_id'
      );

      const collection = await carpetasCollection();

      try {
        if ( !id ) {
          throw new Error(
            'no se proporcionó un id con la accion, quiso decir POST? ',
          );
        }

        const query = {
          numero: Number(
            id
          ),
        };

        const updatedCarpeta = ( await request.json() ) as IntCarpeta;

        const result = await collection.updateOne(
          query, {
            $set: updatedCarpeta,
          }
        );

        if ( result ) {
          return new NextResponse(
            JSON.stringify(
              result
            ), {
              status    : 200,
              statusText: `Successfully updated game with id ${ id }`,
              headers   : {
                'Content-type': 'application/json',
              },
            }
          );
        }

        return new NextResponse(
          null, {
            status    : 304,
            statusText: `Game with id: ${ id } not updated`,
          }
        );
      } catch ( error ) {
        if ( error instanceof Error ) {
          console.error(
            `error en api/Pruebas: ${ error.message }`
          );

          return new NextResponse(
            JSON.stringify(
              {
                error  : error.name,
                message: error.message,
              }
            ),
            {
              status    : 400,
              statusText: error.message,
            },
          );
        }

        return new NextResponse(
          null, {
            status: 400,
          }
        );
      }
}
