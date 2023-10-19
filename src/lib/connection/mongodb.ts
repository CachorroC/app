/* eslint-disable no-undef */
import 'server-only';
import { MongoClient } from 'mongodb';
import { cache } from 'react';
import { IntCarpeta } from 'types/carpetas';
import { intNota } from 'types/notas';
import { IntPrueba } from '../types/prueba';

const uri
  = process.env.MONGODB_URI
  || 'mongodb+srv://cachorro_cami:Tengo1amo@cluster0.ffbyjzl.mongodb.net/?retryWrites=true&w=majority';

const options = {};
let client;
let clientPromise: Promise<MongoClient>;

if ( process.env.NODE_ENV === 'development' ) {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if ( !globalWithMongo._mongoClientPromise ) {
    client = new MongoClient(
      uri, options
    );
    globalWithMongo._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(
    uri, options
  );
  clientPromise = client.connect();
}

export const tareasCollection = cache(
  async () => {
    const client = await clientPromise;

    if ( !client ) {
      throw new Error(
        'no hay cliente mongólico'
      );
    }

    const db = client.db(
      'RyS'
    );

    const carpetas = db.collection(
      'Tareas'
    );

    return carpetas;
  }
);

export const carpetasCollection = cache(
  async () => {
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
);

export const pruebasCollection = cache(
  async () => {
    const client = await clientPromise;

    if ( !client ) {
      throw new Error(
        'no hay cliente mongólico'
      );
    }

    const db = client.db(
      'RyS'
    );

    const carpetas = db.collection<IntPrueba>(
      'Carpetas'
    );

    return carpetas;
  }
);

export const notasCollection = async () => {
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
};

export default clientPromise;
