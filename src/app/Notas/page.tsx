'use client';
import { useNotaSort, } from '../Context/notas-sort-context';
import { Task } from '#@/components/Tareas/task';
import layout from '#@/styles/layout.module.css';

export default function PrismaNotas() {
      const tasks = useNotaSort();

      return (
        <ul>
          {tasks.map(
            task => {
                      return (
                        <li key={task.id} className={layout.sectionColumn}>
                          <Task task={task} />
                        </li>
                      );
            }
          )}
        </ul>
      );
}
