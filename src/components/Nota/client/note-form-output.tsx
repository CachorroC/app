'use client';

import { useNotaContext } from '#@/app/context/main-context';
import styles from 'components/Nota/note.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { fixFechas } from '#@/lib/project/helper';

export default function NoteFormOutput() {
  const {
    inputNota 
  } = useNotaContext();

  return (
    <div className={styles.container}>
      <sub className={styles.sup}>{inputNota.id}</sub>
      {inputNota.llaveProceso && (
        <span>{`llaveProceso: ${ inputNota.llaveProceso }`}</span>
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

      <label className={styles.switchBox}>
        <input
          key={inputNota.id}
          className={styles.inputElement}
          defaultChecked={inputNota.done}
          type="checkbox"
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}
