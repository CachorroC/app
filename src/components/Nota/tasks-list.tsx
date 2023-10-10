'use client';
import { useNotaSort } from '#@/app/context/notas-sort-context';
import { Task } from './nota';
import styles from 'components/Nota/note.module.css';

export default function TaskList() {
  const notas = useNotaSort();

  return (
    <div className={styles.taskList}>
      {notas.map(
        (
          task 
        ) => {
          return (
            <Task
              task={task}
              key={task._id}
            />
          );
        } 
      )}
    </div>
  );
}
