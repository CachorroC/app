'use server';

import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { CarpetaLookup,
  toCarpetaLookup, } from '#@/memoriales/lib/carpeta-lookup';

export async function getCarpetasLookup(): Promise<CarpetaLookup[]> {
  const carpetas = await getCarpetas();

  return carpetas.map( toCarpetaLookup );
}
