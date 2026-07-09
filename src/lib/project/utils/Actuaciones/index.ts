import prisma from '#@/lib/connection/prisma';
import { fetchWithSmartRetry } from '#@/lib/fetchWithSmartRetry';
import { ConsultaActuacion,
  FetchResponseActuacionType,
  DatabaseActuacionType, } from '#@/lib/types/actuaciones';
import { ensureDate } from '#@/lib/utils/ensureDate';
import { cacheLife } from 'next/cache';
import { connection } from 'next/server';

/**
 * Determines the most recent actuation from a list based on chronological criteria.
 * Prioritizes fechaActuacion, then fechaRegistro, and finally consActuacion.
 *
 * @param actuaciones - Array of actuations from the fetch response.
 * @returns The latest FetchResponseActuacionType or null if the array is empty.
 */
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

/**
 * Fetches and processes legal actuations for a specific process from the Rama Judicial API.
 * Maps API response data to the internal DatabaseActuacionType structure.
 *
 * @param idProceso - The unique identifier for the legal process.
 * @param carpetaNumero - The associated folder number for tracking.
 * @returns A promise resolving to an array of processed DatabaseActuacionType records.
 */
export default async function fetchActuaciones(
  idProceso: string,
  carpetaNumero: number,
): Promise<DatabaseActuacionType[]> {
  await connection();

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


export async function getActuacionesByCarpetaNumero ( carpetaNumero: number ) {
  'use cache';
  cacheLife( 'hours' );
  const actuaciones = await prisma.actuacion.findMany( {
    where: {
      carpetaNumero: carpetaNumero
    }
  } );

  return actuaciones;
}