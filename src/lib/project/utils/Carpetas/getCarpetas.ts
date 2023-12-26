import { MonCarpeta } from '#@/lib/types/carpetas';

export default async function getCarpetas() {
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
