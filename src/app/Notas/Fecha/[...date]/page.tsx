import { NotaComponent } from '#@/components/Nota/server';
import clientPromise from '#@/lib/connection/mongodb';
import { IntNota, notasConvert } from '#@/lib/types/notas';
import { notFound } from 'next/navigation';

export default async function DatePage( {
  params,
}: {
  params: Promise<{ date: string[] }>;
} ) {
  // 2. Await params before using them
  const {
    date
  } = await params;

  const [
    incomingAno,
    incomingMes,
    incomingDia
  ] = date;

  // Now you are safely in a request context
  const incomingDate = new Date( `${ incomingAno }-${ incomingMes }-${ incomingDia }` );
  const client = await clientPromise;

  if ( !client ) {
    throw new Error( 'no hay cliente mongólico' );
  }

  const db = client.db( 'RyS' );

  const collection = db.collection<IntNota>( 'Notas' );

  const rawNotas = await collection
    .find( {
      date: {
        $gte: incomingDate,
      },
    } )
    .toArray();

  if ( rawNotas.length === 0 ) {
    return notFound();
  }

  const notas = notasConvert.toMonNotas( rawNotas );

  return (
    <>
      {incomingDate.toLocaleString(
        'es-CO', {
          year   : 'numeric',
          weekday: 'short',
          month  : 'long',
          day    : 'numeric',
        }
      )}
      {notas.map( ( nota ) => {
        return (
          <NotaComponent
            key={nota.id}
            notaRaw={nota}
          />
        );
      } )}
    </>
  );
}
