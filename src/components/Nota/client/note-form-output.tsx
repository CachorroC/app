'use client';

import styles from 'components/Nota/note.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { fixFechas } from '#@/lib/project/helper';
import { useNuevaNotaContext } from '#@/app/Notas/nueva-nota-form-context';

export default function NoteFormOutput() {
      const {
        notaFormState 
      } = useNuevaNotaContext();

      return (
        <div className={styles.container}>
          {notaFormState.carpetaNumero && (
            <span>{`llaveProceso: ${ notaFormState.carpetaNumero }`}</span>
          )}
          <section className={styles.section}>
            <p className={typography.displayMedium}>{notaFormState.text}</p>
            <p className={typography.bodyMedium}>{notaFormState.text}</p>
            {notaFormState.dueDate && (
              <p className={typography.labelSmall}>
                {fixFechas(
                  notaFormState.dueDate?.toString() 
                )}
              </p>
            )}
          </section>
        </div>
      );
}
