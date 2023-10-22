import { notasCollection } from '#@/lib/connection/mongodb';
import { Nota } from '#@/lib/types/notas';
import {  NextResponse } from 'next/server';

export async function GET () {

  const collection = await notasCollection();

  let notasSize = await collection.countDocuments();

  const newNota = new Nota(
    'nueva nota', '/', notasSize++,
  );
  return NextResponse.json(
    newNota
  );

}