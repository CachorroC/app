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

  const collection = await notasCollection();

  const rawNotas = await collection.find(
    {
      date: new Date(
        Number(
          incomingAno
        ), Number(
          incomingMes + 1
        ), Number(
          incomingDia
        )
      )
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