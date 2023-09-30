import { Calendar } from '#@/components/Calendar/main';
import { Loader } from '#@/components/Loader';
import AddTask from '#@/components/Nota/add-nota';
import TaskList from '#@/components/Nota/tasks-list';
import { CurrentRoute } from '#@/lib/client/current-route';
import { Suspense } from 'react';

export default function DatePage (
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


  return (
    <> <Calendar date={incomingDate} />
      <AddTask  />
      <Suspense fallback={<Loader />}>
        <CurrentRoute />
      </Suspense>
      <TaskList /></>
  );

}