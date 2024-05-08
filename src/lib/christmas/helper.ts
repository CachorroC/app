import clientPromise from '#@/lib/connection/mongodb';
import { unstable_noStore as noStore } from 'next/cache';

export async function christmasCollection() {
      noStore();

      const client = await clientPromise;

      if ( !client ) {
        throw new Error(
          'no hay cliente mongólico' 
        );
      }

      const db = client.db(
        'Christmas' 
      );

      const carpetas = db.collection(
        'Objetos' 
      );

      return carpetas;
}
