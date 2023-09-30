import { NotaComponent } from '#@/components/Nota/server';
import { notasCollection } from '#@/lib/connection/mongodb';
import { notasConvert } from '#@/lib/types/notas';
import { notFound } from 'next/navigation';

export default async function DatePage (
  {
    params
  }: { params: { date: string[] } }
) {
  const [
    incomingAno,
    incomingMes,
    incomingDia
  ] = params.date;

  const incomingDate =  new Date(
    `${ incomingAno }-${ incomingMes }-${ incomingDia }`
  );

  const collection = await notasCollection();

  const rawNotas = await collection.find(

    {
      date: {
        $gte: incomingDate
      }
    }

  )
    .toArray();

  if ( rawNotas.length === 0 ) {
    return notFound();
  }

  const notas = notasConvert.toMonNotas(
    rawNotas
  );

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
      {
        notas.map(
          (
            nota
          ) => {
            return ( <NotaComponent key={nota._id} notaRaw={ nota}/> );
          }
        )
      }</>
  );
}