import { Calendar } from '#@/components/Calendar/main';
import { Loader } from '#@/components/Loader';
import TaskList from '#@/components/Nota/tasks-list';
import { Suspense } from 'react';

export default function Page() {

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Calendar />
      </Suspense>
      <TaskList />
    </>
  );
}
