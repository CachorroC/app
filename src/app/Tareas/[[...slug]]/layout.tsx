import { ReactNode } from 'react';
import layout from '#@/styles/layout.module.css';
import { TasksProvider } from '#@/components/Tareas/TasksContext';
import { prisma } from '#@/lib/connection/prisma';
import typography from '#@/styles/fonts/typography.module.css';
import { AddTask } from '#@/components/Tareas/AddTask';
import OutputDateHelper from '#@/lib/project/output-date-helper';

export default async function Layout(
  {
    params,
    children,
  }: {
    params: Promise<{ slug?: string[] }>;
    children: ReactNode;
  } 
) {
  let title;

  const {
    slug 
  } = await params;

  if ( slug ) {
    const [
      ano,
      mes,
      dia
    ] = slug;

    title = (
      <OutputDateHelper
        incomingDate={new Date(
          Number(
            ano 
          ), Number(
            mes 
          ) - 1, Number(
            dia 
          )
        )}
      />
    );
  } else {
    title = 'Tareas';
  }

  const tasks = await prisma.task.findMany();

  return (
    <TasksProvider initialTasks={tasks}>
      <div className={layout.top}>
        <h2 className={typography.headlineLarge}>{title}</h2>
      </div>
      <div className={layout.left}>{children}</div>
      <div className={layout.right}>
        <AddTask />
      </div>
    </TasksProvider>
  );
}
