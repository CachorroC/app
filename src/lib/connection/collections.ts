import { Tarea } from '@prisma/client';
import { IntCarpeta } from '../types/carpetas';
import { intNota } from '../types/notas';
import clientPromise from './mongodb';

export async function carpetasCollection () {
      const client = await clientPromise;

      if ( !client ) {
        throw new Error(
          'no hay cliente mongólico'
        );
      }

      const db = client.db(
        'RyS'
      );

      const carpetas = db.collection<IntCarpeta>(
        'Carpetas'
      );

      return carpetas;
}

export async function pruebasCollection () {
      const client = await clientPromise;

      if ( !client ) {
        throw new Error(
          'no hay cliente mongólico'
        );
      }

      const db = client.db(
        'RyS'
      );

      const carpetas = db.collection<IntCarpeta>(
        'Activas'
      );

      return carpetas;
}

export async function tareasCollection() {

      const client = await clientPromise;

      if ( !client ) {
        throw new Error(
          'no hay cliente mongólico'
        );
      }

      const db = client.db(
        'RyS'
      );

      const notas = db.collection<Tarea>(
        'Tareas'
      );

      return notas;
}

export async function notasCollection() {
      const client = await clientPromise;

      if ( !client ) {
        throw new Error(
          'no hay cliente mongólico'
        );
      }

      const db = client.db(
        'RyS'
      );

      const notas = db.collection<intNota>(
        'Notas'
      );

      return notas;
}