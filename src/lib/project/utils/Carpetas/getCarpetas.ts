
import { cache } from 'react';
import { fetchCarpetas } from './fetchCarpetas';

const getCarpetas = cache(
  async () => {
            const rawCarpetas = await fetchCarpetas();

            const sorted =  [ ...rawCarpetas ].sort(
              (
                a, b
              ) => {
                        if ( !a.fecha || a.fecha === undefined ) {
                          return 1;
                        }

                        if ( !b.fecha || b.fecha === undefined ) {
                          return -1;
                        }

                        const x = a.fecha;

                        const y = b.fecha;

                        if ( x < y ) {
                          return 1;
                        }

                        if ( x > y ) {
                          return -1;
                        }

                        return 0;
              }
            );
            return sorted;
  }
);

export default getCarpetas;
/*
export async function oldgetCarpetas() {
      const res = await fetch(
        'https://api.rsasesorjuridico.com/api/Carpetas', {
          headers: {
            'CF-Access-Client-Id'    : `${ process.env.CF_ACCESS_CLIENT_ID }`,
            'CF-Access-Client-Secret': `${ process.env.CF_ACCESS_CLIENT_SECRET }`,
          },
        }
      );

      if ( !res.ok ) {
        throw new Error(
          'Failed to fetch data'
        );
      }

      return res.json() as Promise<MonCarpeta[]>;
}
 */