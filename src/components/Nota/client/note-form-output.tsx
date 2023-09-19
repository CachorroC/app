'use client';

import { useNotaContext } from '#@/app/context/main-context';
import styles from 'components/Nota/note.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { fixFechas } from '#@/lib/project/helper';

export default function NoteFormOutput() {
  const {
    inputNota, setInputNota
  } = useNotaContext();

  return (
    <div className={styles.container}>
      <div className={ styles.section }>
        <sub className={styles.sup}>{inputNota.id}</sub>
        <span>{`llaveProceso: ${ inputNota.llaveProceso }`}</span>
        <p className={`${ typography.bodyLarge } ${ styles.textArea }`}>{inputNota.text}</p>
        {inputNota.date &&( <p>{fixFechas(
          inputNota.date
        ) }</p> ) }
        <span>{ inputNota.pathname }</span>

        <label className={ styles.switchBox }>
          <input
            key={inputNota.id}
            className={ styles.inputElement }
            checked={inputNota.done}
            type="checkbox"
            onChange={ (
              e
            ) => {
              setInputNota(
                {
                  ...inputNota,
                  done: e.target.checked
                }
              );
            }}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
    </div>
  );
}
