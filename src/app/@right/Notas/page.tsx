import { Loader } from '#@/components/Loader';
import AddTask from '#@/components/Nota/add-nota';
import TaskList from '#@/components/Nota/tasks-list';
import { CurrentRoute } from '#@/lib/client/current-route';
import { Suspense } from 'react';
import prisma from '#@/lib/connection/connectDB';
import NoteFormOutput from '#@/components/Nota/client/note-form-output';
import layout from '#@/styles/layout.module.css';

export default async function Default() {
  let countTasks = await prisma.nota.count();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <CurrentRoute />
      </Suspense>
      <NoteFormOutput />
      <AddTask id={ countTasks++ } />
      {countTasks}
      <TaskList />
    </>
  );
}
