'use client';

import styles from 'components/Nota/note.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { fixFechas } from '#@/lib/project/helper';
import { useNuevaTaskContext } from '#@/app/Context/nueva-task-form-context';

export default function NoteFormOutput() {
      const {
        taskFormState,
      } = useNuevaTaskContext();

      return (
        <div className={styles.container}>
          <sub className={styles.sup}>{taskFormState.id}</sub>
          {taskFormState.carpetaNumero && (
            <span>{`llaveProceso: ${ taskFormState.carpetaNumero }`}</span>
          )}
          <section className={styles.section}>
            <p className={typography.displayMedium}>{taskFormState.text}</p>
            <p className={typography.bodyMedium}>{taskFormState.text}</p>
            {taskFormState.dueDate && (
              <p className={typography.labelSmall}>
                {fixFechas(
                  taskFormState.dueDate?.toString()
                )}
              </p>
            )}
          </section>

        </div>
      );
}
