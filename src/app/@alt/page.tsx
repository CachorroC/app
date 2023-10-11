import { Calendar } from '#@/components/Calendar/main';
import TaskList from '#@/components/Nota/tasks-list';
import { NuevaTarea } from 'components/form/Tareas';

export default function Page() {
  return (
    <>
      <Calendar />
      <NuevaTarea />
      <TaskList />
    </>
  );
}
