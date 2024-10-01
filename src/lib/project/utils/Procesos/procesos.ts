import { JuzgadoClass } from '#@/lib/models/juzgado';
import { cache } from 'react';
import { Despacho } from 'types/despachos';
import { ConsultaProcesos } from 'types/procesos';

export const getDespachos = cache( async () => {
  try {
    const request = await fetch(
      'https://app.rsasesorjuridico.com/despachos.json',
      {
        headers: {
          'CF-Access-Client-Id'    : `${ process.env.CF_ACCESS_CLIENT_ID }`,
          'CF-Access-Client-Secret': `${ process.env.CF_ACCESS_CLIENT_SECRET }`,
        },
      },
    );

    if ( !request.ok ) {
      throw new Error( 'error en los despachos' );
    }

    const response = ( await request.json() ) as Despacho[];

    return response;
  } catch ( e ) {
    if ( e instanceof Error ) {
      console.log( ` error en la conexion network del getDespacxhos ${ e.name } : ${ e.message }`, );
    }

    console.log( ` error en la conexion network del getDespacxho  =>  ${ e }` );

    return [];
  }
} );

export async function fetchProcesosByllaveProceso( llaveProceso: string ) {
  try {
    const req = await fetch( `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero=${ llaveProceso }&SoloActivos=false&pagina=1`, );

    if ( !req.ok ) {
      throw new Error( `message: ${ req.statusText }, code: ${ req.status }` );
    }

    const response = ( await req.json() ) as ConsultaProcesos;

    if ( response.procesos.length === 0 ) {
      //                     ^?

      throw new Error( `no hay procesos con esta llaveProceso ${ llaveProceso }` );
    }

    const {
      procesos: rawProcesos 
    } = response;

    return rawProcesos.map( ( proceso ) => {
      return {
        ...proceso,
        fechaProceso: proceso.fechaProceso
          ? new Date( proceso.fechaProceso )
          : null,
        fechaUltimaActuacion: proceso.fechaUltimaActuacion
          ? new Date( proceso.fechaUltimaActuacion )
          : null,
        juzgado: JuzgadoClass.fromProceso( proceso ),
      };
    } );
  } catch ( error ) {
    return [];
  }
}

export const getProcesosByllaveProceso = cache( async ( llaveProceso: string ) => {
  return await fetchProcesosByllaveProceso( llaveProceso );
} );
