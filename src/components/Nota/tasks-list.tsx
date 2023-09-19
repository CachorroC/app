import getNotas from '#@/lib/project/getNotas';
import { Task } from './nota';
import styles from 'components/Card/card.module.css';

export default async function TaskList() {
  const tasks = await getNotas();

  return (
    <ul className={styles.links}>
      {tasks.map(
        (
          task
        ) => {
          return (  <Task task={task} key={task.id} />

          );
        }
      )}
    </ul>
  );
}
