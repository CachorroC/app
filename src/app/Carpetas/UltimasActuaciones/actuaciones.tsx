import { getActuaciones } from '#@/lib/project/utils/Actuaciones/actuaciones-main';
import { ActuacionesSlideshowContainer } from '#@/components/Actuaciones/actuaciones-slideshow';

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
        `${ idProceso }: error en la getActuaciones => ${ error.name } : ${ error.message }`,
      );
    }

    console.log(
      `${ idProceso }: : error en la  getActuaciones  =>  ${ error }`
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
  }: {
  idProceso: number;
} 
) {
  const promiseActs = getActuaciones(
    {
      idProceso: idProceso,
    } 
  );

  return (
    <ActuacionesSlideshowContainer
      actuacionesPromise={promiseActs}
      key={idProceso}
    />
  );
}
