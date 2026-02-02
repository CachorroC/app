import { Calendar } from '#@/components/Calendar/main';
import { Loader } from '#@/components/Loader/main-loader';
import AddNota from '#@/components/Nota/add-nota';
import { NotasList } from '#@/components/Nota/tasks-list';
import { CurrentRoute } from '#@/lib/client/current-route';
import { getNotas } from '#@/lib/project/utils/Notas/getNotas';
import { Suspense } from 'react';

/*
export async function generateStaticParams() {
  const notas = await getNotas();

  return notas.map(
    (
      nota
    ) => {
      const {
        createdAt
      } = nota;

      const noteDate = new Date(
        createdAt
      );

      const noteDay = noteDate.getDate();

      const noteMonth = noteDate.getMonth();

      const noteYear = noteDate.getFullYear();

      return {
        date: [
          noteYear,
          noteMonth,
          noteDay
        ],
      };
    }
  );
}
 */
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

  return (
    <>
      {' '}
      <Suspense fallback={<Loader />}>
        <Calendar date={incomingDate} />
        <AddNota />
        <Suspense fallback={<Loader />}>
          <CurrentRoute />
        </Suspense>
        <NotasList />
      </Suspense>
    </>
  );
}
