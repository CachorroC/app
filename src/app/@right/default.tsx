import { Calendar } from '#@/components/Calendar/main';
import { Loader } from '#@/components/Loader';
import AddTask from '#@/components/Nota/add-nota';
import TaskList from '#@/components/Nota/tasks-list';
import { CurrentRoute } from '#@/lib/client/current-route';
import { Suspense } from 'react';

export default function Default() {

  return (
    <>
      <Calendar />
      <AddTask  />
      <Suspense fallback={<Loader />}>
        <CurrentRoute />
      </Suspense>
      <TaskList />
    </>
  );
}
