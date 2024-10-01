import { ConsultaActuacion } from '#@/lib/types/actuaciones';

export default async function fetchActuaciones( idProceso: number ) {
  try {
    const request = await fetch(
      `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,  {
        next: {
          revalidate: 86400
        }
      }
    );

    if ( !request.ok ) {
      throw new Error( `request is not ok: ${ request.status }: ${ request.statusText }` );
    }

    const consultaActuaciones = ( await request.json() ) as ConsultaActuacion;

    if ( consultaActuaciones.actuaciones.length > 0 ) {
      return consultaActuaciones.actuaciones.map( ( actuacion ) => {
        return {
          ...actuacion,
          isUltimaAct   : actuacion.cant === actuacion.consActuacion,
          idProceso     : idProceso,
          fechaActuacion: new Date( actuacion.fechaActuacion ),
          fechaRegistro : new Date( actuacion.fechaRegistro ),
          carpetaNumero : null,
          fechaInicial  : actuacion.fechaInicial
            ? new Date( actuacion.fechaInicial )
            : null,
          fechaFinal: actuacion.fechaFinal
            ? new Date( actuacion.fechaFinal )
            : null,
        } ;
      } );
    }

    throw new Error( 'el length del array actuaciones es 0' );


  } catch ( error ) {
    console.log( `${ idProceso }ERROR ===> FETCHACTUACIONES ${ JSON.stringify(
      error,
      null,
      2
    ) }` );

    return [];
  }
}
