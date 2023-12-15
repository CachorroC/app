
/*
export async function getCarpetas() {

      const client = await clientPromise;

      if ( !client ) {
        throw new Error(
          'no hay cliente mongólico'
        );
      }

      const db = client.db(
        'RyS'
      );

      const collection = db.collection<IntCarpeta>(
        'Carpetas'
      );

      const carpetasRaw = await collection
            .find(
              {}
            )
            .toArray();


      return carpetasRaw.map(
        (
          carpeta
        ) => {
                  return ( {
                    ...carpeta,
                    _id   : carpeta._id.toString(),
                    nombre: `${ carpeta.deudor.primerNombre } ${ carpeta.deudor.segundoNombre } ${ carpeta.deudor.primerApellido } ${ carpeta.deudor.segundoApellido }`
                  } ) as MonCarpeta;
        }
      );
}
 */

/*
import { PrismaCarpeta } from '#@/lib/types/prisma/carpetas'; */
import { cache } from 'react';
import { fetchCarpetas } from './fetchCarpetas';
/*
export async function getCarpetas (): Promise<PrismaCarpeta[]> {
      const res =  await fetch(
        'https://api.rsasesorjuridico.com/api/Carpetas', {
          headers: {
            'CF-Access-Client-Id'    : `${ process.env.CF_ACCESS_CLIENT_ID }`,
            'CF-Access-Client-Secret': `${ process.env.CF_ACCESS_CLIENT_SECRET }`
          }
        }
      );

      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
      if ( !res.ok ) {
        console.log(
          res.json()
        );
        // This will activate the closest `error.js` Error Boundary
        throw new Error(
          'Failed to fetch data'
        );
      }

      return res.json();
}

 */


export default cache(
  fetchCarpetas
);