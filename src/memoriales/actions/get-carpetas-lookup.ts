'use server';

import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { CarpetaLookup,
  toCarpetaLookup, } from '#@/memoriales/lib/carpeta-lookup';

/**
 * Server action that fetches all carpetas and maps each into the trimmed
 * `CarpetaLookup` DTO. Data source consumed client-side by `useCarpetasLookup` for
 * form autofill.
 * @returns the list of carpeta lookup DTOs.
 */
export async function getCarpetasLookup(): Promise<CarpetaLookup[]> {
  const carpetas = await getCarpetas();

  return carpetas.map( toCarpetaLookup );
}
