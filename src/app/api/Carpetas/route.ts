
import { carpetasCollection } from '#@/lib/connection/collections';
import { NextResponse } from 'next/server';


export async function GET () {
      try {

        const collection = await carpetasCollection();

        const carpetasRaw = await collection.find(
          {}
        )
              .toArray();

        const carpetas = carpetasRaw.map(
          (
            rawCarpeta
          ) => {
                    return {
                      ...rawCarpeta,
                      _id: rawCarpeta._id.toString()
                    };
          }
        );

        /* const carpetas = await prisma.carpeta.findMany(
          {
            include: {
              Proceso        : true,
              ultimaActuacion: true,
              Demanda        : true,
              Deudor         : true,
              tareas         : true
            }
          }
        ); */
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
