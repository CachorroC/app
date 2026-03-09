import TaskList from '#@/components/Tareas/TaskList';
import { Calendar } from '#@/components/Calendar/main';
import layout from '#@/styles/layout.module.css';
import { NuevaTarea } from './nueva-tarea';
import { Suspense } from 'react';
import { Loader } from '#@/components/Loader/main-loader';

export default async function Page( {
  params,
}: {
  params: Promise<{ slug?: string[] }>;
} ) {
  let content;

  const {
    slug 
  } = await params;

  if ( slug ) {
    const [
      ano,
      mes,
      dia
    ] = slug;

    content = (
      <Calendar date={new Date(
        Number( ano ), Number( mes ) - 1, Number( dia ) 
      )}
      />
    );
  } else {
    content = <Calendar />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <div className={layout.sectionColumn}>
        <NuevaTarea />
        {content}
      </div>
      <TaskList />
    </Suspense>
  );
}
