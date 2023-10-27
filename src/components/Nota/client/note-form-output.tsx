'use client';

import { useNotaContext } from '#@/app/context/main-context';
import styles from 'components/Nota/note.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { fixFechas } from '#@/lib/project/helper';

export default function NoteFormOutput() {
  const {
    inputNota
  } = useNotaContext();

  return (
    <div className={styles.container}>
      <sub className={styles.sup}>{inputNota.id}</sub>
      {inputNota.carpetaNumero && (
        <span>{`llaveProceso: ${ inputNota.carpetaNumero }`}</span>
      )}
      <section className={styles.section}>
        <p className={`${ typography.bodyLarge } ${ styles.textArea }`}>
          {inputNota.text}
        </p>
        <p className={`${ typography.bodyMedium } ${ styles.textArea }`}>
          {' '}
          {inputNota.date && fixFechas(
            inputNota.date.toString()
          )}
        </p>
      </section>
      <span>{inputNota.pathname}</span>


    </div>
  );
}
