'use client';

import { useNotaContext } from '#@/app/context/main-context';
import note, { tareas } from 'components/Nota/note.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { fixFechas } from '#@/lib/project/helper';

export default function NoteFormOutput () {
  const {
    inputNota
  } = useNotaContext();

  return (
    <div className={ note.container } key={ inputNota.text }>
      {JSON.stringify(
        inputNota
      ) }
      <h1 className={ typography.bodyLarge }>{ inputNota.text }</h1>
      {inputNota.date && ( <p>{fixFechas(
        inputNota.date
      )}</p> )}
    </div>
  );
}