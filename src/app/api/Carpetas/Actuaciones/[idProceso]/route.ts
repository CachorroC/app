import { getActuaciones } from '#@/lib/Actuaciones';
import getCarpetas from '#@/lib/project/getCarpetas';
import { sleep } from '#@/lib/project/helper';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { NextResponse } from 'next/server';

//? aqui van las peticiones a todas las actuaciones por cada carpeta, es decir, el timer que va a ejecutarser con el for of de las carpetas
export async function GET(
  request: Request, context: {params: {idProceso: string}}
) {
  const CarpetasMap = new Map<string, MonCarpeta>();

  const carpetas = await getCarpetas();


  for ( const carpeta of carpetas ) {
    CarpetasMap.set(
      carpeta._id, carpeta
    );

    const indexOfCarpeta = carpetas.indexOf(
      carpeta
    );
    await sleep(
      1000
    );

    const actuaciones = await getActuaciones(
      {
        idProceso: Number(
          context.params.idProceso
        ),
        index: indexOfCarpeta,
      }
    );

    if ( actuaciones ) {
      const newCarpeta = {
        ...carpeta,
        fecha: new Date(
          actuaciones[ 0 ].fechaActuacion
        ),
        ultimaActuacion: actuaciones[ 0 ],
      };
      CarpetasMap.set(
        carpeta._id, newCarpeta
      );
    }
  }

  const CarpetasOutput = Array.from(
    CarpetasMap.values()
  );

  return new NextResponse(
    JSON.stringify(
      CarpetasOutput
    ), {
      status : 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}
