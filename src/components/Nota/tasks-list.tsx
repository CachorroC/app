'use client';
import { useNotaSort } from '#@/app/context/notas-sort-context';
import { usePathname } from 'next/navigation';
import { Task } from './nota';
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

export function NotasList() {
      const rawNotas = useNotaSort();

      const pathname = usePathname();

      const notas = [
        ...rawNotas 
      ].filter(
        (
          nota 
        ) => {
                  return nota.pathname === pathname;
        } 
      );
      return (
        <>
          {notas.map(
            (
              nota 
            ) => {
                      return (
                        <Task
                          key={nota.id}
                          task={nota}
                        />
                      );
            } 
          )}
        </>
      );
}
