
import {  fetchActuaciones } from '#@/lib/project/utils/Actuaciones';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { unstable_noStore as noStore } from 'next/cache';
import { outActuacion } from '#@/lib/types/actuaciones';

/*
async function getData(
  idProceso: number, index: number
) {
  try {
    await sleep(
      index
    );

    const request = await fetch(
      `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,
      {
        next: {
          revalidate: 86400,
        },
      },
    );

    if ( !request.ok ) {
      const json = ( await request.json() ) as ConsultaActuacion;
      return json;
    }

    const data = ( await request.json() ) as Data;

    const {
      actuaciones
    } = data;

    console.log(
      `parsed idProceso: ${ idProceso } with a type of ${ typeof idProceso }`
    );
    await updateActuaciones(

      actuaciones, idProceso

    );

    const json: ConsultaActuacion = {
      StatusCode : request.status,
      Message    : request.statusText as Message,
      actuaciones: actuaciones,
    };
    return json;
  } catch ( error ) {
    if ( error instanceof Error ) {
      console.log(
        `${ idProceso }: error en la fetchActuaciones => ${ error.name } : ${ error.message }`,
      );
    }

    console.log(
      `${ idProceso }: : error en la  fetchActuaciones  =>  ${ error }`
    );

    return {
      StatusCode: 404,
      Message   : JSON.stringify(
        error
      ) as Message,
    };
  }
}

 */
export async function FechaActuacionComponent(
  {
    idProceso,
    index,
    initialOpenState
  }: {
    idProceso: number;
    index: number;
    initialOpenState: boolean
  }
) {
      noStore();

      const consultaActuaciones = await fetchActuaciones(
        idProceso, index
      );

      if ( !consultaActuaciones.actuaciones ) {
        return null;
      }

      const [
        ultimaActuacion
      ] = consultaActuaciones.actuaciones;

      const newActuacion : outActuacion = {
        ...ultimaActuacion,
        isUltimaAct: ultimaActuacion.cant === ultimaActuacion.consActuacion,
        idProceso  : idProceso
      };

      return ( <ActuacionComponent key={ultimaActuacion.idRegActuacion} initialOpenState={ initialOpenState } incomingActuacion={ newActuacion } />
      );
}
