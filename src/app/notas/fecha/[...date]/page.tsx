import { NotaComponent } from '#@/components/Nota/server';
import prisma from '#@/lib/connection/prisma';
import { IntNota, notasConvert } from '#@/lib/types/notas';
import { notFound } from 'next/navigation';

export default async function DatePage({
  params,
}: {
  params: Promise<{ date: string[] }>;
}) {
  // 2. Await params before using them
  const { date } = await params;

  const [incomingAno, incomingMes, incomingDia] = date;

  // Now you are safely in a request context
  const incomingDate = new Date(`${incomingAno}-${incomingMes}-${incomingDia}`);

  const rawNotas = await prisma.nota.findMany({
    where: {
      dueDate: {
        gte: incomingDate,
      },
    },
  });

  if (rawNotas.length === 0) {
    return notFound();
  }

  const notas = notasConvert.toMonNotas(rawNotas as IntNota[]);

  return (
    <>
      {incomingDate.toLocaleString('es-CO', {
        year: 'numeric',
        weekday: 'short',
        month: 'long',
        day: 'numeric',
      })}
      {notas.map((nota) => {
        return (
          <NotaComponent
            key={nota.id}
            notaRaw={nota}
          />
        );
      })}
    </>
  );
}
