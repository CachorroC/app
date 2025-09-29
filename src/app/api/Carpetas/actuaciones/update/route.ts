import { prisma } from '#@/lib/connection/prisma';
import { NextResponse } from 'next/server';

import { ConsultaActuacion } from 'types/actuaciones';

async function* ActuacionesAsyncgenerator(
  idProcesos: number[] 
) {
  const mapActuaciones = new Map<number, Response>();

  for ( const idProceso of idProcesos ) {
    try {
      const res = await fetch(
        `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`, 
      );

      mapActuaciones.set(
        idProceso, res 
      );

      if ( !res.ok ) {
        throw new Error(
          `${ res.statusText } ${ res.status }` 
        );
      }

      const {
        actuaciones 
      } = ( await res.json() ) as ConsultaActuacion;

      yield actuaciones.map(
        (
          actuacion 
        ) => {
          return {
            ...actuacion,
            fechaActuacion: new Date(
              actuacion.fechaActuacion 
            ),
            fechaRegistro: new Date(
              actuacion.fechaRegistro 
            ),
            fechaInicial: actuacion.fechaInicial
              ? new Date(
                actuacion.fechaInicial 
              )
              : null,
            fechaFinal: actuacion.fechaFinal
              ? new Date(
                actuacion.fechaFinal 
              )
              : null,
            idProceso: idProceso,
            isUltimaAct:
            actuacion.cant === actuacion.consActuacion
              ? true
              : false,
          };
        } 
      );
    } catch ( error ) {
      console.log(
        error 
      );
      yield [];
    }
  }
}

export async function GET() {
  const newCarpsFetcher = [];

  const carpetas = await prisma.carpeta.findMany();

  const idProcesos = carpetas.flatMap(
    (
      carpeta 
    ) => {
      const {
        idProcesos 
      } = carpeta;

      if ( idProcesos.length === 0 ) {
        return [];
      }

      return idProcesos;
    } 
  );

  for await ( const consultaActuacion of ActuacionesAsyncgenerator(
    idProcesos 
  ) ) {
    console.log(
      consultaActuacion 
    );
    newCarpsFetcher.push(
      consultaActuacion 
    );
  }

  return NextResponse.json(
    newCarpsFetcher 
  );
}
