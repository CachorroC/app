import { MonCarpeta } from '#@/lib/types/carpetas';

export async function fetchCarpetas() {
      try {
        const request = await fetch(
          'https://api.rsasesorjuridico.com/api/Carpetas',
          {
            headers: {
              'CF-Access-Client-Id'    : `${ process.env.CF_ACCESS_CLIENT_ID }`,
              'CF-Access-Client-Secret': `${ process.env.CF_ACCESS_CLIENT_SECRET }`,
            },
          },
        );

        if ( !request.ok ) {
          throw new Error(
            `error at the fetch request ${ request.statusText } ${ request.status }`,
          );
        }

        return request.json() as Promise<MonCarpeta[]>;
      } catch ( error ) {
        console.log(
          error 
        );
        return [];
      }
}
