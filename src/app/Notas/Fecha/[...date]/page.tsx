import { NotaComponent } from '#@/components/Nota/server';
import prisma from '#@/lib/connection/prisma';
import { notFound } from 'next/navigation';

export default async function DatePage( {
  params,
}: {
  params: Promise<{ date: string[] }>;
} ) {
  const {
    date
  } = await params;

  const [
    incomingAno,
    incomingMes,
    incomingDia
  ] = date;

  const incomingDate = new Date( `${ incomingAno }-${ incomingMes }-${ incomingDia }` );

  const notas = await prisma.nota.findMany( {
    where: {
      dueDate: {
        gte: incomingDate,
      },
    },
    include: {
      RelevantDates: true,
    },
  } );

  if ( notas.length === 0 ) {
    return notFound();
  }

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
