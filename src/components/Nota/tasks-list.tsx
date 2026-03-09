'use client';
import { useNotaSort } from '#@/app/Context/notas-sort-context';
import { Nota } from '#@/app/Notas/nota';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import styles from 'components/Nota/note.module.css';

export function NotasList() {
  const notas = useNotaSort();

  return (
    <div className={styles.taskList}>
      {notas.map( ( nota ) => {
        return (
          <Nota
            nota={nota}
            key={nota.id}
          >
            <td>
              <OutputDateHelper incomingDate={nota.createdAt} />
            </td>
          </Nota>
        );
      } )}
    </div>
  );
}
