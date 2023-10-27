import { Loader } from '#@/components/Loader';
import AddTask from 'components/Nota/add-nota';
import { TaskList } from 'components/Nota/tasks-list';
import { Suspense } from 'react';
import { MonNotas } from '../page';

export default function Default() {
  return (
    <>
      <AddTask />
      <TaskList />
      <Suspense fallback={<Loader />}>
        <MonNotas />
      </Suspense>
    </>
  );
}
