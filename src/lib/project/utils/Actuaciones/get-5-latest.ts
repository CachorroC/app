import { DatabaseActuacionType } from '#@/lib/types/actuaciones';

/**
 * Sorts an array of actuaciones from latest to earliest and returns the top 5.
 * Prioritizes fechaActuacion, falling back to fechaRegistro and then consActuacion
 * if the dates are identical.
 *
 * @param actuaciones - The array of processed DatabaseActuacionType records.
 * @returns A new array containing only the 5 most recent actuations.
 */
export function getTop5LatestActuaciones( actuaciones: DatabaseActuacionType[] ): DatabaseActuacionType[] {
  if ( !actuaciones || actuaciones.length === 0 ) {
    return [];
  }

  // Create a shallow copy using the spread operator to prevent mutating the original array
  return [
    ...actuaciones
  ]
    .sort( (
      a, b
    ) => {
      const dateA = a.fechaActuacion.getTime();
      const dateB = b.fechaActuacion.getTime();

      // Primary Sort: Descending by fechaActuacion (Biggest/Latest to Smallest/Earliest)
      if ( dateB !== dateA ) {
        return dateB - dateA;
      }

      // Secondary Sort: Fallback to fechaRegistro if fechaActuacion is exactly the same
      const regA = a.fechaRegistro.getTime();
      const regB = b.fechaRegistro.getTime();

      if ( regB !== regA ) {
        return regB - regA;
      }

      // Tertiary Sort: Fallback to consActuacion as the final tie-breaker
      return b.consActuacion - a.consActuacion;
    } )
    // Select only the first 5 items from the sorted array
    .slice(
      0, 5
    );
}