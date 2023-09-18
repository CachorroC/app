import getNotas from '#@/lib/project/getNotas';
import { Task } from './nota';

export default async function TaskList() {
  const tasks = await getNotas();

  return (
    <ul>
      {tasks.map(
        task => {
          return (
            <li key={task.id}>
              <Task task={task} />
            </li>
          );
        }
      )}
    </ul>
  );
}
