import { IntCarpeta } from '../types/carpetas';
import { intFactura } from '../types/contabilidad';
import { NewNota } from '../types/notas';
import { NewTask } from '../types/tareas';
import clientPromise from './mongodb';

export async function carpetasCollection() {
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

export async function pruebasCollection() {
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

  const notas = db.collection<NewTask>(
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

  const notas = db.collection<NewNota>(
    'Notas' 
  );

  return notas;
}

export async function facturasCollection() {
  const client = await clientPromise;

  if ( !client ) {
    throw new Error(
      'no hay cliente mongólico' 
    );
  }

  const db = client.db(
    'Contabilidad' 
  );

  const facturas = db.collection<intFactura>(
    'Facturas' 
  );

  return facturas;
}
