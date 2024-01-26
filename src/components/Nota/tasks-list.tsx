'use client';
import { useNotaSort } from '#@/app/Context/notas-sort-context';
import { Task } from '../Tareas/task';
import styles from 'components/Nota/note.module.css';

export function TaskList() {
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
                          key={task.id}
                        />
                      );
            }
          )}
        </div>
      );
}
