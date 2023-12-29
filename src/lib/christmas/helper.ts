import clientPromise from '#@/lib/connection/mongodb';
import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from '../connection/prisma';

export async function christmasCollection () {
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



export async function insertObjectofChristmas (
  task
) {
      try {


        return await prisma.task.create(
          {
            data: {
              text         : task.text,
              done         : task.done,
              carpetaNumero: task.carpetaNumero
                ? task.carpetaNumero
                : null
            }
          }
        );
      } catch ( error ) {
        console.log(
          error
        );
        return null;
      }
}