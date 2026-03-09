import { fetchWithSmartRetry } from '#@/lib/fetchWithSmartRetry';
import { ConsultaActuacion,
  FetchResponseActuacionType,
  DatabaseActuacionType, } from '#@/lib/types/actuaciones';
import { ensureDate } from '#@/lib/utils/ensureDate';

function getLatestByDate( actuaciones: FetchResponseActuacionType[] ): FetchResponseActuacionType | null {
  if ( !actuaciones || actuaciones.length === 0 ) {
    return null;
  }

  return actuaciones.reduce( (
    prev, current
  ) => {
    const prevDate = ensureDate( prev.fechaActuacion )
      ?.getTime() || 0;
    const currDate = ensureDate( current.fechaActuacion )
      ?.getTime() || 0;

    if ( currDate > prevDate ) {
      return current;
    }

    if ( currDate === prevDate ) {
      const prevReg = ensureDate( prev.fechaRegistro )
        ?.getTime() || 0;
      const currReg = ensureDate( current.fechaRegistro )
        ?.getTime() || 0;

      if ( currReg > prevReg ) {
        return current;
      }

      if ( currReg === prevReg ) {
        return current.consActuacion > prev.consActuacion
          ? current
          : prev;
      }
    }

    return prev;
  } );
}

export default async function fetchActuaciones(
  idProceso: string,
  carpetaNumero: number,
): Promise<DatabaseActuacionType[]> {
  try {
    const request = await fetchWithSmartRetry(
      `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,
      {
        next: {
          revalidate: 86400,
        },
      },
    );

    if ( !request.ok ) {
      throw new Error( `request is not ok: ${ request.status }: ${ request.statusText }`, );
    }

    // 2. PROCESS SUCCESSFUL RESPONSE
    const consultaActuaciones = ( await request.json() ) as ConsultaActuacion;

    if ( consultaActuaciones.actuaciones.length > 0 ) {
      const latestActuacion = getLatestByDate( consultaActuaciones.actuaciones );

      return consultaActuaciones.actuaciones.map( ( actuacion ) => {
        return {
          ...actuacion,
          isUltimaAct   : actuacion.idRegActuacion === latestActuacion?.idRegActuacion,
          idRegActuacion: `${ actuacion.idRegActuacion }`,
          idProceso     : idProceso,
          carpetaNumero : carpetaNumero,
          fechaActuacion: ensureDate( actuacion.fechaActuacion ),
          fechaRegistro : ensureDate( actuacion.fechaRegistro ),
          createdAt     : new Date(),
          fechaInicial  : actuacion.fechaInicial
            ? new Date( actuacion.fechaInicial )
            : null,
          fechaFinal: actuacion.fechaFinal
            ? new Date( actuacion.fechaFinal )
            : null,
        };
      } );
    }

    throw new Error( 'el length del array actuaciones es 0' );
  } catch ( error ) {
    console.log( `${ idProceso }ERROR ===> FETCHACTUACIONES ${ JSON.stringify(
      error,
      null,
      2,
    ) }`, );

    return [];
  }
}
