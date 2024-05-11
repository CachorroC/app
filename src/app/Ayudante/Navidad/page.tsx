import layout from '#@/styles/layout.module.css';
import { prisma } from '#@/lib/connection/prisma';
import { TasksProvider } from '#@/components/Tareas/TasksContext';
import { AddTask } from '#@/components/Tareas/AddTask';
import TaskList from '#@/components/Tareas/TaskList';

export default async function TaskApp() {
  const tasks = await prisma.task.findMany();

  return (
    <TasksProvider initialTasks={tasks}>
      <AddTask />

      <div className={layout.left}>
        <TaskList />
      </div>
    </TasksProvider>
  );
}
