import { cache } from 'react';
import { fetchCarpetaByllaveProceso,
  fetchCarpetasByllaveProceso,
  fetcherCarpetaByidProceso, } from './fetcher';
import { MonCarpeta } from '#@/lib/types/carpetas';

export const getCarpetasByllaveProceso = cache(
  async (
    llaveProceso: string
  ) => {
            return await fetchCarpetasByllaveProceso(
              llaveProceso
            );
  }
);

export const getCarpetaByllaveProceso = cache(
  async (
    llaveProceso: string
  ) => {
            return await fetchCarpetaByllaveProceso(
              llaveProceso
            );
  }
);

export async function getCarpetabyNumero(
  numero: number
) {
      const res = await fetch(
        `https://api.rsasesorjuridico.com/api/Carpeta/${ numero }`,
        {
          headers: {
            'CF-Access-Client-Id'    : `${ process.env.CF_ACCESS_CLIENT_ID }`,
            'CF-Access-Client-Secret': `${ process.env.CF_ACCESS_CLIENT_SECRET }`,
          },
        },
      );

      if ( !res.ok ) {
        throw new Error(
          'Failed to fetch data'
        );
      }

      return res.json() as Promise<MonCarpeta>;
}

export const getCarpetaByidProceso = cache(
  async (
    idProceso: number
  ) => {
            return fetcherCarpetaByidProceso(
              idProceso
            );
  }
);
