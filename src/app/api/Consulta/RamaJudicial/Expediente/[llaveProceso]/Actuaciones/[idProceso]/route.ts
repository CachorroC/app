
import { NextResponse } from 'next/server';
import { getProceso } from '#@/lib/Procesos';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';

export async function generateStaticParams () {
  const maperIdk = new Map<number, { llaveProceso: string;  idProceso: string}>();

  const products = await getCarpetas();

  for ( const carpeta of products ) {
    if ( !carpeta.llaveProceso ) {
      continue;
    }

    if ( carpeta.idProcesos.length === 0 ) {
      maperIdk.set(
        carpeta.numero, {
          llaveProceso: carpeta.llaveProceso,
          idProceso   : '0'
        }
      );
      continue;
    }

    for ( const idProceso of carpeta.idProcesos ) {
      maperIdk.set(
        idProceso, {
          llaveProceso: carpeta.llaveProceso,
          idProceso   : idProceso.toString()
        }
      );
    }
  }

  return Array.from(
    maperIdk.values()
  );
}


export async function GET(
  request: Request,
  context: { params: { llaveProceso: string; idProceso: number } },
) {
  try {

    const {
      llaveProceso
    } = context.params;

    const procesos = await getProceso(
      {
        llaveProceso: llaveProceso,
        index       : 1,
      }
    );

    if ( !procesos ) {
      throw new Error(
        'no hay procesos para este numero de expediente '
      );

    }

    return NextResponse.json(
      procesos
    );
  } catch ( e ) {
    console.log(
      e
    );
    return NextResponse.json(
      []
    );
  }
}
