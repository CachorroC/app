
import AddTask from 'components/Nota/add-nota';
import TaskList from 'components/Nota/tasks-list';
import prisma from '#@/lib/connection/connectDB';

export default async function Default() {
  let countTasks = await prisma.nota.count();

  return (
    <><AddTask id={ countTasks++ } /> <TaskList /></>
  );
}
